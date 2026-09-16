import type { ReactNode } from "react";

import { motion } from "framer-motion";
import {
  FaCss3Alt,
  FaFigma,
  FaGitAlt,
  FaGithub,
  FaHtml5,
  FaJs,
  FaNodeJs,
  FaReact,
} from "react-icons/fa";
import {
  SiDaisyui,
  SiExpress,
  SiFramer,
  SiMongodb,
  SiNextdotjs,
  SiNpm,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";

import { skills } from "../data/portfolioData";

const skillIcons: Record<string, ReactNode> = {
  HTML5: <FaHtml5 />,
  CSS3: <FaCss3Alt />,
  JavaScript: <FaJs />,
  TypeScript: <SiTypescript />,
  React: <FaReact />,
  "Next.js": <SiNextdotjs />,
  "Node.js": <FaNodeJs />,
  "Express.js": <SiExpress />,
  MongoDB: <SiMongodb />,
  Mongoose: <SiMongodb />,
  "REST API": <FaNodeJs />,
  Git: <FaGitAlt />,
  GitHub: <FaGithub />,
  Netlify: <SiVercel />,
  Vercel: <SiVercel />,
  npm: <SiNpm />,
  "Tailwind CSS": <SiTailwindcss />,
  DaisyUI: <SiDaisyui />,
  "Framer Motion": <SiFramer />,
  Figma: <FaFigma />,
};

const Skills = () => {
  return (
    <section
      id="skills"
      className="relative overflow-hidden py-32"
    >
      <div className="pointer-events-none absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-blue-500/10 blur-[150px]" />

      <div className="section-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.3em] text-gray-500">
            Technical skills
          </p>

          <h2 className="text-4xl font-black tracking-tight sm:text-5xl">
            <span className="font-mono text-gray-500">
              {"</>"}
            </span>{" "}
            <span className="gradient-text">Skills</span>
          </h2>

          <p className="mt-5 max-w-2xl leading-7 text-gray-500">
            Striving to never stop learning and improving.
          </p>
        </motion.div>

        {/* Categories */}
        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {skills.map((skillGroup, index) => (
            <motion.div
              key={skillGroup.category}
              initial={{ opacity: 0, y: 25 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.6,
                delay: index * 0.1,
              }}
              className="group rounded-2xl border border-white/10 bg-white/[0.025] p-6 transition duration-500 hover:border-white/20 hover:bg-white/[0.04]"
            >
              {/* Category */}
              <div className="flex items-center justify-between border-b border-white/10 pb-5">
                <h3 className="text-lg font-bold">
                  {skillGroup.category}
                </h3>

                <span className="font-mono text-xs text-gray-600">
                  0{index + 1}
                </span>
              </div>

              {/* Skills */}
              <div className="mt-6 flex flex-wrap gap-3">
                {skillGroup.items.map((skill) => (
                  <div
                    key={skill}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/30 px-3 py-2.5 text-sm text-gray-400 transition duration-300 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
                  >
                    <span className="text-base">
                      {skillIcons[skill]}
                    </span>

                    <span>{skill}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;