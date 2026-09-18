import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/Navbar";
import SideNavigation from "./components/SideNavigation";
import Hero from "./components/Hero";
import About from "./components/About";
import Skills from "./components/Skills";
import Projects from "./components/Projects";
import Experience from "./components/Experience";
import Education from "./components/Education";
import Achievements from "./components/Achievements";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import AdminLogin from "./pages/admin/AdminLogin";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminProfile from "./pages/admin/AdminProfile";
import AdminAbout from "./pages/admin/AdminAbout";
import AdminEducation from "./pages/admin/AdminEducation";
import AdminProjects from "./pages/admin/AdminProjects";
import AdminSkills from "./pages/admin/AdminSkills";
import AdminExperience from "./pages/admin/AdminExperience";
import AdminAchievements from "./pages/admin/AdminAchievements";

function App() {
  const currentPath = window.location.pathname;

  let page;

  if (currentPath === "/admin/profile") {
    page = <AdminProfile />;
  } else if (currentPath === "/admin/about") {
    page = <AdminAbout />;
  } else if (currentPath === "/admin/education") {
    page = <AdminEducation />;
  } else if (currentPath === "/admin/projects") {
    page = <AdminProjects />;
  } else if (currentPath === "/admin/skills") {
    page = <AdminSkills />;
  } else if (currentPath === "/admin/experience") {
    page = <AdminExperience />;
  } else if (currentPath === "/admin/achievements") {
    page = <AdminAchievements />;
  } else if (currentPath === "/admin/dashboard") {
    page = <AdminDashboard />;
  } else if (currentPath === "/admin") {
    page = <AdminLogin />;
  } else {
    page = (
      <div className="min-h-screen bg-transparent text-white">
        <Navbar />
        <SideNavigation />

        <main>
          <Hero />
          <About />
          <Skills />
          <Projects />
          <Experience />
          <Education />
          <Achievements />
          <Contact />
        </main>

        <Footer />
      </div>
    );
  }

  return (
    <>
      {page}

      <ToastContainer
        position="bottom-right"
        theme="dark"
      />
    </>
  );
}

export default App;