import { useEffect, useState } from "react";
import { FiSave } from "react-icons/fi";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import API_URL from "../../config/api";

interface ProfileData {
  name: string;
  jobTitle: string;
  tagline: string;
  description: string;
  location: string;
  available: boolean;
  profileImage: string;
  resumeUrl: string;
  email: string;
  phone: string;
  whatsapp: string;
  github: string;
  linkedin: string;
}

const AdminProfile = () => {
  const [profile, setProfile] = useState<ProfileData>({
    name: "",
    jobTitle: "",
    tagline: "",
    description: "",
    location: "",
    available: false,
    profileImage: "",
    resumeUrl: "",
    email: "",
    phone: "",
    whatsapp: "",
    github: "",
    linkedin: "",
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const response = await fetch(
          `${API_URL}/profile`,
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to load profile",
          );
        }

        setProfile(data);
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        } else {
          toast.error("Something went wrong");
        }
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = event.target;

    setProfile((previousProfile) => ({
      ...previousProfile,
      [name]: value,
    }));
  };

  const handleAvailableChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setProfile((previousProfile) => ({
      ...previousProfile,
      available: event.target.checked,
    }));
  };

  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    event.preventDefault();

    try {
      setSaving(true);

      const response = await fetch(
        `${API_URL}/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify(profile),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        if (response.status === 401) {
          window.location.href = "/admin";
          return;
        }

        throw new Error(
          data.message || "Profile update failed",
        );
      }

      setProfile(data.profile);

      toast.success("Profile updated successfully!");
    } catch (error) {
      if (error instanceof Error) {
        toast.error(error.message);
      } else {
        toast.error("Something went wrong");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />

          <p className="mt-4 text-sm text-gray-500">
            Loading profile...
          </p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#050505] px-5 py-8 text-white md:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="mb-8">
          <p className="text-sm text-gray-500">
            Portfolio Management
          </p>

          <h1 className="mt-1 text-3xl font-bold">
            Profile Management
          </h1>

          <p className="mt-2 text-sm text-gray-500">
            Update the information displayed across your
            portfolio.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-lg font-semibold">
              Basic Information
            </h2>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Name
                </label>

                <input
                  type="text"
                  name="name"
                  value={profile.name}
                  onChange={handleChange}
                  className="admin-input"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Job Title
                </label>

                <input
                  type="text"
                  name="jobTitle"
                  value={profile.jobTitle}
                  onChange={handleChange}
                  className="admin-input"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-gray-400">
                  Tagline
                </label>

                <input
                  type="text"
                  name="tagline"
                  value={profile.tagline}
                  onChange={handleChange}
                  className="admin-input"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm text-gray-400">
                  Description
                </label>

                <textarea
                  name="description"
                  value={profile.description}
                  onChange={handleChange}
                  rows={5}
                  className="admin-input resize-none"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Location
                </label>

                <input
                  type="text"
                  name="location"
                  value={profile.location}
                  onChange={handleChange}
                  className="admin-input"
                  required
                />
              </div>

              <div className="flex items-center">
                <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-300">
                  <input
                    type="checkbox"
                    checked={profile.available}
                    onChange={handleAvailableChange}
                    className="h-4 w-4"
                  />

                  Available for work
                </label>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-lg font-semibold">
              Profile & Resume
            </h2>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Profile Image URL
                </label>

                <input
                  type="url"
                  name="profileImage"
                  value={profile.profileImage}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="admin-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Resume URL
                </label>

                <input
                  type="url"
                  name="resumeUrl"
                  value={profile.resumeUrl}
                  onChange={handleChange}
                  placeholder="https://..."
                  className="admin-input"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-lg font-semibold">
              Contact Information
            </h2>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Email
                </label>

                <input
                  type="email"
                  name="email"
                  value={profile.email}
                  onChange={handleChange}
                  className="admin-input"
                  required
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  Phone
                </label>

                <input
                  type="text"
                  name="phone"
                  value={profile.phone}
                  onChange={handleChange}
                  className="admin-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  WhatsApp
                </label>

                <input
                  type="url"
                  name="whatsapp"
                  value={profile.whatsapp}
                  onChange={handleChange}
                  className="admin-input"
                />
              </div>
            </div>
          </section>

          <section className="rounded-2xl border border-white/10 bg-white/[0.03] p-6">
            <h2 className="text-lg font-semibold">
              Social Links
            </h2>

            <div className="mt-5 grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  GitHub
                </label>

                <input
                  type="url"
                  name="github"
                  value={profile.github}
                  onChange={handleChange}
                  className="admin-input"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm text-gray-400">
                  LinkedIn
                </label>

                <input
                  type="url"
                  name="linkedin"
                  value={profile.linkedin}
                  onChange={handleChange}
                  className="admin-input"
                />
              </div>
            </div>
          </section>

          <div className="flex justify-end">
            <button
              type="submit"
              disabled={saving}
              className="flex items-center gap-2 rounded-xl bg-white px-6 py-3 font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <FiSave size={18} />

              {saving ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      </div>

      <ToastContainer
        position="bottom-right"
        theme="dark"
      />
    </main>
  );
};

export default AdminProfile;