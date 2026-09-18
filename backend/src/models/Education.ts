import mongoose, { Schema } from "mongoose";

const educationSchema = new Schema(
  {
    degree: {
      type: String,
      required: true,
      trim: true,
    },

    institution: {
      type: String,
      required: true,
      trim: true,
    },

    field: {
      type: String,
      required: true,
      trim: true,
    },

    startYear: {
      type: String,
      required: true,
      trim: true,
    },

    endYear: {
      type: String,
      required: true,
      trim: true,
    },

    status: {
      type: String,
      required: true,
      trim: true,
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

const Education = mongoose.model(
  "Education",
  educationSchema,
);

export default Education;