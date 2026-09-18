import mongoose, { Schema } from "mongoose";

const experienceSchema = new Schema(
  {
    role: {
      type: String,
      required: true,
      trim: true,
    },

    company: {
      type: String,
      required: true,
      trim: true,
    },

    employmentType: {
      type: String,
      required: true,
      trim: true,
    },

    location: {
      type: String,
      default: "",
      trim: true,
    },

    workMode: {
      type: String,
      default: "",
      trim: true,
    },

    startDate: {
      type: String,
      required: true,
      trim: true,
    },

    endDate: {
      type: String,
      default: "",
      trim: true,
    },

    current: {
      type: Boolean,
      default: false,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    responsibilities: {
      type: [String],
      default: [],
    },

    achievements: {
      type: [String],
      default: [],
    },

    technologies: {
      type: [String],
      default: [],
    },

    companyWebsite: {
      type: String,
      default: "",
      trim: true,
    },

    companyLogo: {
      type: String,
      default: "",
      trim: true,
    },

    featured: {
      type: Boolean,
      default: false,
    },

    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  },
);

const Experience = mongoose.model("Experience", experienceSchema);

export default Experience;