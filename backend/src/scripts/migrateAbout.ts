import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import About from "../models/About.js";

dotenv.config();

const migrateAbout = async () => {
  try {
    await connectDB();

    const about = await About.findOne();

    const aboutData = {
      sectionLabel: "About me",

      title: "More than just code.",

      mainHeading:
        "I build modern web experiences designed to be useful, reliable and easy to use.",

      paragraphs: [
        "I'm Mehedi Hasan, a full-stack developer focused on building modern and responsive web applications.",

        "I enjoy turning ideas into real products — from creating clean interfaces to connecting them with functional APIs and databases.",

        "I believe in writing clean, reusable code and continuously improving the product and user experience.",
      ],

      techStackLabel: "Technologies I work with",

      techStack: [
        "HTML",
        "CSS",
        "JavaScript",
        "TypeScript",
        "React",
        "Next.js",
        "Tailwind CSS",
        "Node.js",
        "Express.js",
        "MongoDB",
        "Mongoose",
      ],

      ctaText: "Let's work together",

      ctaLink: "#contact",

      whatIBringTitle: "What I bring",

      whatIBringSubtitle: "From idea to working product",

      whatIBring: [
        {
          title: "Modern Frontend",
          description:
            "Responsive interfaces with React, TypeScript and modern CSS.",
          icon: "FiLayers",
        },
        {
          title: "Backend & Database",
          description:
            "APIs and database-powered applications with Node.js, Express and MongoDB.",
          icon: "FiDatabase",
        },
        {
          title: "Clean Development",
          description:
            "Simple, reusable and maintainable code.",
          icon: "FiCode",
        },
      ],
    };

    if (about) {
      await About.findByIdAndUpdate(
        about._id,
        aboutData,
        {
          new: true,
          runValidators: true,
        },
      );

      console.log("About content migrated successfully.");
    } else {
      await About.create(aboutData);

      console.log("About content created successfully.");
    }
  } catch (error) {
    console.error("About migration failed:", error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

migrateAbout();