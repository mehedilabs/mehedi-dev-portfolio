import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";
import {
  FiArrowUp,
  FiArrowUpRight,
  FiMail,
} from "react-icons/fi";

const Footer = () => {
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

  return (
    <footer className="relative border-t border-white/10">
      <div className="section-container py-14">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr]">
          {/* Left Side */}
          <div>
            <a
              href="#home"
              className="text-2xl font-extrabold tracking-tight"
            >
              Mehedi<span className="gradient-text">.</span>
            </a>

            <p className="mt-4 max-w-md text-sm leading-7 text-gray-500">
              Full-Stack Web Developer focused on building modern,
              responsive and user-friendly web applications.
            </p>

            <a
              href="mailto:mehedi.hasan.bd.dev@gmail.com"
              className="mt-5 inline-flex items-center gap-2 text-sm text-gray-400 transition duration-300 hover:text-white"
            >
              <FiMail />
              mehedi.hasan.bd.dev@gmail.com
              <FiArrowUpRight className="text-xs" />
            </a>
          </div>

          {/* Right Side - Quick Links */}
          <div>
          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-gray-500">
           Quick Links
         </p>

         <div className="mt-5 grid grid-cols-3 gap-x-6 gap-y-3">
         {links.map((link) => (
         <a
        key={link.id}
        href={`#${link.id}`}
        className="text-sm text-gray-500 transition duration-300 hover:text-white"
        >
       {link.label}
       </a>
       ))}
      </div>
      </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 flex flex-col gap-5 border-t border-white/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-gray-600">
            © {new Date().getFullYear()} Mehedi Hasan. All rights
            reserved.
          </p>

          <div className="flex items-center gap-3">
            {/* GitHub */}
            <a
              href="https://github.com/mehedilabs"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub"
              className="rounded-full border border-white/10 bg-white/5 p-2.5 text-gray-500 transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-black"
            >
              <FaGithub />
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/mehedilabs/"
              target="_blank"
              rel="noreferrer"
              aria-label="LinkedIn"
              className="rounded-full border border-white/10 bg-white/5 p-2.5 text-gray-500 transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-black"
            >
              <FaLinkedin />
            </a>

            {/* WhatsApp */}
            <a
              href="https://wa.me/8801877168787"
              target="_blank"
              rel="noreferrer"
              aria-label="WhatsApp"
              className="rounded-full border border-white/10 bg-white/5 p-2.5 text-gray-500 transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-black"
            >
              <FaWhatsapp />
            </a>

            {/* Back To Top */}
            <a
              href="#home"
              aria-label="Back to top"
              className="ml-2 rounded-full border border-white/10 bg-white px-3 py-2.5 text-black transition duration-300 hover:-translate-y-1"
            >
              <FiArrowUp />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;