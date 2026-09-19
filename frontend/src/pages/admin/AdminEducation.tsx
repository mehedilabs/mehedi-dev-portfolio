import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FiBookOpen,
  FiEdit2,
  FiPlus,
  FiTrash2,
  FiX,
} from "react-icons/fi";

import API_URL from "../../config/api";

type EducationData = {
  _id: string;
  degree: string;
  institution: string;
  field: string;
  startYear: string;
  endYear: string;
  status: string;
  order: number;
};

type EducationForm = {
  degree: string;
  institution: string;
  field: string;
  startYear: string;
  endYear: string;
  status: string;
  order: number;
};

const emptyForm: EducationForm = {
  degree: "",
  institution: "",
  field: "",
  startYear: "",
  endYear: "",
  status: "",
  order: 0,
};

const AdminEducation = () => {
  const [education, setEducation] = useState<EducationData[]>([]);
  const [form, setForm] = useState<EducationForm>(emptyForm);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchEducation = async () => {
    try {
      const response = await fetch(
        `${API_URL}/education`,
        {
          method: "GET",
          cache: "no-store",
          credentials: "include",
        },
      );

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = "/admin";
          return;
        }

        throw new Error("Failed to load education");
      }

      const data = await response.json();

      console.log("Education API response:", data);

      if (Array.isArray(data)) {
        setEducation(data);
      } else {
        setEducation([]);
      }
    } catch (error) {
      console.error("Load education error:", error);

      toast.error("Failed to load education");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]:
        name === "order" ? Number(value) : value,
    }));
  };

  const resetForm = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  const handleSubmit = async () => {
    if (
      !form.degree.trim() ||
      !form.institution.trim() ||
      !form.field.trim() ||
      !form.startYear.trim() ||
      !form.endYear.trim() ||
      !form.status.trim()
    ) {
      toast.error("Please fill in all fields");
      return;
    }

    try {
      setSaving(true);

      const url = editingId
        ? `${API_URL}/education/${editingId}`
        : `${API_URL}/education`;

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

      console.log("Education save response:", data);

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = "/admin";
          return;
        }

        throw new Error(
          data.message ||
            `Failed to ${
              editingId ? "update" : "add"
            } education`,
        );
      }

      toast.success(
        editingId
          ? "Education updated successfully!"
          : "Education added successfully!",
      );

      resetForm();

      // Reload the list from MongoDB
      await fetchEducation();
    } catch (error) {
      console.error("Save education error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to save education",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (item: EducationData) => {
    setEditingId(item._id);

    setForm({
      degree: item.degree,
      institution: item.institution,
      field: item.field,
      startYear: item.startYear,
      endYear: item.endYear,
      status: item.status,
      order: item.order || 0,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this education?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/education/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      const data = await response.json();

      console.log("Education delete response:", data);

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = "/admin";
          return;
        }

        throw new Error(
          data.message || "Failed to delete education",
        );
      }

      toast.success(
        "Education deleted successfully!",
      );

      if (editingId === id) {
        resetForm();
      }

      await fetchEducation();
    } catch (error) {
      console.error("Delete education error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete education",
      );
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] p-6 text-white">
        Loading education...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
            Admin Panel
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Education
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Add, update and manage your education history.
          </p>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-8">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-xl font-semibold">
                {editingId
                  ? "Edit Education"
                  : "Add Education"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {editingId
                  ? "Update the selected education record."
                  : "Add a new education record to your portfolio."}
              </p>
            </div>

            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
              >
                <FiX size={16} />
                Cancel
              </button>
            )}
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Degree
              </label>

              <input
                name="degree"
                value={form.degree}
                onChange={handleChange}
                placeholder="B.A."
                className="admin-input"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Institution
              </label>

              <input
                name="institution"
                value={form.institution}
                onChange={handleChange}
                placeholder="Chandpur Govt. College"
                className="admin-input"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Field of Study
              </label>

              <input
                name="field"
                value={form.field}
                onChange={handleChange}
                placeholder="Philosophy"
                className="admin-input"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Start Year
              </label>

              <input
                name="startYear"
                value={form.startYear}
                onChange={handleChange}
                placeholder="2022"
                className="admin-input"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                End Year
              </label>

              <input
                name="endYear"
                value={form.endYear}
                onChange={handleChange}
                placeholder="Present"
                className="admin-input"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Status
              </label>

              <input
                name="status"
                value={form.status}
                onChange={handleChange}
                placeholder="4th Year"
                className="admin-input"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Display Order
              </label>

              <input
                type="number"
                name="order"
                value={form.order}
                onChange={handleChange}
                placeholder="0"
                className="admin-input"
              />

              <p className="mt-2 text-xs text-gray-600">
                Lower number appears first.
              </p>
            </div>
          </div>

          <div className="mt-8 flex justify-end">
            <button
              type="button"
              onClick={handleSubmit}
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {editingId ? (
                <FiEdit2 size={16} />
              ) : (
                <FiPlus size={17} />
              )}

              {saving
                ? "Saving..."
                : editingId
                  ? "Update Education"
                  : "Add Education"}
            </button>
          </div>
        </div>

        <section className="mt-8">
          <div className="mb-4">
            <h2 className="text-xl font-semibold">
              Education History
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              {education.length} education record
              {education.length !== 1 ? "s" : ""}
            </p>
          </div>

          {education.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">
              <FiBookOpen className="mx-auto text-3xl text-gray-600" />

              <h3 className="mt-4 font-medium text-gray-300">
                No education added yet
              </h3>

              <p className="mt-2 text-sm text-gray-600">
                Add your first education record using the
                form above.
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {education.map((item) => (
                <article
                  key={item._id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition hover:border-white/20 sm:p-6"
                >
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-gray-300">
                        <FiBookOpen size={20} />
                      </div>

                      <div>
                        <h3 className="text-lg font-bold">
                          {item.degree}
                        </h3>

                        <p className="mt-1 text-sm text-cyan-400/80">
                          {item.institution}
                        </p>

                        <p className="mt-2 text-sm text-gray-500">
                          {item.field}
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <button
                        type="button"
                        onClick={() => handleEdit(item)}
                        className="inline-flex items-center gap-2 rounded-lg border border-white/10 px-3 py-2 text-xs text-gray-400 transition hover:bg-white/5 hover:text-white"
                      >
                        <FiEdit2 size={14} />
                        Edit
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(item._id)
                        }
                        className="inline-flex items-center gap-2 rounded-lg border border-red-500/10 px-3 py-2 text-xs text-red-400 transition hover:bg-red-500/10"
                      >
                        <FiTrash2 size={14} />
                        Delete
                      </button>
                    </div>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-3 text-xs text-gray-500">
                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                      {item.startYear} – {item.endYear}
                    </span>

                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                      {item.status}
                    </span>

                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
                      Order: {item.order}
                    </span>
                  </div>
                </article>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AdminEducation;