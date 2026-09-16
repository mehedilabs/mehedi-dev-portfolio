import { motion } from "framer-motion";
import {
  FiAward,
  FiCode,
  FiGithub,
  FiTrendingUp,
} from "react-icons/fi";

const achievements = [
  {
    title: "Web Development Projects",
    description:
      "Built practical web projects to strengthen frontend and backend development skills.",
    icon: <FiCode />,
    status: "Project Based",
  },
  {
    title: "Git & GitHub",
    description:
      "Practicing version control and maintaining development projects with Git and GitHub.",
    icon: <FiGithub />,
    status: "Completed",
  },
  {
    title: "Continuous Learning",
    description:
      "Continuously improving development skills by building projects and exploring modern technologies.",
    icon: <FiTrendingUp />,
    status: "Ongoing",
  },
];

const Achievements = () => {
  return (
    <section
      id="achievements"
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
            Milestones
          </p>

          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            My{" "}
            <span className="gradient-text">Achievements</span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-500">
            Highlights from my development journey and learning
            experience.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {achievements.map((achievement, index) => (
            <motion.article
              key={achievement.title}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition duration-500 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.04]"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-xl text-gray-300 transition duration-300 group-hover:bg-white/10 group-hover:text-white">
                  {achievement.icon}
                </div>

                <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-wider text-gray-500">
                  {achievement.status}
                </span>
              </div>

              <h3 className="mt-6 text-lg font-bold text-white">
                {achievement.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-gray-500">
                {achievement.description}
              </p>

              <div className="mt-6 flex items-center gap-2 text-xs text-gray-600">
                <FiAward />
                <span>Development Journey</span>
              </div>
            </motion.article>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mt-6 rounded-2xl border border-dashed border-white/10 bg-white/[0.015] p-5 text-center"
        >
          <p className="text-sm text-gray-500">
            More achievements and certifications will be added here
            over time.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;