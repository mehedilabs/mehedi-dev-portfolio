import { useEffect, useState } from "react";
import { FiMenu, FiX } from "react-icons/fi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  const links = [
    { label: "Home", id: "home" },
    { label: "About", id: "about" },
    { label: "Skills", id: "skills" },
    { label: "Projects", id: "projects" },
    { label: "Experience", id: "experience" },
    { label: "Education", id: "education" },
    { label: "Achievements", id: "achievements" },
    { label: "Contact", id: "contact" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 250;

      for (const link of links) {
        const element = document.getElementById(link.id);

        if (!element) continue;

        const top = element.offsetTop;
        const height = element.offsetHeight;

        if (
          scrollPosition >= top &&
          scrollPosition < top + height
        ) {
          setActiveSection(link.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header className="fixed left-0 top-0 z-50 w-full">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-4 py-5">
        <a
          href="#home"
          className="text-xl font-extrabold tracking-tight"
        >
          Mehedi<span className="gradient-text">.</span>
        </a>

        {/* Desktop Menu */}
        <div className="hidden items-center gap-1 rounded-full border border-white/10 bg-black/60 px-2 py-2 backdrop-blur-xl md:flex">
          {links.map((link) => {
            const isActive = activeSection === link.id;

            return (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`rounded-full px-3 py-2 text-xs transition duration-300 ${
                  isActive
                    ? "bg-white/10 gradient-text font-semibold"
                    : "text-gray-400 hover:bg-white/10 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            );
          })}
        </div>

        {/* Let's Talk */}
        <a
          href="#contact"
          className="hidden rounded-full border border-white/15 bg-white/5 px-4 py-2 text-xs font-medium transition duration-300 hover:bg-white hover:text-black md:block"
        >
          Let's Talk
        </a>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="rounded-lg border border-white/10 bg-white/5 p-2 text-xl md:hidden"
          aria-label="Toggle navigation"
        >
          {isOpen ? <FiX /> : <FiMenu />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="border-t border-white/10 bg-black/95 px-4 py-5 backdrop-blur-xl md:hidden">
          <div className="flex flex-col gap-2">
            {links.map((link) => {
              const isActive = activeSection === link.id;

              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={() => setIsOpen(false)}
                  className={`rounded-lg px-3 py-2 text-sm transition ${
                    isActive
                      ? "bg-white/10 gradient-text font-semibold"
                      : "text-gray-400 hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {link.label}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;