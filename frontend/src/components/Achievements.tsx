import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FiAward,
  FiExternalLink,
} from "react-icons/fi";

import API_URL from "../config/api";

type Achievement = {
  _id: string;
  title: string;
  organization: string;
  date: string;
  description: string;
  image: string;
  credentialUrl: string;
  featured: boolean;
  order: number;
};



const Achievements = () => {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAchievements = async () => {
      try {
        const response = await fetch(`${API_URL}/achievements`);

        if (!response.ok) {
          throw new Error("Failed to load achievements");
        }

        const data = await response.json();

        setAchievements(data);
      } catch (error) {
        console.error(
          "Load achievements error:",
          error,
        );
      } finally {
        setLoading(false);
      }
    };

    fetchAchievements();
  }, []);

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
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-cyan-400/80">
            Milestones
          </p>

          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            My{" "}
            <span className="gradient-text">
              Achievements
            </span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-500">
            Highlights from my development journey and learning
            experience.
          </p>
        </motion.div>

        {loading ? (
          <div className="mt-12 text-sm text-gray-600">
            Loading achievements...
          </div>
        ) : achievements.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-12 rounded-2xl border border-dashed border-white/10 bg-white/[0.015] p-8 text-center"
          >
            <FiAward className="mx-auto text-2xl text-gray-600" />

            <p className="mt-4 text-sm text-gray-500">
              More achievements and certifications will be added here
              over time.
            </p>
          </motion.div>
        ) : (
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {achievements.map((achievement, index) => (
              <motion.article
                key={achievement._id}
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
                  <div className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-xl border border-white/10 bg-white/5 text-xl text-gray-300 transition duration-300 group-hover:bg-white/10 group-hover:text-white">
                    {achievement.image ? (
                      <img
                        src={achievement.image}
                        alt={achievement.title}
                        className="h-full w-full object-cover"
                      />
                    ) : (
                      <FiAward />
                    )}
                  </div>

                  <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[10px] uppercase tracking-wider text-gray-500">
                    {achievement.featured
                      ? "Featured"
                      : "Achievement"}
                  </span>
                </div>

                <h3 className="mt-6 text-lg font-bold text-white">
                  {achievement.title}
                </h3>

                {achievement.organization && (
                  <p className="mt-2 text-xs font-medium text-cyan-400/70">
                    {achievement.organization}
                  </p>
                )}

                {achievement.date && (
                  <p className="mt-2 text-xs text-gray-600">
                    {achievement.date}
                  </p>
                )}

                {achievement.description && (
                  <p className="mt-3 text-sm leading-7 text-gray-500">
                    {achievement.description}
                  </p>
                )}

                <div className="mt-6 flex flex-wrap items-center gap-3">
                  {achievement.credentialUrl && (
                    <a
                      href={achievement.credentialUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-xs font-medium text-gray-400 transition hover:border-cyan-400/20 hover:text-cyan-400"
                    >
                      <FiExternalLink size={13} />
                      View Credential
                    </a>
                  )}

                  <div className="flex items-center gap-2 text-xs text-gray-600">
                    <FiAward />
                    <span>Development Journey</span>
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

export default Achievements;