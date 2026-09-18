import mongoose, { Schema } from "mongoose";

const aboutSchema = new Schema(
  {
    sectionLabel: {
      type: String,
      required: true,
      trim: true,
    },

    title: {
      type: String,
      required: true,
      trim: true,
    },

    mainHeading: {
      type: String,
      required: true,
      trim: true,
    },

    paragraphs: {
      type: [String],
      default: [],
    },

    techStackLabel: {
      type: String,
      required: true,
      trim: true,
    },

    techStack: {
      type: [String],
      default: [],
    },

    ctaText: {
      type: String,
      required: true,
      trim: true,
    },

    ctaLink: {
      type: String,
      required: true,
      trim: true,
    },

    whatIBringTitle: {
      type: String,
      required: true,
      trim: true,
    },

    whatIBringSubtitle: {
      type: String,
      required: true,
      trim: true,
    },

    whatIBring: [
      {
        title: {
          type: String,
          required: true,
          trim: true,
        },

        description: {
          type: String,
          required: true,
          trim: true,
        },

        icon: {
          type: String,
          default: "FiCode",
        },
      },
    ],
  },
  { timestamps: true },
);

const About = mongoose.model("About", aboutSchema);

export default About;