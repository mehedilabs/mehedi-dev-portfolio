import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import {
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiCode,
  FiFolder,
  FiHome,
  FiLogOut,
  FiMail,
  FiSave,
  FiSettings,
  FiUser,
} from "react-icons/fi";

import API_URL from "../../config/api";

const AdminDashboard = () => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [projectCount, setProjectCount] = useState(0);
  const [achievementCount, setAchievementCount] = useState(0);

  const [experience, setExperience] = useState("00");
  const [clients, setClients] = useState("00");
  const [savingStats, setSavingStats] = useState(false);

  useEffect(() => {
    const checkAuthentication = async () => {
      try {
        const [
          authResponse,
          projectResponse,
          achievementResponse,
          statsResponse,
        ] = await Promise.all([
          fetch(`${API_URL}/admin/dashboard`, {
            method: "GET",
            credentials: "include",
          }),

          fetch(`${API_URL}/projects/count`),

          fetch(`${API_URL}/achievements`),

          fetch(`${API_URL}/stats`),
        ]);

        if (!authResponse.ok) {
          window.location.href = "/admin";
          return;
        }

        if (projectResponse.ok) {
          const projectData = await projectResponse.json();

          setProjectCount(projectData.count);
        }

        if (achievementResponse.ok) {
          const achievementData =
            await achievementResponse.json();

          setAchievementCount(achievementData.length);
        }

        if (statsResponse.ok) {
          const statsData = await statsResponse.json();

          setExperience(statsData.experience);
          setClients(statsData.clients);
        }

        setCheckingAuth(false);
      } catch (error) {
        console.error("Authentication check failed:", error);

        window.location.href = "/admin";
      }
    };

    checkAuthentication();
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${API_URL}/auth/logout`, {
        method: "POST",
        credentials: "include",
      });
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      window.location.href = "/admin";
    }
  };

  const handleSaveStats = async () => {
    try {
      setSavingStats(true);

      const response = await fetch(`${API_URL}/stats`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          experience,
          clients,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update stats",
        );
      }

      setExperience(data.stats.experience);
      setClients(data.stats.clients);

      toast.success("Stats updated successfully!");
    } catch (error) {
      console.error("Update stats error:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to update stats",
      );
    } finally {
      setSavingStats(false);
    }
  };

  const menuItems = [
    {
      name: "Dashboard",
      icon: FiHome,
      active: true,
    },
    {
      name: "Profile",
      icon: FiUser,
    },
    {
      name: "About",
      icon: FiUser,
    },
    {
      name: "Skills",
      icon: FiCode,
    },
    {
      name: "Projects",
      icon: FiFolder,
    },
    {
      name: "Experience",
      icon: FiBriefcase,
    },
    {
      name: "Education",
      icon: FiBookOpen,
    },
    {
      name: "Achievements",
      icon: FiAward,
    },
    {
      name: "Messages",
      icon: FiMail,
    },
  ];

  const stats = [
    {
      title: "Projects",
      value: projectCount.toString(),
      icon: FiFolder,
    },
    {
      title: "Skills",
      value: "0",
      icon: FiCode,
    },
    {
      title: "Messages",
      value: "0",
      icon: FiMail,
    },
    {
      title: "Achievements",
      value: achievementCount.toString(),
      icon: FiAward,
    },
  ];

  if (checkingAuth) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#050505] text-white">
        <div className="text-center">
          <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-white/20 border-t-white" />

          <p className="mt-4 text-sm text-gray-500">
            Checking authentication...
          </p>
        </div>
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-[#050505] text-white">
      <div className="flex min-h-screen">
        {/* Sidebar */}
        <aside className="hidden w-64 shrink-0 border-r border-white/10 bg-[#090909] lg:block">
          <div className="sticky top-0 flex h-screen flex-col">
            <div className="border-b border-white/10 px-6 py-6">
              <h1 className="text-xl font-bold">
                Mehedi<span className="text-gray-400"> Admin</span>
              </h1>

              <p className="mt-1 text-xs text-gray-500">
                Portfolio Control Panel
              </p>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto p-4">
              {menuItems.map((item) => {
                const Icon = item.icon;

                if (item.name === "Profile") {
                  return (
                    <a
                      key={item.name}
                      href="/admin/profile"
                      className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
                    >
                      <Icon size={18} />
                      <span>{item.name}</span>
                    </a>
                  );
                }

                if (item.name === "About") {
                  return (
                    <a
                      key={item.name}
                      href="/admin/about"
                      className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
                    >
                      <Icon size={18} />
                      <span>{item.name}</span>
                    </a>
                  );
                }

                if (item.name === "Skills") {
                  return (
                    <a
                      key={item.name}
                      href="/admin/skills"
                      className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
                    >
                      <Icon size={18} />
                      <span>{item.name}</span>
                    </a>
                  );
                }

                if (item.name === "Projects") {
                  return (
                    <a
                      key={item.name}
                      href="/admin/projects"
                      className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
                    >
                      <Icon size={18} />
                      <span>{item.name}</span>
                    </a>
                  );
                }

                if (item.name === "Experience") {
                  return (
                    <a
                      key={item.name}
                      href="/admin/experience"
                      className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
                    >
                      <Icon size={18} />
                      <span>{item.name}</span>
                    </a>
                  );
                }

                if (item.name === "Education") {
                  return (
                    <a
                      key={item.name}
                      href="/admin/education"
                      className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
                    >
                      <Icon size={18} />
                      <span>{item.name}</span>
                    </a>
                  );
                }

                if (item.name === "Achievements") {
                  return (
                    <a
                      key={item.name}
                      href="/admin/achievements"
                      className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
                    >
                      <Icon size={18} />
                      <span>{item.name}</span>
                    </a>
                  );
                }

                if (item.name === "Messages") {
                  return (
                    <a
                      key={item.name}
                      href="/admin/messages"
                      className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
                    >
                      <Icon size={18} />
                      <span>{item.name}</span>
                    </a>
                  );
                }

                return (
                  <button
                    key={item.name}
                    type="button"
                    className={`flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm transition ${
                      item.active
                        ? "bg-white text-black"
                        : "text-gray-400 hover:bg-white/5 hover:text-white"
                    }`}
                  >
                    <Icon size={18} />
                    <span>{item.name}</span>
                  </button>
                );
              })}
            </nav>

            <div className="border-t border-white/10 p-4">
              <button
                type="button"
                className="flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 transition hover:bg-white/5 hover:text-white"
              >
                <FiSettings size={18} />
                <span>Settings</span>
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="mt-1 flex w-full items-center gap-3 rounded-lg px-4 py-3 text-sm text-gray-400 transition hover:bg-red-500/10 hover:text-red-400"
              >
                <FiLogOut size={18} />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1">
          <header className="border-b border-white/10 bg-[#050505]/90 px-5 py-5 backdrop-blur md:px-8">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-sm text-gray-500">
                  Welcome back
                </p>

                <h2 className="mt-1 text-2xl font-bold">
                  Admin Dashboard
                </h2>
              </div>

              <div className="hidden text-right sm:block">
                <p className="text-sm text-gray-400">
                  Mehedi Hasan
                </p>

                <p className="text-xs text-gray-600">
                  Administrator
                </p>
              </div>
            </div>
          </header>

          <div className="mx-auto max-w-7xl p-5 md:p-8">
            {/* Mobile Menu */}
            <div className="mb-6 overflow-x-auto lg:hidden">
              <div className="flex min-w-max gap-2">
                {menuItems.map((item) => {
                  const Icon = item.icon;

                  if (item.name === "Profile") {
                    return (
                      <a
                        key={item.name}
                        href="/admin/profile"
                        className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2.5 text-sm text-gray-400"
                      >
                        <Icon size={16} />
                        <span>{item.name}</span>
                      </a>
                    );
                  }

                  if (item.name === "About") {
                    return (
                      <a
                        key={item.name}
                        href="/admin/about"
                        className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2.5 text-sm text-gray-400"
                      >
                        <Icon size={16} />
                        <span>{item.name}</span>
                      </a>
                    );
                  }

                  if (item.name === "Skills") {
                    return (
                      <a
                        key={item.name}
                        href="/admin/skills"
                        className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2.5 text-sm text-gray-400"
                      >
                        <Icon size={16} />
                        <span>{item.name}</span>
                      </a>
                    );
                  }

                  if (item.name === "Projects") {
                    return (
                      <a
                        key={item.name}
                        href="/admin/projects"
                        className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2.5 text-sm text-gray-400"
                      >
                        <Icon size={16} />
                        <span>{item.name}</span>
                      </a>
                    );
                  }

                  if (item.name === "Experience") {
                    return (
                      <a
                        key={item.name}
                        href="/admin/experience"
                        className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2.5 text-sm text-gray-400"
                      >
                        <Icon size={16} />
                        <span>{item.name}</span>
                      </a>
                    );
                  }

                  if (item.name === "Education") {
                    return (
                      <a
                        key={item.name}
                        href="/admin/education"
                        className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2.5 text-sm text-gray-400"
                      >
                        <Icon size={16} />
                        <span>{item.name}</span>
                      </a>
                    );
                  }

                  if (item.name === "Achievements") {
                    return (
                      <a
                        key={item.name}
                        href="/admin/achievements"
                        className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2.5 text-sm text-gray-400"
                      >
                        <Icon size={16} />
                        <span>{item.name}</span>
                      </a>
                    );
                  }

                  if (item.name === "Messages") {
                    return (
                      <a
                        key={item.name}
                        href="/admin/messages"
                        className="flex items-center gap-2 rounded-lg bg-white/5 px-4 py-2.5 text-sm text-gray-400"
                      >
                        <Icon size={16} />
                        <span>{item.name}</span>
                      </a>
                    );
                  }

                  return (
                    <button
                      key={item.name}
                      type="button"
                      className={`flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm ${
                        item.active
                          ? "bg-white text-black"
                          : "bg-white/5 text-gray-400"
                      }`}
                    >
                      <Icon size={16} />
                      <span>{item.name}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Stats */}
            <section>
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {stats.map((stat) => {
                  const Icon = stat.icon;

                  return (
                    <div
                      key={stat.title}
                      className="rounded-xl border border-white/10 bg-white/[0.03] p-5"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-gray-500">
                            {stat.title}
                          </p>

                          <p className="mt-2 text-3xl font-bold">
                            {stat.value}
                          </p>
                        </div>

                        <div className="rounded-lg bg-white/5 p-3 text-gray-300">
                          <Icon size={20} />
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Stats Management */}
            <section className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-6">
              <div className="mb-6">
                <p className="text-sm font-medium text-gray-400">
                  Portfolio Stats
                </p>

                <h3 className="mt-2 text-xl font-semibold">
                  Manage Experience & Clients
                </h3>

                <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                  Update the numbers shown in your public portfolio.
                  Projects are calculated automatically from your
                  Projects database.
                </p>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                {/* Experience */}
                <div>
                  <label className="mb-2 block text-sm text-gray-400">
                    Experience
                  </label>

                  <input
                    type="text"
                    value={experience}
                    onChange={(event) =>
                      setExperience(event.target.value)
                    }
                    placeholder="00"
                    className="admin-input"
                  />

                  <p className="mt-2 text-xs text-gray-600">
                    Example: 1+, 2+, 3+
                  </p>
                </div>

                {/* Clients */}
                <div>
                  <label className="mb-2 block text-sm text-gray-400">
                    Clients
                  </label>

                  <input
                    type="text"
                    value={clients}
                    onChange={(event) =>
                      setClients(event.target.value)
                    }
                    placeholder="00"
                    className="admin-input"
                  />

                  <p className="mt-2 text-xs text-gray-600">
                    Example: 5+, 10+, 20+
                  </p>
                </div>
              </div>

              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={handleSaveStats}
                  disabled={savingStats}
                  className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3 text-sm font-semibold text-black transition hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <FiSave size={17} />

                  {savingStats ? "Saving..." : "Save Stats"}
                </button>
              </div>
            </section>

            {/* Welcome */}
            <section className="mt-6 rounded-xl border border-white/10 bg-white/[0.03] p-6">
              <p className="text-sm font-medium text-gray-400">
                Portfolio Management
              </p>

              <h3 className="mt-2 text-xl font-semibold">
                Manage everything from one place
              </h3>

              <p className="mt-2 max-w-2xl text-sm leading-6 text-gray-500">
                Update your profile, skills, projects, education,
                achievements, contact information and other portfolio
                content without changing the source code.
              </p>
            </section>

            {/* Quick Actions */}
            <section className="mt-6">
              <div className="mb-4">
                <h3 className="text-lg font-semibold">
                  Quick Actions
                </h3>

                <p className="mt-1 text-sm text-gray-500">
                  Common portfolio management tasks
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-6">
                {/* Edit Profile */}
                <a
                  href="/admin/profile"
                  className="block rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <FiUser size={20} />

                  <h4 className="mt-4 font-medium">
                    Edit Profile
                  </h4>

                  <p className="mt-1 text-sm text-gray-500">
                    Update your basic information
                  </p>
                </a>

                {/* Add Project */}
                <a
                  href="/admin/projects"
                  className="block rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <FiFolder size={20} />

                  <h4 className="mt-4 font-medium">
                    Add Project
                  </h4>

                  <p className="mt-1 text-sm text-gray-500">
                    Add a new portfolio project
                  </p>
                </a>

                {/* Manage Skills */}
                <a
                  href="/admin/skills"
                  className="block rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <FiCode size={20} />

                  <h4 className="mt-4 font-medium">
                    Manage Skills
                  </h4>

                  <p className="mt-1 text-sm text-gray-500">
                    Add or update your skills
                  </p>
                </a>

                {/* Manage Experience */}
                <a
                  href="/admin/experience"
                  className="block rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-cyan-400/20 hover:bg-white/[0.05]"
                >
                  <FiBriefcase
                    size={20}
                    className="text-cyan-400"
                  />

                  <h4 className="mt-4 font-medium">
                    Manage Experience
                  </h4>

                  <p className="mt-1 text-sm text-gray-500">
                    Add or update your experience
                  </p>
                </a>

                {/* Manage Education */}
                <a
                  href="/admin/education"
                  className="block rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <FiBookOpen size={20} />

                  <h4 className="mt-4 font-medium">
                    Manage Education
                  </h4>

                  <p className="mt-1 text-sm text-gray-500">
                    Add or update your education
                  </p>
                </a>

                {/* Manage Achievements */}
                <a
                  href="/admin/achievements"
                  className="block rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <FiAward size={20} />

                  <h4 className="mt-4 font-medium">
                    Manage Achievements
                  </h4>

                  <p className="mt-1 text-sm text-gray-500">
                    Add or update your achievements
                  </p>
                </a>

                {/* View Messages */}
                <a
                  href="/admin/messages"
                  className="block rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <FiMail size={20} />

                  <h4 className="mt-4 font-medium">
                    View Messages
                  </h4>

                  <p className="mt-1 text-sm text-gray-500">
                    Check messages from visitors
                  </p>
                </a>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;