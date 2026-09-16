import { motion } from "framer-motion";
import { FiBookOpen, FiCalendar, FiMapPin } from "react-icons/fi";

const education = [
  {
    degree: "B.A. in Philosophy",
    institution: "Chandpur Govt. College",
    period: "2022 – Present",
    location: "Bangladesh",
    description:
      "Pursuing a Bachelor's degree in Philosophy while developing practical skills in modern web development.",
  },
  {
    degree: "Higher Secondary Certificate (HSC)",
    institution: "Bhasha Sainik Ajit Guha Maha Biddalay",
    period: "2021",
    location: "Bangladesh",
    description:
      "Completed Higher Secondary education in the Arts group.",
  },
  {
    degree: "Secondary School Certificate (SSC)",
    institution: "Kachua Govt Pilot High School",
    period: "2019",
    location: "Bangladesh",
    description:
      "Completed Secondary School education in the Science group.",
  },
];

const Education = () => {
  return (
    <section
      id="education"
      className="relative overflow-hidden py-24"
    >
      <div className="pointer-events-none absolute left-0 top-1/3 h-96 w-96 rounded-full bg-blue-500/10 blur-[150px]" />

      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <p className="mb-2 text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
            Academic background
          </p>

          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            My{" "}
            <span className="gradient-text">Education</span>
          </h2>

          <p className="mt-4 max-w-2xl text-sm leading-7 text-gray-500">
            My academic journey and educational background.
          </p>
        </motion.div>

        <div className="relative mt-12">
          {/* Timeline Line */}
          <div className="absolute left-6 top-0 hidden h-full w-px bg-white/10 sm:block" />

          <div className="space-y-6">
            {education.map((item, index) => (
              <motion.article
                key={item.degree}
                initial={{ opacity: 0, x: -25 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: index * 0.1,
                }}
                className="relative sm:pl-16"
              >
                {/* Timeline Dot */}
                <div className="absolute left-[17px] top-7 hidden h-4 w-4 rounded-full border-2 border-white/40 bg-black sm:block" />

                <div className="rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition duration-500 hover:border-white/20 hover:bg-white/[0.04] sm:p-7">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
                    <div className="flex gap-4">
                      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-lg text-gray-300">
                        <FiBookOpen />
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-white sm:text-xl">
                          {item.degree}
                        </h3>

                        <p className="mt-1 text-sm font-medium text-gray-400">
                          {item.institution}
                        </p>
                      </div>
                    </div>

                    <span className="w-fit rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-gray-500">
                      {item.period}
                    </span>
                  </div>

                  <p className="mt-5 text-sm leading-7 text-gray-500">
                    {item.description}
                  </p>

                  <div className="mt-5 flex flex-wrap gap-4 text-xs text-gray-600">
                    <span className="flex items-center gap-2">
                      <FiCalendar />
                      {item.period}
                    </span>

                    <span className="flex items-center gap-2">
                      <FiMapPin />
                      {item.location}
                    </span>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;