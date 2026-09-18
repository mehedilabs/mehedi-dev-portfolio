import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { FiCode, FiLayers } from "react-icons/fi";

import API_URL from "../config/api";

type SkillItem = {
  name: string;
  logoUrl: string;
};

type SkillGroup = {
  _id: string;
  category: string;
  items: SkillItem[];
};


const SkillLogo = ({ name, logoUrl }: SkillItem) => {
  const [imageError, setImageError] = useState(false);

  if (!logoUrl || imageError) {
    return (
      <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03] text-gray-500">
        <FiCode size={17} />
      </div>
    );
  }

  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.03]">
      <img
        src={logoUrl}
        alt={`${name} logo`}
        className="h-7 w-7 object-contain"
        onError={() => setImageError(true)}
      />
    </div>
  );
};

const Skills = () => {
  const [skillGroups, setSkillGroups] = useState<SkillGroup[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSkills = async () => {
      try {
        const response = await fetch(`${API_URL}/skills`);

        if (!response.ok) {
          throw new Error("Failed to load skills");
        }

        const data = await response.json();

        setSkillGroups(data);
      } catch (error) {
        console.error("Load public skills error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSkills();
  }, []);

  return (
    <section
      id="skills"
      className="relative overflow-hidden py-24 sm:py-28"
    >
      {/* Background */}
      <div className="pointer-events-none absolute left-1/4 top-1/3 h-72 w-72 rounded-full bg-cyan-500/[0.035] blur-[120px]" />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
          backgroundSize: "50px 50px",
        }}
      />

      {/* Left Indicator */}
      <div className="pointer-events-none absolute left-6 top-1/2 hidden -translate-y-1/2 flex-col items-center gap-3 lg:flex">
        <span className="h-1.5 w-1.5 rounded-full bg-gray-700" />

        <span className="h-12 w-px bg-cyan-400/60" />

        <span className="h-1.5 w-1.5 rounded-full bg-gray-700" />
      </div>

      <div className="section-container relative">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55 }}
        >
          <div className="flex items-center gap-4">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-cyan-400/80">
              Technical Skills
            </p>

          
          </div>

          <div className="mt-4 flex items-center gap-3">
            <span className="font-mono text-2xl text-cyan-400/70 sm:text-3xl">
              {"</>"}
            </span>

            <h2 className="gradient-text text-4xl font-bold tracking-tight text-white sm:text-5xl">
              Skills
            </h2>
          </div>

          <p className="mt-4 max-w-xl text-sm leading-7 text-gray-500 sm:text-base">
            Striving to never stop learning and improving.
          </p>
        </motion.div>

        {/* Skills */}
        {loading ? (
          <div className="mt-12 text-sm text-gray-600">
            Loading skills...
          </div>
        ) : skillGroups.length === 0 ? (
          <div className="mt-12 rounded-xl border border-dashed border-white/10 bg-white/[0.02] p-8 text-center">
            <p className="text-sm text-gray-500">
              Skills will be added soon.
            </p>
          </div>
        ) : (
          <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {skillGroups.map((skillGroup, index) => (
              <motion.article
                key={skillGroup._id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.45,
                  delay: index * 0.07,
                }}
                className="group relative rounded-2xl border border-white/[0.08] bg-[#08111d]/70 p-4 backdrop-blur-md transition duration-300 hover:border-cyan-400/20 hover:bg-[#0a1522]"
              >
                {/* Small top accent */}
                <div className="absolute left-0 top-5 h-5 w-px bg-cyan-400/70" />

                {/* Category Header */}
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-cyan-400 shadow-[0_0_7px_rgba(34,211,238,0.7)]" />

                      <h3 className="truncate text-[11px] font-bold uppercase tracking-[0.12em] text-gray-200">
                        {skillGroup.category}
                      </h3>
                    </div>

                  </div>

                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md border border-white/[0.07] bg-white/[0.025] text-gray-600">
                    <FiLayers size={13} />
                  </div>
                </div>

                {/* Technology Grid */}
                <div className="mt-4 grid grid-cols-4 gap-1.5">
                  {skillGroup.items.map((skill, skillIndex) => (
                    <motion.div
                      key={`${skill.name}-${skillIndex}`}
                      whileHover={{ y: -2 }}
                      className="flex h-[68px] min-w-0 flex-col items-center justify-center rounded-lg border border-white/[0.07] bg-[#0b1725] px-1 transition duration-200 hover:border-cyan-400/20 hover:bg-[#0e1c2d]"
                    >
                      <div className="scale-[0.82]">
                        <SkillLogo
                          name={skill.name}
                          logoUrl={skill.logoUrl}
                        />
                      </div>

                      <span className="mt-0.5 w-full truncate text-center text-[9px] font-medium text-gray-500">
                        {skill.name}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default Skills;