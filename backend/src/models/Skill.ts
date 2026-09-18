import mongoose, { Schema } from "mongoose";

const skillItemSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    logoUrl: {
      type: String,
      required: true,
      trim: true,
    },
  },
  {
    _id: false,
  },
);

const skillSchema = new Schema(
  {
    category: {
      type: String,
      required: true,
      trim: true,
    },

    items: {
      type: [skillItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  },
);

const Skill = mongoose.model("Skill", skillSchema);

export default Skill;