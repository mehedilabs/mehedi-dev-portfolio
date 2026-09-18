import { useEffect, useState } from "react";
import { FiEdit2, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import { toast } from "react-toastify";

import API_URL from "../../config/api";

type Experience = {
  _id: string;
  role: string;
  company: string;
  employmentType: string;
  location: string;
  workMode: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  companyWebsite: string;
  companyLogo: string;
  featured: boolean;
  order: number;
};

type FormData = {
  role: string;
  company: string;
  employmentType: string;
  location: string;
  workMode: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  companyWebsite: string;
  companyLogo: string;
  featured: boolean;
  order: number;
};



const emptyForm: FormData = {
  role: "",
  company: "",
  employmentType: "Full-time",
  location: "",
  workMode: "Remote",
  startDate: "",
  endDate: "",
  current: false,
  description: "",
  responsibilities: [""],
  achievements: [""],
  technologies: [""],
  companyWebsite: "",
  companyLogo: "",
  featured: false,
  order: 0,
};

const AdminExperience = () => {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [form, setForm] = useState<FormData>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const token = localStorage.getItem("adminToken");

  const fetchExperiences = async () => {
    try {
      const response = await fetch(`${API_URL}/experiences`);

      if (!response.ok) {
        throw new Error("Failed to load experiences");
      }

      const data = await response.json();

      setExperiences(data);
    } catch (error) {
      console.error("Load experiences error:", error);
      toast.error("Failed to load experiences");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
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

  const updateArrayItem = (
    field:
      | "responsibilities"
      | "achievements"
      | "technologies",
    index: number,
    value: string,
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: previous[field].map((item, itemIndex) =>
        itemIndex === index ? value : item,
      ),
    }));
  };

  const addArrayItem = (
    field:
      | "responsibilities"
      | "achievements"
      | "technologies",
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: [...previous[field], ""],
    }));
  };

  const removeArrayItem = (
    field:
      | "responsibilities"
      | "achievements"
      | "technologies",
    index: number,
  ) => {
    setForm((previous) => ({
      ...previous,
      [field]: previous[field].filter(
        (_, itemIndex) => itemIndex !== index,
      ),
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!token) {
      toast.error("Admin login required");
      return;
    }

    if (!form.role.trim() || !form.company.trim()) {
      toast.error("Role and company are required");
      return;
    }

    setSaving(true);

    try {
      const url = editingId
        ? `${API_URL}/experiences/${editingId}`
        : `${API_URL}/experiences`;

      const method = editingId ? "PUT" : "POST";

      const cleanedData = {
        ...form,
        responsibilities: form.responsibilities.filter(
          (item) => item.trim() !== "",
        ),
        achievements: form.achievements.filter(
          (item) => item.trim() !== "",
        ),
        technologies: form.technologies.filter(
          (item) => item.trim() !== "",
        ),
      };

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(cleanedData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      toast.success(
        editingId
          ? "Experience updated successfully"
          : "Experience added successfully",
      );

      setForm(emptyForm);
      setEditingId(null);

      fetchExperiences();
    } catch (error) {
      console.error("Save experience error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to save experience",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (experience: Experience) => {
    setEditingId(experience._id);

    setForm({
      role: experience.role,
      company: experience.company,
      employmentType: experience.employmentType,
      location: experience.location,
      workMode: experience.workMode,
      startDate: experience.startDate,
      endDate: experience.endDate,
      current: experience.current,
      description: experience.description,
      responsibilities:
        experience.responsibilities.length > 0
          ? experience.responsibilities
          : [""],
      achievements:
        experience.achievements.length > 0
          ? experience.achievements
          : [""],
      technologies:
        experience.technologies.length > 0
          ? experience.technologies
          : [""],
      companyWebsite: experience.companyWebsite,
      companyLogo: experience.companyLogo,
      featured: experience.featured,
      order: experience.order,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id: string) => {
    if (!token) {
      toast.error("Admin login required");
      return;
    }

    const confirmed = window.confirm(
      "Are you sure you want to delete this experience?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/experiences/${id}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to delete");
      }

      toast.success("Experience deleted successfully");

      fetchExperiences();
    } catch (error) {
      console.error("Delete experience error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete experience",
      );
    }
  };

  const handleCancel = () => {
    setEditingId(null);
    setForm(emptyForm);
  };

  const renderArrayField = (
    title: string,
    field:
      | "responsibilities"
      | "achievements"
      | "technologies",
  ) => {
    return (
      <div>
        <div className="mb-3 flex items-center justify-between">
          <label className="text-sm font-medium text-gray-300">
            {title}
          </label>

          <button
            type="button"
            onClick={() => addArrayItem(field)}
            className="inline-flex items-center gap-1.5 text-xs font-medium text-cyan-400 transition hover:text-cyan-300"
          >
            <FiPlus size={13} />
            Add
          </button>
        </div>

        <div className="space-y-2">
          {form[field].map((item, index) => (
            <div
              key={`${field}-${index}`}
              className="flex gap-2"
            >
              <input
                type="text"
                value={item}
                onChange={(event) =>
                  updateArrayItem(
                    field,
                    index,
                    event.target.value,
                  )
                }
                placeholder={`Enter ${title.toLowerCase()}...`}
                className="admin-input"
              />

              {form[field].length > 1 && (
                <button
                  type="button"
                  onClick={() =>
                    removeArrayItem(field, index)
                  }
                  className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-red-400/10 bg-red-400/[0.03] text-red-400/70 transition hover:border-red-400/20 hover:text-red-400"
                >
                  <FiX size={16} />
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    );
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
              ? "Edit Experience"
              : "Manage Experience"}
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Add and manage your professional development
            experience.
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
              Basic Information
            </h2>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Position / Role *
                </label>

                <input
                  type="text"
                  value={form.role}
                  onChange={(event) =>
                    updateField("role", event.target.value)
                  }
                  placeholder="e.g. Full-Stack Developer"
                  className="admin-input"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Company / Organization *
                </label>

                <input
                  type="text"
                  value={form.company}
                  onChange={(event) =>
                    updateField(
                      "company",
                      event.target.value,
                    )
                  }
                  placeholder="e.g. Company Name"
                  className="admin-input"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Employment Type
                </label>

                <select
                  value={form.employmentType}
                  onChange={(event) =>
                    updateField(
                      "employmentType",
                      event.target.value,
                    )
                  }
                  className="admin-input"
                >
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Internship">
                    Internship
                  </option>
                  <option value="Freelance">Freelance</option>
                  <option value="Contract">Contract</option>
                  <option value="Self-employed">
                    Self-employed
                  </option>
                  <option value="Project-based">
                    Project-based
                  </option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Work Mode
                </label>

                <select
                  value={form.workMode}
                  onChange={(event) =>
                    updateField(
                      "workMode",
                      event.target.value,
                    )
                  }
                  className="admin-input"
                >
                  <option value="Remote">Remote</option>
                  <option value="On-site">On-site</option>
                  <option value="Hybrid">Hybrid</option>
                </select>
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Location
                </label>

                <input
                  type="text"
                  value={form.location}
                  onChange={(event) =>
                    updateField(
                      "location",
                      event.target.value,
                    )
                  }
                  placeholder="e.g. Dhaka, Bangladesh"
                  className="admin-input"
                />
              </div>
            </div>
          </div>

          {/* Timeline */}
          <div className="mt-8 border-t border-white/[0.07] pt-8">
            <h2 className="text-lg font-semibold text-white">
              Timeline
            </h2>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Start Date *
                </label>

                <input
                  type="text"
                  value={form.startDate}
                  onChange={(event) =>
                    updateField(
                      "startDate",
                      event.target.value,
                    )
                  }
                  placeholder="e.g. January 2026"
                  className="admin-input"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  End Date
                </label>

                <input
                  type="text"
                  value={form.endDate}
                  onChange={(event) =>
                    updateField(
                      "endDate",
                      event.target.value,
                    )
                  }
                  placeholder="e.g. December 2026"
                  className="admin-input"
                  disabled={form.current}
                />
              </div>
            </div>

            <label className="mt-5 flex cursor-pointer items-center gap-3">
              <input
                type="checkbox"
                checked={form.current}
                onChange={(event) => {
                  updateField(
                    "current",
                    event.target.checked,
                  );

                  if (event.target.checked) {
                    updateField("endDate", "");
                  }
                }}
                className="h-4 w-4 accent-cyan-400"
              />

              <span className="text-sm text-gray-300">
                I currently work here
              </span>
            </label>
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
              placeholder="Write a short description about this experience..."
              rows={5}
              className="admin-input mt-5 resize-none"
            />
          </div>

          {/* Dynamic Fields */}
          <div className="mt-8 grid gap-8 border-t border-white/[0.07] pt-8 lg:grid-cols-3">
            {renderArrayField(
              "Responsibilities",
              "responsibilities",
            )}

            {renderArrayField(
              "Achievements",
              "achievements",
            )}

            {renderArrayField(
              "Technologies",
              "technologies",
            )}
          </div>

          {/* Company Information */}
          <div className="mt-8 border-t border-white/[0.07] pt-8">
            <h2 className="text-lg font-semibold text-white">
              Company Information
            </h2>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Company Website
                </label>

                <input
                  type="url"
                  value={form.companyWebsite}
                  onChange={(event) =>
                    updateField(
                      "companyWebsite",
                      event.target.value,
                    )
                  }
                  placeholder="https://example.com"
                  className="admin-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Company Logo URL
                </label>

                <input
                  type="url"
                  value={form.companyLogo}
                  onChange={(event) =>
                    updateField(
                      "companyLogo",
                      event.target.value,
                    )
                  }
                  placeholder="https://example.com/logo.png"
                  className="admin-input"
                />
              </div>
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
                  Featured Experience
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
                  ? "Update Experience"
                  : "Add Experience"}
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

        {/* Experience List */}
        <div className="mt-10">
          <h2 className="mb-5 text-lg font-semibold">
            Existing Experiences
          </h2>

          {loading ? (
            <p className="text-sm text-gray-600">
              Loading experiences...
            </p>
          ) : experiences.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center">
              <p className="text-sm text-gray-500">
                No experiences added yet.
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {experiences.map((experience) => (
                <div
                  key={experience._id}
                  className="flex flex-col gap-4 rounded-xl border border-white/[0.08] bg-[#08111d]/70 p-5 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-semibold text-white">
                        {experience.role}
                      </h3>

                      {experience.current && (
                        <span className="rounded-full border border-cyan-400/10 bg-cyan-400/[0.05] px-2 py-1 text-[9px] uppercase tracking-wider text-cyan-400">
                          Current
                        </span>
                      )}

                      {experience.featured && (
                        <span className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-1 text-[9px] uppercase tracking-wider text-gray-500">
                          Featured
                        </span>
                      )}
                    </div>

                    <p className="mt-1 text-sm text-gray-500">
                      {experience.company}
                    </p>

                    <p className="mt-1 text-xs text-gray-600">
                      {experience.startDate} —{" "}
                      {experience.current
                        ? "Present"
                        : experience.endDate}
                    </p>
                  </div>

                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(experience)
                      }
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-gray-400 transition hover:text-white"
                    >
                      <FiEdit2 size={13} />
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(experience._id)
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

export default AdminExperience;