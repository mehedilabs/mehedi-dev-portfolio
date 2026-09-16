import { motion } from "framer-motion";
import { FiAward } from "react-icons/fi";

const Achievements = () => {
  return (
    <section
      id="achievements"
      className="bg-white/[0.02] px-4 py-24"
    >
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 text-center">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-gray-500">
            Achievements
          </p>

          <h2 className="text-4xl font-bold sm:text-5xl">
            Certificates &{" "}
            <span className="gradient-text">Achievements</span>
          </h2>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="rounded-2xl border border-dashed border-white/15 bg-black p-10 text-center"
        >
          <FiAward className="mx-auto text-4xl text-gray-500" />

          <h3 className="mt-5 text-xl font-semibold">
            Coming soon
          </h3>

          <p className="mx-auto mt-3 max-w-xl leading-7 text-gray-500">
            Certificates, achievements and other milestones can be
            added here later.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default Achievements;