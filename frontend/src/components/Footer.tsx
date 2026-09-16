import { FaGithub, FaLinkedin, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="border-t border-white/10 px-4 py-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 sm:flex-row">
        <p className="text-sm text-gray-500">
          © {new Date().getFullYear()} Mehedi Hasan. All rights reserved.
        </p>

        <div className="flex gap-4">
          <a
            href="https://github.com/mehedilabs"
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 transition hover:text-white"
          >
            <FaGithub />
          </a>

          <a
            href="https://www.linkedin.com/in/mehedilabs/"
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 transition hover:text-white"
          >
            <FaLinkedin />
          </a>

          <a
            href="https://wa.me/8801877168787"
            target="_blank"
            rel="noreferrer"
            className="text-gray-500 transition hover:text-white"
          >
            <FaWhatsapp />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;