import { motion } from "framer-motion";
import { FiBookOpen } from "react-icons/fi";
import { education } from "../data/portfolioData";

const Education = () => {
  return (
    <section id="education" className="px-4 py-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12">
          <p className="mb-3 text-sm uppercase tracking-[0.3em] text-gray-500">
            Education
          </p>

          <h2 className="text-4xl font-bold sm:text-5xl">
            Academic{" "}
            <span className="gradient-text">Background</span>
          </h2>
        </div>

        <div className="space-y-5">
          {education.map((item, index) => (
            <motion.div
              key={item.institution}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex gap-5 rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-white/20"
            >
              <div className="hidden rounded-xl border border-white/10 bg-black p-4 sm:block">
                <FiBookOpen className="text-xl" />
              </div>

              <div className="flex-1">
                <div className="flex flex-col justify-between gap-2 sm:flex-row">
                  <h3 className="text-xl font-semibold">
                    {item.institution}
                  </h3>

                  <span className="text-sm text-gray-500">
                    {item.period}
                  </span>
                </div>

                <p className="mt-2 text-gray-300">
                  {item.degree}
                </p>

                <p className="mt-1 text-sm text-gray-500">
                  {item.subject}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;