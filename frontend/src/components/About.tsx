import { motion } from "framer-motion";
import {
  FiArrowUpRight,
  FiCode,
  FiDatabase,
  FiLayers,
} from "react-icons/fi";

import { profile, techStack } from "../data/portfolioData";

const About = () => {
  return (
    <section
      id="about"
      className="relative overflow-hidden py-24"
    >
      <div className="pointer-events-none absolute right-0 top-1/4 h-80 w-80 rounded-full bg-violet-500/10 blur-[140px]" />

      <div className="section-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
            About me
          </p>

          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            More than just{" "}
            <span className="gradient-text">code.</span>
          </h2>
        </motion.div>

        {/* Main Content */}
        <div className="mt-10 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:gap-12">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="max-w-2xl text-2xl font-bold leading-tight sm:text-3xl">
              I build modern web experiences{" "}
              <span className="text-gray-500">
                designed to be useful, reliable and easy to use.
              </span>
            </h3>

            <div className="mt-5 max-w-2xl space-y-3 text-sm leading-7 text-gray-400">
              <p>
                I'm{" "}
                <span className="font-semibold text-white">
                  {profile.name}
                </span>
                , a {profile.role.toLowerCase()} focused on
                building modern and responsive web applications.
              </p>

              <p>
                I enjoy turning ideas into real products — from
                creating clean interfaces to connecting them with
                functional APIs and databases.
              </p>

              <p>
                I believe in writing clean, reusable code and
                continuously improving the product and user
                experience.
              </p>
            </div>

            {/* Tech Stack */}
            <div className="mt-6">
              <p className="mb-3 text-[10px] font-medium uppercase tracking-[0.2em] text-gray-600">
                Technologies I work with
              </p>

              <div className="flex flex-wrap gap-2">
                {techStack.map((technology) => (
                  <span
                    key={technology}
                    className="rounded-full border border-white/10 bg-white/[0.03] px-3 py-1.5 text-xs text-gray-400 transition duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
                  >
                    {technology}
                  </span>
                ))}
              </div>
            </div>

            <a
              href="#contact"
              className="group mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-black transition duration-300 hover:scale-105"
            >
              Let's work together
              <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
          </motion.div>

          {/* Right */}
          <motion.div
            initial={{ opacity: 0, x: 25 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-3"
          >
            {/* What I bring */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-gray-300">
                  <FiCode />
                </div>

                <div>
                  <p className="text-sm font-semibold text-white">
                    What I bring
                  </p>

                  <p className="text-[11px] text-gray-600">
                    From idea to working product
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex gap-3">
                  <FiLayers className="mt-1 shrink-0 text-gray-500" />

                  <div>
                    <p className="text-sm font-medium text-gray-300">
                      Modern Frontend
                    </p>

                    <p className="mt-0.5 text-xs leading-5 text-gray-600">
                      Responsive interfaces with React,
                      TypeScript and modern CSS.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <FiDatabase className="mt-1 shrink-0 text-gray-500" />

                  <div>
                    <p className="text-sm font-medium text-gray-300">
                      Backend & Database
                    </p>

                    <p className="mt-0.5 text-xs leading-5 text-gray-600">
                      APIs and database-powered applications
                      with Node.js, Express and MongoDB.
                    </p>
                  </div>
                </div>

                <div className="flex gap-3">
                  <FiCode className="mt-1 shrink-0 text-gray-500" />

                  <div>
                    <p className="text-sm font-medium text-gray-300">
                      Clean Development
                    </p>

                    <p className="mt-0.5 text-xs leading-5 text-gray-600">
                      Simple, reusable and maintainable code.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Personal Info */}
            <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-5">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-[9px] uppercase tracking-widest text-gray-600">
                    Location
                  </p>

                  <p className="mt-1 text-xs text-gray-300">
                    {profile.location}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-widest text-gray-600">
                    Education
                  </p>

                  <p className="mt-1 text-xs text-gray-300">
                    {profile.education}
                  </p>
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-widest text-gray-600">
                    Projects
                  </p>

                  <p className="mt-1 text-xs text-gray-300">
                    {profile.projects}+
                  </p>
                </div>

                <div>
                  <p className="text-[9px] uppercase tracking-widest text-gray-600">
                    Availability
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full bg-green-400" />

                    <span className="text-xs text-gray-300">
                      {profile.available
                        ? "Available"
                        : "Unavailable"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;