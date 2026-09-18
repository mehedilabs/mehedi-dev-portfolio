import { Request, Response } from "express";
import mongoose from "mongoose";
import Education from "../models/Education.js";

export const getEducation = async (
  _req: Request,
  res: Response,
) => {
  try {
    const education = await Education.find().sort({
      startYear: -1,
      createdAt: -1,
    });

    res.status(200).json(education);
  } catch (error) {
    console.error("Get education error:", error);

    res.status(500).json({
      message: "Failed to get education",
    });
  }
};

export const getEducationById = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = String(req.params.id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid education ID",
      });
    }

    const education = await Education.findById(id);

    if (!education) {
      return res.status(404).json({
        message: "Education not found",
      });
    }

    res.status(200).json(education);
  } catch (error) {
    console.error("Get education by ID error:", error);

    res.status(500).json({
      message: "Failed to get education",
    });
  }
};

export const createEducation = async (
  req: Request,
  res: Response,
) => {
  try {
    const education = await Education.create(req.body);

    res.status(201).json({
      message: "Education added successfully",
      education,
    });
  } catch (error) {
    console.error("Create education error:", error);

    res.status(500).json({
      message: "Failed to add education",
    });
  }
};

export const updateEducation = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = String(req.params.id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid education ID",
      });
    }

    const education =
      await Education.findByIdAndUpdate(
        id,
        req.body,
        {
          returnDocument: "after",
          runValidators: true,
        },
      );

    if (!education) {
      return res.status(404).json({
        message: "Education not found",
      });
    }

    res.status(200).json({
      message: "Education updated successfully",
      education,
    });
  } catch (error) {
    console.error("Update education error:", error);

    res.status(500).json({
      message: "Failed to update education",
    });
  }
};

export const deleteEducation = async (
  req: Request,
  res: Response,
) => {
  try {
    const id = String(req.params.id);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        message: "Invalid education ID",
      });
    }

    const education =
      await Education.findByIdAndDelete(id);

    if (!education) {
      return res.status(404).json({
        message: "Education not found",
      });
    }

    res.status(200).json({
      message: "Education deleted successfully",
    });
  } catch (error) {
    console.error("Delete education error:", error);

    res.status(500).json({
      message: "Failed to delete education",
    });
  }
};