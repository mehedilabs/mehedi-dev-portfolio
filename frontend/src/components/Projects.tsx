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

    void fetchProjects();
  }, []);

  const featuredProjects = projects
    .filter((project) => project.featured)
    .slice(0, 5);

  return (
    <section
      id="projects"
      className="relative overflow-hidden py-16 sm:py-20"
    >
      {/* Background Glow */}
      <div className="pointer-events-none absolute -right-40 top-1/3 h-80 w-80 rounded-full bg-blue-500/[0.035] blur-[120px]" />

      <div className="pointer-events-none absolute -left-40 bottom-0 h-72 w-72 rounded-full bg-cyan-500/[0.025] blur-[110px]" />

      {/* Background Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      <div className="section-container relative">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-400/80">
            Selected Work
          </p>

          <div className="mt-3 flex items-center gap-3">
            <span className="font-mono text-2xl text-cyan-400/70">
              {"{ }"}
            </span>

            <h2 className="gradient-text text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Projects
            </h2>
          </div>

          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-500 sm:text-base">
            A collection of things I have built, explored, and learned from.
          </p>
        </motion.div>

        {/* Loading */}
        {loading ? (
          <div className="mt-8 text-sm text-gray-600">
            Loading projects...
          </div>
        ) : featuredProjects.length === 0 ? (
          <div className="mt-8 rounded-2xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center">
            <FiLayers
              size={24}
              className="mx-auto mb-3 text-gray-600"
            />

            <p className="text-sm text-gray-500">
              Projects will be added soon.
            </p>
          </div>
        ) : (
          <div className="mt-8 space-y-5">
            {featuredProjects.map((project, index) => (
              <motion.article
                key={project._id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.05,
                }}
                className="group relative overflow-hidden rounded-2xl border border-white/[0.08] bg-[#08111d]/80 backdrop-blur-md transition duration-300 hover:border-cyan-400/25 hover:bg-[#0a1421]/90"
              >
                {/* Left Cyan Accent */}
                <div className="absolute inset-y-0 left-0 w-[2px] bg-cyan-400/60 transition duration-300 group-hover:bg-cyan-400" />

                <div className="flex min-h-[205px] flex-col md:min-h-[215px] md:flex-row">
                  {/* Project Image */}
                  <div className="relative shrink-0 p-3 md:w-[31%] md:p-4">
                    <div className="relative h-44 overflow-hidden rounded-xl border border-white/[0.07] bg-[#0b1725] md:h-full">
                      {project.image ? (
                        <img
                          src={project.image}
                          alt={project.title}
                          className="h-full w-full object-cover opacity-80 transition duration-500 group-hover:scale-[1.025] group-hover:opacity-95"
                        />
                      ) : (
                        <div className="flex h-full items-center justify-center">
                          <div className="flex h-14 w-14 items-center justify-center rounded-xl border border-white/10 bg-white/[0.025] text-gray-600">
                            <FiCode size={22} />
                          </div>
                        </div>
                      )}

                      <div className="absolute inset-0 bg-gradient-to-r from-black/10 via-transparent to-[#08111d]/20" />

                      <div className="absolute left-3 top-3 flex h-7 w-7 items-center justify-center rounded-md border border-white/10 bg-black/30 font-mono text-[9px] text-gray-300 backdrop-blur-md">
                        {String(index + 1).padStart(2, "0")}
                      </div>
                    </div>
                  </div>

                  {/* Project Information */}
                  <div className="flex min-w-0 flex-1 flex-col justify-center px-4 pb-5 md:px-5 md:py-5">
                    <div className="flex flex-wrap items-center gap-2">
                      <div className="flex items-center gap-1.5">
                        <FiLayers
                          size={12}
                          className="text-cyan-400/70"
                        />

                        <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-gray-500">
                          {index === 0
                            ? "Featured Project"
                            : "Selected Project"}
                        </span>
                      </div>

                      {index === 0 && (
                        <span className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.07] px-2 py-0.5 text-[8px] font-semibold uppercase tracking-[0.14em] text-cyan-300">
                          Flagship
                        </span>
                      )}
                    </div>

                    <h3 className="mt-2 text-xl font-bold tracking-tight text-white sm:text-[22px]">
                      {project.title}
                    </h3>

                    <p className="mt-2 line-clamp-3 max-w-2xl text-xs leading-5 text-gray-400 sm:text-[13px]">
                      {project.description}
                    </p>

                    {project.technologies.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {project.technologies
                          .slice(0, 6)
                          .map((technology, technologyIndex) => (
                            <span
                              key={`${technology}-${technologyIndex}`}
                              className="rounded-md border border-white/[0.08] bg-white/[0.025] px-2 py-1 text-[9px] font-medium text-gray-400 transition group-hover:border-cyan-400/10 group-hover:text-gray-300"
                            >
                              {technology}
                            </span>
                          ))}

                        {project.technologies.length > 6 && (
                          <span className="rounded-md border border-white/[0.08] bg-white/[0.025] px-2 py-1 text-[9px] text-gray-600">
                            +{project.technologies.length - 6}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Action Area */}
                  <div className="flex shrink-0 items-center justify-start gap-2 border-t border-white/[0.06] px-4 py-3 md:w-[135px] md:flex-col md:justify-center md:border-l md:border-t-0 md:px-4 md:py-5">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg bg-white px-3 py-2 text-[10px] font-semibold text-gray-900 transition hover:bg-cyan-400"
                      >
                        Live
                        <FiArrowUpRight size={12} />
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex w-full items-center justify-center gap-1.5 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-[10px] font-semibold text-gray-300 transition hover:border-cyan-400/20 hover:bg-cyan-400/[0.05] hover:text-cyan-300"
                      >
                        <FiGithub size={12} />
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