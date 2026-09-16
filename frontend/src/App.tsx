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

function App() {
  return (
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
       

        <section
          id="contact"
          className="flex min-h-screen items-center justify-center"
        >
          <h2 className="text-4xl font-bold">
            Contact
          </h2>
        </section>
      </main>

      <ToastContainer
        position="bottom-right"
        theme="dark"
      />
    </div>
  );
}

export default App;