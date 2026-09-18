import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiBriefcase,
  FiCalendar,
  FiCheckCircle,
  FiExternalLink,
  FiMapPin,
} from "react-icons/fi";

import API_URL from "../config/api";

type ExperienceItem = {
  _id: string;
  role: string;
  company: string;
  employmentType: string;
  location: string;
  workMode: string;
  startDate: string;
  endDate: string;
  current: boolean;
  description: string;
  responsibilities: string[];
  achievements: string[];
  technologies: string[];
  companyWebsite: string;
  companyLogo: string;
  featured: boolean;
  order: number;
};



const Experience = () => {
  const [experiences, setExperiences] = useState<ExperienceItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchExperiences = async () => {
      try {
        const response = await fetch(`${API_URL}/experiences`);

        if (!response.ok) {
          throw new Error("Failed to fetch experiences");
        }

        const data = await response.json();

        setExperiences(data);
      } catch (error) {
        console.error("Failed to load experiences:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchExperiences();
  }, []);

  if (loading) {
    return (
      <section
        id="experience"
        className="relative overflow-hidden bg-[#050b14] px-4 py-24 text-white sm:px-6 lg:px-8"
      >
        <div className="mx-auto max-w-6xl">
          <div className="h-40 animate-pulse rounded-2xl border border-white/5 bg-white/[0.02]" />
        </div>
      </section>
    );
  }

  return (
    <section
      id="experience"
      className="relative overflow-hidden bg-[#050b14] px-4 py-24 text-white sm:px-6 lg:px-8"
    >
      {/* Background */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-20 h-72 w-72 rounded-full bg-cyan-500/[0.025] blur-[120px]" />
        <div className="absolute bottom-10 right-1/4 h-80 w-80 rounded-full bg-blue-500/[0.025] blur-[130px]" />

        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      <div className="relative mx-auto max-w-6xl">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <div className="mb-4 flex items-center gap-3">
           

            <span className="text-xs font-medium uppercase tracking-[0.25em] text-cyan-300/80">
              Professional Journey
            </span>
            
          </div>

          <h2 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Experience
            <span className="text-cyan-400">.</span>
          </h2>

          <p className="mt-5 max-w-2xl text-sm leading-7 text-gray-400 sm:text-base">
            A timeline of my professional journey, projects, responsibilities,
            and the technologies I have worked with.
          </p>
        </motion.div>

        {/* Empty State */}
        {experiences.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-2xl border border-white/10 bg-white/[0.025] px-6 py-14 text-center"
          >
            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/[0.06]">
              <FiBriefcase className="text-2xl text-cyan-300" />
            </div>

            <h3 className="text-xl font-semibold text-white">
              Experience will be added soon
            </h3>

            <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-gray-500">
              My professional experience and project-based journey will appear
              here as they are added.
            </p>
          </motion.div>
        ) : (
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-[19px] top-2 hidden h-[calc(100%-8px)] w-px bg-gradient-to-b from-cyan-400/40 via-white/10 to-transparent md:block" />

            <div className="space-y-8">
              {experiences.map((experience, index) => (
                <motion.article
                  key={experience._id}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  className="relative md:pl-14"
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-0 top-8 hidden h-10 w-10 items-center justify-center rounded-full border border-cyan-400/20 bg-[#07111d] md:flex">
                    <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_12px_rgba(34,211,238,0.5)]" />
                  </div>

                  <div
                    className={`rounded-2xl border bg-white/[0.025] p-6 transition-all duration-300 sm:p-7 ${
                      experience.featured
                        ? "border-cyan-400/20 hover:border-cyan-400/35"
                        : "border-white/[0.08] hover:border-white/[0.15]"
                    }`}
                  >
                    {/* Top Row */}
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
                      <div className="flex gap-4">
                        {/* Company Logo */}
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/[0.04]">
                          {experience.companyLogo ? (
                            <img
                              src={experience.companyLogo}
                              alt={experience.company}
                              className="h-full w-full object-contain p-2"
                            />
                          ) : (
                            <FiBriefcase className="text-xl text-cyan-300" />
                          )}
                        </div>

                        <div>
                          <div className="flex flex-wrap items-center gap-2">
                            <h3 className="text-xl font-semibold text-white sm:text-2xl">
                              {experience.role}
                            </h3>

                            {experience.featured && (
                              <span className="rounded-full border border-cyan-400/20 bg-cyan-400/[0.06] px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider text-cyan-300">
                                Featured
                              </span>
                            )}
                          </div>

                          <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-2 text-sm">
                            {experience.companyWebsite ? (
                              <a
                                href={experience.companyWebsite}
                                target="_blank"
                                rel="noreferrer"
                                className="font-medium text-cyan-300 transition hover:text-cyan-200"
                              >
                                {experience.company}
                              </a>
                            ) : (
                              <span className="font-medium text-gray-300">
                                {experience.company}
                              </span>
                            )}

                            <span className="hidden text-gray-600 sm:inline">
                              •
                            </span>

                            <span className="text-gray-500">
                              {experience.employmentType}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Date */}
                      <div className="flex items-center gap-2 text-sm text-gray-500 lg:pt-1">
                        <FiCalendar className="text-cyan-400/70" />

                        <span>
                          {experience.startDate} —{" "}
                          {experience.current
                            ? "Present"
                            : experience.endDate || "Present"}
                        </span>
                      </div>
                    </div>

                    {/* Meta */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {experience.workMode && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 text-xs text-gray-400">
                          <FiBriefcase className="text-cyan-400/70" />
                          {experience.workMode}
                        </span>
                      )}

                      {experience.location && (
                        <span className="inline-flex items-center gap-1.5 rounded-full border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 text-xs text-gray-400">
                          <FiMapPin className="text-cyan-400/70" />
                          {experience.location}
                        </span>
                      )}
                    </div>

                    {/* Description */}
                    {experience.description && (
                      <p className="mt-6 text-sm leading-7 text-gray-400">
                        {experience.description}
                      </p>
                    )}

                    {/* Responsibilities */}
                    {experience.responsibilities.length > 0 && (
                      <div className="mt-7">
                        <h4 className="mb-3 text-sm font-semibold text-gray-200">
                          Responsibilities
                        </h4>

                        <ul className="space-y-2.5">
                          {experience.responsibilities.map(
                            (responsibility, responsibilityIndex) => (
                              <li
                                key={`${experience._id}-responsibility-${responsibilityIndex}`}
                                className="flex gap-3 text-sm leading-6 text-gray-400"
                              >
                                <FiCheckCircle className="mt-1 shrink-0 text-cyan-400/70" />

                                <span>{responsibility}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Achievements */}
                    {experience.achievements.length > 0 && (
                      <div className="mt-7">
                        <h4 className="mb-3 text-sm font-semibold text-gray-200">
                          Achievements
                        </h4>

                        <ul className="space-y-2.5">
                          {experience.achievements.map(
                            (achievement, achievementIndex) => (
                              <li
                                key={`${experience._id}-achievement-${achievementIndex}`}
                                className="flex gap-3 text-sm leading-6 text-gray-400"
                              >
                                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400/70" />

                                <span>{achievement}</span>
                              </li>
                            ),
                          )}
                        </ul>
                      </div>
                    )}

                    {/* Technologies */}
                    {experience.technologies.length > 0 && (
                      <div className="mt-7">
                        <h4 className="mb-3 text-sm font-semibold text-gray-200">
                          Technologies
                        </h4>

                        <div className="flex flex-wrap gap-2">
                          {experience.technologies.map(
                            (technology, technologyIndex) => (
                              <span
                                key={`${experience._id}-technology-${technologyIndex}`}
                                className="rounded-lg border border-white/[0.08] bg-white/[0.025] px-3 py-1.5 text-xs text-gray-400 transition hover:border-cyan-400/20 hover:text-cyan-300"
                              >
                                {technology}
                              </span>
                            ),
                          )}
                        </div>
                      </div>
                    )}

                    {/* Company Website */}
                    {experience.companyWebsite && (
                      <div className="mt-7 border-t border-white/[0.06] pt-5">
                        <a
                          href={experience.companyWebsite}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 transition hover:text-cyan-300"
                        >
                          Visit company website
                          <FiExternalLink />
                        </a>
                      </div>
                    )}
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Experience;