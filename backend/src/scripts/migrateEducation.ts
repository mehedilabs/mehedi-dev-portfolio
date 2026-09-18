import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "../config/db.js";
import Education from "../models/Education.js";

dotenv.config();

const migrateEducation = async () => {
  try {
    await connectDB();

    const educationData = {
      degree: "B.A.",
      institution: "Chandpur Govt. College",
      field: "Philosophy",
      startYear: "2022",
      endYear: "Present",
      status: "4th Year",
    };

    const existingEducation = await Education.findOne();

    if (existingEducation) {
      await Education.findByIdAndUpdate(
        existingEducation._id,
        educationData,
        {
          new: true,
          runValidators: true,
        },
      );

      console.log("Education content updated successfully.");
    } else {
      await Education.create(educationData);

      console.log("Education content created successfully.");
    }
  } catch (error) {
    console.error("Education migration failed:", error);
  } finally {
    await mongoose.connection.close();
    process.exit(0);
  }
};

migrateEducation();