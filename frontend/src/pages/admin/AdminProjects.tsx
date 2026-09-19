import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import API_URL from "../../config/api";

type Project = {
  _id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
};

type ProjectForm = {
  title: string;
  description: string;
  image: string;
  technologies: string;
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
};

const emptyForm: ProjectForm = {
  title: "",
  description: "",
  image: "",
  technologies: "",
  liveUrl: "",
  githubUrl: "",
  featured: false,
};

const AdminProjects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [form, setForm] = useState<ProjectForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const redirectToLogin = () => {
    window.location.replace("/admin");
  };

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(
          `${API_URL}/projects`,
          {
            credentials: "include",
          },
        );

        if (response.status === 401) {
          redirectToLogin();
          return;
        }

        if (!response.ok) {
          throw new Error("Failed to load projects");
        }

        const data = await response.json();

        setProjects(data);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load projects");
      } finally {
        setLoading(false);
      }
    };

    void fetchProjects();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value, type } = event.target;

    setForm((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? (event.target as HTMLInputElement).checked
          : value,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    if (!form.title.trim() || !form.description.trim()) {
      toast.error("Title and description are required");
      return;
    }

    try {
      setSaving(true);

      const projectData = {
        title: form.title.trim(),
        description: form.description.trim(),
        image: form.image.trim(),
        technologies: form.technologies
          .split(",")
          .map((technology) => technology.trim())
          .filter(Boolean),
        liveUrl: form.liveUrl.trim(),
        githubUrl: form.githubUrl.trim(),
        featured: form.featured,
      };

      const url = editingId
        ? `${API_URL}/projects/${editingId}`
        : `${API_URL}/projects`;

      const method = editingId ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(projectData),
      });

      if (response.status === 401) {
        redirectToLogin();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to save project",
        );
      }

      if (editingId) {
        setProjects((previous) =>
          previous.map((project) =>
            project._id === editingId
              ? data.project
              : project,
          ),
        );

        toast.success("Project updated successfully!");
      } else {
        setProjects((previous) => [
          data.project,
          ...previous,
        ]);

        toast.success("Project added successfully!");
      }

      setForm(emptyForm);
      setEditingId(null);
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to save project",
      );
    } finally {
      setSaving(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project._id);

    setForm({
      title: project.title,
      description: project.description,
      image: project.image,
      technologies: project.technologies.join(", "),
      liveUrl: project.liveUrl,
      githubUrl: project.githubUrl,
      featured: project.featured,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleDelete = async (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?",
    );

    if (!confirmed) {
      return;
    }

    try {
      const response = await fetch(
        `${API_URL}/projects/${id}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );

      if (response.status === 401) {
        redirectToLogin();
        return;
      }

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete project",
        );
      }

      setProjects((previous) =>
        previous.filter(
          (project) => project._id !== id,
        ),
      );

      if (editingId === id) {
        setForm(emptyForm);
        setEditingId(null);
      }

      toast.success("Project deleted successfully!");
    } catch (error) {
      console.error(error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to delete project",
      );
    }
  };

  const handleCancelEdit = () => {
    setForm(emptyForm);
    setEditingId(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#080808] p-6 text-white">
        Loading projects...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#080808] px-4 py-8 text-white sm:px-6 lg:px-8">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-xs uppercase tracking-[0.3em] text-gray-500">
            Admin Panel
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            Projects
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Add, edit and manage your portfolio projects.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 sm:p-8"
        >
          <div className="mb-6">
            <h2 className="text-xl font-semibold">
              {editingId
                ? "Edit Project"
                : "Add New Project"}
            </h2>

            <p className="mt-1 text-sm text-gray-500">
              Project information will be stored in MongoDB.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Project Title
              </label>

              <input
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Project title"
                className="admin-input"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Image URL
              </label>

              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="https://..."
                className="admin-input"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm text-gray-400">
                Description
              </label>

              <textarea
                name="description"
                value={form.description}
                onChange={handleChange}
                placeholder="Describe your project..."
                rows={5}
                className="admin-input resize-none"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="mb-2 block text-sm text-gray-400">
                Technologies
              </label>

              <input
                name="technologies"
                value={form.technologies}
                onChange={handleChange}
                placeholder="React, TypeScript, Tailwind CSS"
                className="admin-input"
              />

              <p className="mt-2 text-xs text-gray-600">
                Separate technologies with commas.
              </p>
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                Live URL
              </label>

              <input
                name="liveUrl"
                value={form.liveUrl}
                onChange={handleChange}
                placeholder="https://..."
                className="admin-input"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm text-gray-400">
                GitHub URL
              </label>

              <input
                name="githubUrl"
                value={form.githubUrl}
                onChange={handleChange}
                placeholder="https://github.com/..."
                className="admin-input"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="flex cursor-pointer items-center gap-3">
                <input
                  type="checkbox"
                  name="featured"
                  checked={form.featured}
                  onChange={handleChange}
                  className="h-4 w-4"
                />

                <span className="text-sm text-gray-400">
                  Featured Project
                </span>
              </label>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap justify-end gap-3">
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="rounded-xl border border-white/10 px-6 py-3 text-sm font-semibold text-gray-300 transition hover:bg-white/5"
              >
                Cancel
              </button>
            )}

            <button
              type="submit"
              disabled={saving}
              className="rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {saving
                ? "Saving..."
                : editingId
                  ? "Update Project"
                  : "Add Project"}
            </button>
          </div>
        </form>

        <div className="mt-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-semibold">
              Your Projects
            </h2>

            <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-400">
              {projects.length} Projects
            </span>
          </div>

          {projects.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">
              <p className="text-gray-400">
                No projects added yet.
              </p>

              <p className="mt-2 text-sm text-gray-600">
                Add your first real project using the form above.
              </p>
            </div>
          ) : (
            <div className="grid gap-5 md:grid-cols-2">
              {projects.map((project) => (
                <div
                  key={project._id}
                  className="rounded-2xl border border-white/10 bg-white/[0.03] p-5"
                >
                  {project.image && (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="mb-4 h-44 w-full rounded-xl object-cover"
                    />
                  )}

                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="text-lg font-semibold">
                        {project.title}
                      </h3>

                      {project.featured && (
                        <span className="mt-2 inline-block rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] uppercase tracking-wider text-gray-400">
                          Featured
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-gray-500">
                    {project.description}
                  </p>

                  {project.technologies.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-2">
                      {project.technologies.map(
                        (technology) => (
                          <span
                            key={technology}
                            className="rounded-full border border-white/10 bg-white/[0.03] px-2.5 py-1 text-xs text-gray-500"
                          >
                            {technology}
                          </span>
                        ),
                      )}
                    </div>
                  )}

                  <div className="mt-5 flex flex-wrap gap-3">
                    <button
                      type="button"
                      onClick={() =>
                        handleEdit(project)
                      }
                      className="rounded-lg border border-white/10 px-4 py-2 text-xs font-medium text-gray-300 transition hover:bg-white/5"
                    >
                      Edit
                    </button>

                    <button
                      type="button"
                      onClick={() =>
                        handleDelete(project._id)
                      }
                      className="rounded-lg border border-red-400/20 px-4 py-2 text-xs font-medium text-red-400 transition hover:bg-red-400/10"
                    >
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

export default AdminProjects;