import { useEffect, useState } from "react";
import {
  FiAward,
  FiBookOpen,
  FiBriefcase,
  FiCode,
  FiFolder,
  FiHome,
  FiLogOut,
  FiMail,
  FiSettings,
  FiUser,
} from "react-icons/fi";

const AdminDashboard = () => {
  const [checkingAuth, setCheckingAuth] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      const token = localStorage.getItem("adminToken");

      if (!token) {
        window.location.href = "/admin";
        return;
      }

      try {
        const response = await fetch(
          "http://localhost:5000/api/admin/dashboard",
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          localStorage.removeItem("adminToken");
          window.location.href = "/admin";
          return;
        }

        setCheckingAuth(false);
      } catch (error) {
        console.error("Authentication check failed:", error);

        localStorage.removeItem("adminToken");
        window.location.href = "/admin";
      }
    };

    checkAuthentication();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin";
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
      value: "0",
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
      value: "0",
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

              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
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
                <button
                  type="button"
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <FiFolder size={20} />

                  <h4 className="mt-4 font-medium">
                    Add Project
                  </h4>

                  <p className="mt-1 text-sm text-gray-500">
                    Add a new portfolio project
                  </p>
                </button>

                {/* Manage Skills */}
                <button
                  type="button"
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <FiCode size={20} />

                  <h4 className="mt-4 font-medium">
                    Manage Skills
                  </h4>

                  <p className="mt-1 text-sm text-gray-500">
                    Add or update your skills
                  </p>
                </button>

                {/* View Messages */}
                <button
                  type="button"
                  className="rounded-xl border border-white/10 bg-white/[0.03] p-5 text-left transition hover:border-white/20 hover:bg-white/[0.05]"
                >
                  <FiMail size={20} />

                  <h4 className="mt-4 font-medium">
                    View Messages
                  </h4>

                  <p className="mt-1 text-sm text-gray-500">
                    Check messages from visitors
                  </p>
                </button>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;