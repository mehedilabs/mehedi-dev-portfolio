import mongoose, { Schema } from "mongoose";

const statsSchema = new Schema(
  {
    experience: {
      type: String,
      default: "00",
      trim: true,
    },

    clients: {
      type: String,
      default: "00",
      trim: true,
    },
  },
  {
    timestamps: true,
  },
);

const Stats = mongoose.model("Stats", statsSchema);

export default Stats;