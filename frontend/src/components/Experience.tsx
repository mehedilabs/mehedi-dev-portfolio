import { motion } from "framer-motion";
import { FiBriefcase, FiCode, FiArrowUpRight } from "react-icons/fi";

const Experience = () => {
  return (
    <section
      id="experience"
      className="relative overflow-hidden py-24"
    >
      <div className="pointer-events-none absolute right-0 top-1/3 h-96 w-96 rounded-full bg-violet-500/10 blur-[150px]" />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
            Work history
          </p>

          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            Professional{" "}
            <span className="gradient-text">Experience</span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-500">
            My development journey through projects, practice and
            continuous learning.
          </p>
        </motion.div>

        <div className="mt-12">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] p-6 sm:p-8"
          >
            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-violet-400 to-blue-400" />

            <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xl text-gray-300">
                <FiCode />
              </div>

              <div className="flex-1">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <h3 className="text-xl font-bold text-white">
                      Project-Based Development
                    </h3>

                    <p className="mt-1 text-sm text-gray-500">
                      Personal & Academic Projects
                    </p>
                  </div>

                  <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-gray-500">
                    Current Journey
                  </span>
                </div>

                <p className="mt-5 max-w-3xl text-sm leading-7 text-gray-500">
                  Building practical web applications to strengthen
                  frontend and backend development skills. Working with
                  modern technologies and focusing on responsive design,
                  reusable components, APIs and database integration.
                </p>

                <div className="mt-5 flex flex-wrap gap-2">
                  {[
                    "React",
                    "TypeScript",
                    "Tailwind CSS",
                    "Node.js",
                    "Express.js",
                    "MongoDB",
                  ].map((technology) => (
                    <span
                      key={technology}
                      className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-[11px] text-gray-500"
                    >
                      {technology}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="mt-5 flex items-center gap-3 rounded-2xl border border-white/10 bg-white/[0.02] p-5"
          >
            <div className="rounded-lg border border-white/10 bg-white/5 p-2.5 text-gray-500">
              <FiBriefcase />
            </div>

            <div>
              <p className="text-sm font-medium text-gray-300">
                Professional Experience
              </p>

              <p className="mt-1 text-xs text-gray-600">
                No professional employment experience added yet.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Experience;