import { motion } from "framer-motion";
import { FiExternalLink, FiGithub } from "react-icons/fi";

const projects = [
  {
    id: "dev-stack-builder",
    title: "Dev Stack Builder",
    description:
      "A modern web application for exploring technologies and building a personalized development stack.",
    image: "",
    technologies: [
      "React",
      "TypeScript",
      "Tailwind CSS",
      "DaisyUI",
    ],
    liveLink: "https://graceful-dango-9c33c9.netlify.app/",
    githubLink: "https://github.com/mehedilabs/B14-A5-DevStack",
  },
  {
    id: "world-cup-ticket-hub",
    title: "World Cup Ticket Hub",
    description:
      "A responsive ticket booking website designed with a clean interface and interactive user experience.",
    image: "",
    technologies: ["React", "JavaScript", "Tailwind CSS"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    id: "special-login-page",
    title: "Special Login Page",
    description:
      "A responsive login interface created to practice modern layout, form design and frontend styling.",
    image: "",
    technologies: ["HTML", "CSS", "JavaScript"],
    liveLink: "#",
    githubLink: "#",
  },
  {
    id: "coming-soon",
    title: "Coming Soon",
    description:
      "A new project will be added here as I continue building and exploring modern web development.",
    image: "",
    technologies: ["Coming Soon"],
    liveLink: "#",
    githubLink: "#",
  },
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="relative overflow-hidden py-24"
    >
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-blue-500/10 blur-[150px]" />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
            Selected work
          </p>

          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            My{" "}
            <span className="gradient-text">Projects</span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-500">
            A collection of projects I've built while learning,
            practicing and exploring modern web development.
          </p>
        </motion.div>

        <div className="mt-12 space-y-6">
          {projects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] transition duration-500 hover:border-white/20 hover:bg-white/[0.04]"
            >
              <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
                <div className="relative flex min-h-64 items-center justify-center overflow-hidden border-b border-white/10 bg-[#0b0b0d] lg:min-h-[320px] lg:border-b-0 lg:border-r">
                  {project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="text-center">
                      <p className="text-7xl font-black text-white/5">
                        0{index + 1}
                      </p>

                      <p className="mt-2 text-xs text-gray-700">
                        Project preview
                      </p>
                    </div>
                  )}

                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                </div>

                <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="mb-2 font-mono text-xs uppercase tracking-widest text-gray-600">
                        Project 0{index + 1}
                      </p>

                      <h3 className="text-2xl font-bold text-white sm:text-3xl">
                        {project.title}
                      </h3>
                    </div>

                    <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-600 sm:block">
                      {index === 0 ? "Featured" : "Project"}
                    </span>
                  </div>

                  <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-500 sm:text-base">
                    {project.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-2">
                    {project.technologies.map((technology) => (
                      <span
                        key={technology}
                        className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[11px] text-gray-400 transition duration-300 hover:border-white/20 hover:bg-white/5 hover:text-white"
                      >
                        {technology}
                      </span>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-wrap items-center gap-3">
                    <a
                      href={project.liveLink}
                      target="_blank"
                      rel="noreferrer"
                      className="group/link inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-xs font-semibold text-black transition duration-300 hover:scale-105"
                    >
                      Live Preview
                      <FiExternalLink className="transition-transform duration-300 group-hover/link:-translate-y-0.5" />
                    </a>

                    <a
                      href={project.githubLink}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-5 py-2.5 text-xs font-semibold text-gray-300 transition duration-300 hover:border-white/20 hover:bg-white/10 hover:text-white"
                    >
                      <FiGithub />
                      Code
                    </a>
                  </div>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;