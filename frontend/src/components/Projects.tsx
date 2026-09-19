import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiCode,
  FiGithub,
  FiLayers,
} from "react-icons/fi";

import API_URL from "../config/api";

type Project = {
  _id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  liveUrl: string;
  githubUrl: string;
  featured: boolean;
};

const Projects = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch(`${API_URL}/projects`);

        if (!response.ok) {
          throw new Error("Failed to load projects");
        }

        const data = await response.json();

        setProjects(data);
      } catch (error) {
        console.error("Load projects error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const featuredProjects = projects
    .filter((project) => project.featured);

  return (
    <section
      id="projects"
      className="relative overflow-hidden py-24 sm:py-28"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-40 top-1/3 h-96 w-96 rounded-full bg-blue-500/[0.035] blur-[130px]" />

      <div className="pointer-events-none absolute -left-40 bottom-0 h-80 w-80 rounded-full bg-cyan-500/[0.03] blur-[120px]" />

      {/* Subtle Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Left Indicator */}
      <div className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
        <span className="h-1.5 w-1.5 rounded-full bg-gray-700" />

        <span className="h-12 w-px bg-cyan-400/60" />

        <span className="h-1.5 w-1.5 rounded-full bg-gray-700" />
      </div>

      <div className="section-container relative">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="flex items-center gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-400/80">
              Selected Work
            </p>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="font-mono text-2xl text-cyan-400/70 sm:text-3xl">
              {"{ }"}
            </span>

            <h2 className="gradient-text text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Projects
            </h2>
          </div>

          <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
            A collection of things I have built, explored, and learned from.
          </p>
        </motion.div>

        {/* Projects */}
        {loading ? (
          <div className="mt-12 text-sm text-gray-600">
            Loading projects...
          </div>
        ) : featuredProjects.length === 0 ? (
          <div className="mt-12 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-10 text-center">
            <FiLayers
              size={24}
              className="mx-auto mb-3 text-gray-600"
            />

            <p className="text-sm text-gray-500">
              Projects will be added soon.
            </p>
          </div>
        ) : (
          <div className="mt-12 space-y-5">
            {featuredProjects.map((project, index) => (
              <motion.article
                key={project._id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                }}
                className="group relative min-h-[205px] overflow-hidden rounded-2xl border border-white/[0.08] bg-[#08111d]/75 backdrop-blur-md transition duration-300 hover:border-cyan-400/20 md:min-h-[215px]"
              >
                {/* Left Accent */}
                <div className="absolute inset-y-0 left-0 w-[2px] bg-cyan-400/50" />

                <div className="flex h-full flex-col md:flex-row">
                  {/* Project Preview */}
                  <div className="relative shrink-0 overflow-hidden bg-[#0b1725] md:w-[31%]">
                    <div className="h-44 md:h-full">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-[1.03] group-hover:opacity-90"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <div className="relative flex h-24 w-24 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.025] text-gray-600">
                            <FiCode size={34} />

                            <span className="absolute -right-2 -top-2 h-3 w-3 rounded-full bg-cyan-400/70 shadow-[0_0_12px_rgba(34,211,238,0.5)]" />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Preview Overlay */}
                    <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#06101c] via-transparent to-transparent" />

                    {/* Project Number */}
                    <div className="absolute left-5 top-5 flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-black/20 font-mono text-[10px] text-gray-400 backdrop-blur-sm">
                      {String(index + 1).padStart(2, "0")}
                    </div>
                  </div>

                  {/* Project Content */}
                  <div className="flex min-w-0 flex-1 flex-col justify-center p-5 sm:p-6">
                    <div className="flex items-center gap-3">
                      <h3 className="min-w-0 truncate text-xl font-bold tracking-tight text-white sm:text-2xl">
                        {project.title}
                      </h3>

                      <FiLayers
                        size={15}
                        className="shrink-0 text-gray-600"
                      />
                    </div>

                    <p className="mt-3 line-clamp-2 max-w-2xl text-sm leading-6 text-gray-500">
                      {project.description}
                    </p>

                    {/* Technologies */}
                    {project.technologies.length > 0 && (
                      <div className="mt-4 flex flex-wrap gap-2">
                        {project.technologies.map(
                          (technology, technologyIndex) => (
                            <span
                              key={`${technology}-${technologyIndex}`}
                              className="rounded-md border border-white/[0.08] bg-white/[0.025] px-2.5 py-1.5 text-[10px] font-medium text-gray-400"
                            >
                              {technology}
                            </span>
                          ),
                        )}
                      </div>
                    )}
                  </div>

                  {/* Action Area */}
                  <div className="flex shrink-0 items-center gap-3 border-t border-white/[0.07] p-4 md:w-[135px] md:flex-col md:justify-center md:border-l md:border-t-0">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg bg-white px-4 py-2.5 text-xs font-semibold text-gray-900 transition hover:bg-cyan-400"
                      >
                        Live
                        <FiArrowUpRight size={14} />
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-4 py-2.5 text-xs font-semibold text-gray-300 transition hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                      >
                        <FiGithub size={14} />
                        Code
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Projects;