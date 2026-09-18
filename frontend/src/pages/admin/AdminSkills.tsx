import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FiEdit2,
  FiPlus,
  FiSave,
  FiTrash2,
  FiX,
  FiImage,
} from "react-icons/fi";

import API_URL from "../../config/api";

type SkillItem = {
  name: string;
  logoUrl: string;
};

type Skill = {
  _id: string;
  category: string;
  items: SkillItem[];
};



const AdminSkills = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  const [category, setCategory] = useState("");
  const [items, setItems] = useState<SkillItem[]>([
    {
      name: "",
      logoUrl: "",
    },
  ]);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  const fetchSkills = async () => {
    try {
      const response = await fetch(`${API_URL}/skills`);

      if (!response.ok) {
        throw new Error("Failed to load skills");
      }

      const data = await response.json();

      setSkills(data);
    } catch (error) {
      console.error("Load skills error:", error);

      toast.error("Failed to load skills");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
  const token = localStorage.getItem("adminToken");

  if (!token) {
    window.location.href = "/admin";
    return;
  }

  const loadSkills = async () => {
    try {
      const response = await fetch(`${API_URL}/skills`);

      if (!response.ok) {
        throw new Error("Failed to load skills");
      }

      const data = await response.json();
      setSkills(data);
    } catch (error) {
      console.error("Load skills error:", error);
      toast.error("Failed to load skills");
    } finally {
      setLoading(false);
    }
  };

  void loadSkills();
}, []);

  const resetForm = () => {
    setCategory("");

    setItems([
      {
        name: "",
        logoUrl: "",
      },
    ]);

    setEditingId(null);
  };

  const handleItemChange = (
    index: number,
    field: keyof SkillItem,
    value: string,
  ) => {
    setItems((currentItems) =>
      currentItems.map((item, itemIndex) =>
        itemIndex === index
          ? {
              ...item,
              [field]: value,
            }
          : item,
      ),
    );
  };

  const addSkillItem = () => {
    setItems((currentItems) => [
      ...currentItems,
      {
        name: "",
        logoUrl: "",
      },
    ]);
  };

  const removeSkillItem = (index: number) => {
    if (items.length === 1) {
      toast.error("At least one skill is required");
      return;
    }

    setItems((currentItems) =>
      currentItems.filter(
        (_, itemIndex) => itemIndex !== index,
      ),
    );
  };

  const handleSubmit = async () => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      toast.error("Please login again");
      return;
    }

    if (!category.trim()) {
      toast.error("Category is required");
      return;
    }

    const validItems = items
      .map((item) => ({
        name: item.name.trim(),
        logoUrl: item.logoUrl.trim(),
      }))
      .filter((item) => item.name && item.logoUrl);

    if (validItems.length === 0) {
      toast.error("Add at least one skill with name and logo URL");
      return;
    }

    if (validItems.length !== items.length) {
      toast.error(
        "Please complete all skill fields or remove empty rows",
      );
      return;
    }

    try {
      setSaving(true);

      const url = editingId
        ? `${API_URL}/skills/${editingId}`
        : `${API_URL}/skills`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          category: category.trim(),
          items: validItems,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save skill category",
        );
      }

      toast.success(
        editingId
          ? "Skill category updated successfully!"
          : "Skill category added successfully!",
      );

      resetForm();
      fetchSkills();
    } catch (error) {
      console.error("Save skill error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to save skill category",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (skill: Skill) => {
    setEditingId(skill._id);
    setCategory(skill.category);

    setItems(
      skill.items.length > 0
        ? skill.items.map((item) => ({
            name: item.name,
            logoUrl: item.logoUrl,
          }))
        : [
            {
              name: "",
              logoUrl: "",
            },
          ],
    );

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id: string) => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      toast.error("Please login again");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this skill category?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(`${API_URL}/skills/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete skill category",
        );
      }

      toast.success("Skill category deleted successfully!");

      fetchSkills();
    } catch (error) {
      console.error("Delete skill error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete skill category",
      );
    }
  };

  return (
    <main className="min-h-screen bg-[#050505] px-5 py-8 text-white md:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Header */}
        <div className="mb-8">
          <a
            href="/admin/dashboard"
            className="text-sm text-gray-500 transition hover:text-white"
          >
            ← Back to Dashboard
          </a>

          <div className="mt-6">
            <p className="text-sm text-gray-500">
              Portfolio Management
            </p>

            <h1 className="mt-2 text-3xl font-bold">
              Manage Skills
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Add, edit or remove your technical skills from
              here.
            </p>
          </div>
        </div>

        {/* Form */}
        <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">
                {editingId
                  ? "Edit Skill Category"
                  : "Add Skill Category"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                Add each skill with its name and logo URL.
              </p>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-4 py-2 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
              >
                <FiX />
                Cancel
              </button>
            )}
          </div>

          <div className="mt-6">
            {/* Category */}
            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Category
              </label>

              <input
                type="text"
                value={category}
                onChange={(event) =>
                  setCategory(event.target.value)
                }
                placeholder="Frontend Development"
                className="admin-input"
              />
            </div>

            {/* Skills */}
            <div className="mt-6">
              <div className="mb-3 flex items-center justify-between gap-4">
                <div>
                  <label className="block text-sm text-gray-400">
                    Skills
                  </label>

                  <p className="mt-1 text-xs text-gray-600">
                    Add a name and direct logo image URL for
                    each skill.
                  </p>
                </div>

                <span className="text-xs text-gray-600">
                  {items.length}{" "}
                  {items.length === 1 ? "skill" : "skills"}
                </span>
              </div>

              <div className="space-y-4">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="mb-4 flex items-center justify-between">
                      <p className="text-xs font-medium uppercase tracking-wider text-gray-600">
                        Skill {String(index + 1).padStart(2, "0")}
                      </p>

                      <button
                        type="button"
                        onClick={() =>
                          removeSkillItem(index)
                        }
                        className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-xs text-red-400 transition hover:bg-red-500/10"
                      >
                        <FiTrash2 />
                        Remove
                      </button>
                    </div>

                    <div className="grid gap-4 md:grid-cols-2">
                      {/* Skill Name */}
                      <div>
                        <label className="mb-2 block text-sm text-gray-400">
                          Skill Name
                        </label>

                        <input
                          type="text"
                          value={item.name}
                          onChange={(event) =>
                            handleItemChange(
                              index,
                              "name",
                              event.target.value,
                            )
                          }
                          placeholder="React"
                          className="admin-input"
                        />
                      </div>

                      {/* Logo URL */}
                      <div>
                        <label className="mb-2 block text-sm text-gray-400">
                          Logo URL
                        </label>

                        <input
                          type="url"
                          value={item.logoUrl}
                          onChange={(event) =>
                            handleItemChange(
                              index,
                              "logoUrl",
                              event.target.value,
                            )
                          }
                          placeholder="https://example.com/react-logo.svg"
                          className="admin-input"
                        />
                      </div>
                    </div>

                    <div className="mt-3 flex items-center gap-2 text-xs text-gray-600">
                      <FiImage size={14} />
                      <span>
                        Use a direct PNG, JPG or SVG image URL.
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Add Another Skill */}
              <button
                type="button"
                onClick={addSkillItem}
                className="mt-4 inline-flex items-center gap-2 rounded-xl border border-white/10 px-5 py-3 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
              >
                <FiPlus size={17} />
                Add Another Skill
              </button>
            </div>
          </div>

          <div className="mt-6 flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {editingId ? (
                <FiSave size={17} />
              ) : (
                <FiPlus size={17} />
              )}

              {saving
                ? "Saving..."
                : editingId
                  ? "Update Category"
                  : "Add Category"}
            </button>
          </div>
        </section>

        {/* Skills List */}
        <section className="mt-8">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">
              Skill Categories
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {skills.length} categories available
            </p>
          </div>

          {loading ? (
            <div className="rounded-xl border border-white/10 bg-white/[0.03] p-8 text-center text-sm text-gray-500">
              Loading skills...
            </div>
          ) : skills.length === 0 ? (
            <div className="rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">
              <p className="text-gray-400">
                No skill categories yet.
              </p>

              <p className="mt-2 text-sm text-gray-600">
                Add your first skill category above.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {skills.map((skill, index) => (
                <div
                  key={skill._id}
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xs text-gray-600">
                          {String(index + 1).padStart(2, "0")}
                        </span>

                        <h3 className="font-semibold">
                          {skill.category}
                        </h3>
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                        {skill.items.map((item, itemIndex) => (
                          <div
                            key={`${item.name}-${itemIndex}`}
                            className="flex min-h-28 flex-col items-center justify-center rounded-xl border border-white/10 bg-black/20 p-4 text-center"
                          >
                            <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-lg bg-white/5">
                              <img
                                src={item.logoUrl}
                                alt={item.name}
                                className="h-7 w-7 object-contain"
                                onError={(event) => {
                                  event.currentTarget.style.display =
                                    "none";
                                }}
                              />
                            </div>

                            <p className="mt-3 text-xs text-gray-400">
                              {item.name}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex shrink-0 gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(skill)}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-400 transition hover:bg-white/5 hover:text-white"
                      >
                        <FiEdit2 />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(skill._id)
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-red-500/10 px-3 py-2 text-xs text-red-400 transition hover:bg-red-500/10"
                      >
                        <FiTrash2 />
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default AdminSkills;