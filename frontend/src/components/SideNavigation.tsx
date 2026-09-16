import { useEffect, useState } from "react";

const sections = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

const SideNavigation = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 300;

      for (const section of sections) {
        const element = document.getElementById(section.id);

        if (!element) continue;

        const top = element.offsetTop;
        const height = element.offsetHeight;

        if (
          scrollPosition >= top &&
          scrollPosition < top + height
        ) {
          setActiveSection(section.id);
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
    <aside className="fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 lg:block">
      <div className="flex flex-col items-center gap-3">
        {sections.map((section) => {
          const isActive = activeSection === section.id;

          return (
            <a
              key={section.id}
              href={`#${section.id}`}
              aria-label={section.label}
              className="group relative flex items-center"
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? "h-7 w-1 bg-white"
                    : "h-2 w-1 bg-white/20 group-hover:h-5 group-hover:bg-white/60"
                }`}
              />
            </a>
          );
        })}
      </div>
    </aside>
  );
};

export default SideNavigation;