import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";
import {
  FiArrowDown,
  FiArrowUpRight,
  FiMapPin,
} from "react-icons/fi";

import {
  greetings,
  profile as defaultProfile,
  stats,
} from "../data/portfolioData";

import API_URL from "../config/api";
import defaultProfileImage from "../assets/profile.png";

type ProfileData = typeof defaultProfile;

const Hero = () => {
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [experience, setExperience] = useState("00");
  const [clients, setClients] = useState("00");

  const [profile, setProfile] =
    useState<ProfileData>(defaultProfile);

  useEffect(() => {
    const interval = setInterval(() => {
      setGreetingIndex((current) => {
        return (current + 1) % greetings.length;
      });
    }, 2200);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await fetch(`${API_URL}/profile`);

        if (!response.ok) {
          return;
        }

        const data = await response.json();

        const profileData = data.profile ?? data;

        setProfile((currentProfile) => ({
          ...currentProfile,
          ...profileData,
        }));
      } catch (error) {
        console.error("Profile fetch error:", error);
      }
    };

    fetchProfile();
  }, []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [projectResponse, statsResponse] =
          await Promise.all([
            fetch(`${API_URL}/projects/count`),
            fetch(`${API_URL}/stats`),
          ]);

        if (projectResponse.ok) {
          const projectData = await projectResponse.json();

          setProjectCount(projectData.count);
        }

        if (statsResponse.ok) {
          const statsData = await statsResponse.json();

          setExperience(statsData.experience);
          setClients(statsData.clients);
        }
      } catch (error) {
        console.error("Portfolio stats error:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-screen items-center overflow-hidden pt-24"
    >
      {/* Background glow */}
      <div className="pointer-events-none absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-violet-500/10 blur-[140px]" />

      <div className="section-container relative z-10">
        <div className="grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Availability */}
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm text-gray-300 backdrop-blur-xl">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-400" />
              </span>

              Available for opportunities
            </div>

            {/* Greeting */}
            <motion.p
              key={greetingIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-4 text-lg font-medium text-gray-400"
            >
              {greetings[greetingIndex]}
            </motion.p>

            {/* Name */}
            <h1 className="max-w-4xl text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
              <span className="block">I'm</span>

              <span className="block gradient-text">
                {profile.name}
              </span>
            </h1>

            {/* Role */}
            <h2 className="mt-5 text-2xl font-bold text-white sm:text-3xl">
              {profile.role}
            </h2>

            {/* Description */}
            <p className="mt-6 max-w-2xl text-base leading-8 text-gray-400 sm:text-lg">
              I build modern, responsive and user-friendly web
              applications with clean code and thoughtful
              experiences.
            </p>

            {/* Location */}
            <div className="mt-5 flex items-center gap-2 text-sm text-gray-500">
              <FiMapPin />
              <span>{profile.location}</span>
            </div>

            {/* Buttons */}
            <div className="mt-9 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="group inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 text-sm font-semibold text-black transition duration-300 hover:scale-105 hover:bg-[#b2effa]"
              >
                View My Work

                <FiArrowUpRight className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1" />
              </a>

              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold text-white backdrop-blur-xl transition duration-300 hover:border-white/30 hover:bg-white/10"
              >
                Let's Talk
              </a>
            </div>

            {/* Social Links */}
            <div className="mt-9 flex items-center gap-3">
              <a
                href={profile.github}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 bg-white/5 p-3 text-gray-400 transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-black"
                aria-label="GitHub"
              >
                <FaGithub />
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 bg-white/5 p-3 text-gray-400 transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-black"
                aria-label="LinkedIn"
              >
                <FaLinkedin />
              </a>

              <a
                href={profile.whatsapp}
                target="_blank"
                rel="noreferrer"
                className="rounded-full border border-white/10 bg-white/5 p-3 text-gray-400 transition duration-300 hover:-translate-y-1 hover:bg-white hover:text-black"
                aria-label="WhatsApp"
              >
                <FaWhatsapp />
              </a>
            </div>
          </motion.div>

          {/* Right Profile Composition */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="relative mx-auto w-full max-w-md"
          >
            {/* Main profile card */}
            <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-white/10 via-white/[0.03] to-violet-500/10 p-3 shadow-2xl shadow-violet-500/10">
              <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-[1.5rem] border border-white/10 bg-[#0b0b0d]">
                <img
                  src={
                    profile.profileImage?.trim()
                      ? profile.profileImage
                      : defaultProfileImage
                  }
                  alt={profile.name}
                  className="h-full w-full object-cover"
                />

                {/* Image overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
              </div>
            </div>

            {/* Stats card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.8 }}
              className="absolute -bottom-7 -left-6 rounded-2xl border border-white/10 bg-black/80 p-4 shadow-xl backdrop-blur-xl sm:-left-10"
            >
              <div className="grid grid-cols-3 gap-5">
                {stats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <p className="text-xl font-bold text-white">
                      {stat.label === "Projects"
                        ? `${projectCount}+`
                        : stat.label === "Experience"
                          ? experience
                          : stat.label === "Clients"
                            ? clients
                            : stat.value}
                    </p>

                    <p className="mt-1 text-[10px] uppercase tracking-wider text-gray-500">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Availability floating card */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.65 }}
              className="absolute -right-3 top-8 rounded-2xl border border-white/10 bg-black/80 px-4 py-3 shadow-xl backdrop-blur-xl sm:-right-8"
            >
              <div className="flex items-center gap-3">
                <div className="rounded-xl bg-green-400/10 p-2 text-green-400">
                  <span className="block h-2 w-2 rounded-full bg-green-400" />
                </div>

                <div>
                  <p className="text-xs font-semibold text-white">
                    {profile.available
                      ? "Available"
                      : "Currently busy"}
                  </p>

                  <p className="mt-0.5 text-[10px] text-gray-500">
                    For new projects
                  </p>
                </div>
              </div>
            </motion.div>

            {/* Resume card */}
            <a
              href={profile.resume}
              className="absolute -bottom-5 -right-3 hidden rounded-full border border-white/10 bg-white px-5 py-3 text-xs font-bold text-black shadow-xl transition duration-300 hover:scale-105 hover:bg-[#b2effa] sm:block"
            >
              Resume <FiArrowUpRight className="ml-1 inline" />
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.a
          href="#about"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mx-auto mt-20 flex w-fit flex-col items-center gap-2 text-gray-500 transition hover:text-white"
        >
          <span className="text-[10px] uppercase tracking-[0.3em]">
            Scroll
          </span>

          <FiArrowDown className="animate-bounce" />
        </motion.a>
      </div>
    </section>
  );
};

export default Hero;