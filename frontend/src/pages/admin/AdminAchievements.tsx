import { useEffect, useState } from "react";
import { FiEdit2, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import { toast } from "react-toastify";

import API_URL from "../../config/api";

type Achievement = {
  _id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  image: string;
  credentialUrl: string;
  featured: boolean;
  order: number;
};

type FormData = {
  title: string;
  organization: string;
  date: string;
  description: string;
  image: string;
  credentialUrl: string;
  featured: boolean;
  order: number;
};

const emptyForm: FormData = {
  title: "",
  organization: "",
  date: "",
  description: "",
  image: "",
  credentialUrl: "",
  featured: false,
  order: 0,
};

const AdminAchievements = () => {
  const [achievements, setAchievements] = useState<
    Achievement[]
  >([]);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(
    null,
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const fetchAchievements = async () => {
    try {
      const response = await fetch(
        `${API_URL}/achievements`,
        {
          credentials: "include",
        },
      );

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = "/admin";
          return;
        }

        throw new Error("Failed to load achievements");
      }

      const data = await response.json();

      setAchievements(data);
    } catch (error) {
      console.error(
        "Load achievements error:",
        error,
      );

      toast.error("Failed to load achievements");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const updateField = (
    field: keyof FormData,
    value: string | boolean | number,
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent,
  ) => {
    event.preventDefault();

    if (!form.title.trim()) {
      toast.error("Achievement title is required");
      return;
    }

    setSaving(true);

    try {
      const url = editingId
        ? `${API_URL}/achievements/${editingId}`
        : `${API_URL}/achievements`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = "/admin";
          return;
        }

        throw new Error(
          data.message || "Something went wrong",
        );
      }

      toast.success(
        editingId
          ? "Achievement updated successfully"
          : "Achievement added successfully",
      );

      setForm(emptyForm);
      setEditingId(null);

      await fetchAchievements();
    } catch (error) {
      console.error(
        "Save achievement error:",
        error,
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to save achievement",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (
    achievement: Achievement,
  ) => {
    setEditingId(achievement._id);

    setForm({
      title: achievement.title,
      organization: achievement.organization,
      date: achievement.date,
      description: achievement.description,
      image: achievement.image,
      credentialUrl: achievement.credentialUrl,
      featured: achievement.featured,
      order: achievement.order,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this achievement?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/achievements/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = "/admin";
          return;
        }

        throw new Error(
          data.message || "Failed to delete",
        );
      }

      toast.success(
        "Achievement deleted successfully",
      );

      await fetchAchievements();
    } catch (error) {
      console.error(
        "Delete achievement error:",
        error,
      );

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete achievement",
      );
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  return (
    <div className="min-h-screen bg-[#050b14] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-cyan-400/70">
            Admin Panel
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            {editingId
              ? "Edit Achievement"
              : "Manage Achievements"}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Add and manage your achievements, certificates,
            awards and recognitions.
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/[0.08] bg-[#08111d]/80 p-5 backdrop-blur-md sm:p-7"
        >
          {/* Basic Information */}
          <div>
            <h2 className="text-lg font-semibold text-white">
              Achievement Information
            </h2>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Title *
                </label>

                <input
                  type="text"
                  value={form.title}
                  onChange={(event) =>
                    updateField(
                      "title",
                      event.target.value,
                    )
                  }
                  placeholder="e.g. React Development Certificate"
                  className="admin-input"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Organization
                </label>

                <input
                  type="text"
                  value={form.organization}
                  onChange={(event) =>
                    updateField(
                      "organization",
                      event.target.value,
                    )
                  }
                  placeholder="e.g. Programming Hero"
                  className="admin-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Date
                </label>

                <input
                  type="text"
                  value={form.date}
                  onChange={(event) =>
                    updateField(
                      "date",
                      event.target.value,
                    )
                  }
                  placeholder="e.g. September 2026"
                  className="admin-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Credential URL
                </label>

                <input
                  type="url"
                  value={form.credentialUrl}
                  onChange={(event) =>
                    updateField(
                      "credentialUrl",
                      event.target.value,
                    )
                  }
                  placeholder="https://example.com/credential"
                  className="admin-input"
                />
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="mt-8 border-t border-white/[0.07] pt-8">
            <h2 className="text-lg font-semibold text-white">
              Description
            </h2>

            <textarea
              value={form.description}
              onChange={(event) =>
                updateField(
                  "description",
                  event.target.value,
                )
              }
              placeholder="Write a short description about this achievement..."
              rows={5}
              className="admin-input mt-5 resize-none"
            />
          </div>

          {/* Image */}
          <div className="mt-8 border-t border-white/[0.07] pt-8">
            <h2 className="text-lg font-semibold text-white">
              Certificate / Achievement Image
            </h2>

            <div className="mt-5">
              <label className="mb-2 block text-sm text-gray-400">
                Image URL
              </label>

              <input
                type="url"
                value={form.image}
                onChange={(event) =>
                  updateField(
                    "image",
                    event.target.value,
                  )
                }
                placeholder="https://example.com/certificate.png"
                className="admin-input"
              />

              <p className="mt-2 text-xs text-gray-600">
                You can add the image URL later if you don't
                have one yet.
              </p>
            </div>
          </div>

          {/* Display Settings */}
          <div className="mt-8 border-t border-white/[0.07] pt-8">
            <h2 className="text-lg font-semibold text-white">
              Display Settings
            </h2>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Display Order
                </label>

                <input
                  type="number"
                  value={form.order}
                  onChange={(event) =>
                    updateField(
                      "order",
                      Number(event.target.value),
                    )
                  }
                  className="admin-input"
                />
              </div>

              <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-white/[0.07] bg-white/[0.02] px-4">
                <input
                  type="checkbox"
                  checked={form.featured}
                  onChange={(event) =>
                    updateField(
                      "featured",
                      event.target.checked,
                    )
                  }
                  className="h-4 w-4 accent-cyan-400"
                />

                <span className="text-sm text-gray-300">
                  Featured Achievement
                </span>
              </label>
            </div>
          </div>

          {/* Actions */}
          <div className="mt-8 flex flex-wrap gap-3 border-t border-white/[0.07] pt-8">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-lg bg-cyan-400 px-5 py-2.5 text-sm font-semibold text-gray-950 transition hover:bg-cyan-300 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FiPlus size={16} />

              {saving
                ? "Saving..."
                : editingId
                  ? "Update Achievement"
                  : "Add Achievement"}
            </button>

            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-5 py-2.5 text-sm font-semibold text-gray-300 transition hover:bg-white/[0.06] hover:text-white"
              >
                <FiX size={16} />
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Achievement List */}
        <div className="mt-10">
          <h2 className="mb-5 text-lg font-semibold">
            Existing Achievements
          </h2>

          {loading ? (
            <p className="text-sm text-gray-600">
              Loading achievements...
            </p>
          ) : achievements.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center">
              <p className="text-sm text-gray-500">
                No achievements added yet.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {achievements.map((achievement) => (
                <div
                  key={achievement._id}
                  className="flex flex-col gap-4 rounded-xl border border-white/[0.08] bg-[#08111d]/70 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-white">
                        {achievement.title}
                      </h3>

                      {achievement.featured && (
                        <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-[9px] uppercase tracking-wider text-gray-500">
                          Featured
                        </span>
                      )}
                    </div>

                    {achievement.organization && (
                      <p className="mt-1 text-sm text-gray-500">
                        {achievement.organization}
                      </p>
                    )}

                    {achievement.date && (
                      <p className="mt-1 text-xs text-gray-600">
                        {achievement.date}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(achievement)
                      }
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-gray-400 transition hover:text-white"
                    >
                      <FiEdit2 size={13} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(achievement._id)
                      }
                      className="inline-flex items-center gap-2 rounded-lg border border-red-400/10 bg-red-400/[0.03] px-3 py-2 text-xs font-medium text-red-400/70 transition hover:text-red-400"
                    >
                      <FiTrash2 size={13} />
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminAchievements;