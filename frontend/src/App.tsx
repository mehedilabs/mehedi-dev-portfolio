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
        <Contact />
      </main>
        <Footer/>
      <ToastContainer
        position="bottom-right"
        theme="dark"
      />
    </div>
  );
}

export default App;