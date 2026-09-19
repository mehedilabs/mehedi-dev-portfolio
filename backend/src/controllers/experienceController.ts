import { Request, Response } from "express";
import mongoose from "mongoose";

import Experience from "../models/Experience.js";

export const getExperiences = async (
  _req: Request,
  res: Response,
) => {
  try {
    const experiences = await Experience.find().sort({
      order: 1,
      startDate: -1,
    });

    res.json(experiences);
  } catch (error) {
    console.error("Get experiences error:", error);

    res.status(500).json({
      message: "Failed to get experiences",
    });
  }
};

export const getExperienceById = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid experience ID",
      });
    }

    const experience = await Experience.findById(id);

    if (!experience) {
      return res.status(404).json({
        message: "Experience not found",
      });
    }

    res.json(experience);
  } catch (error) {
    console.error("Get experience error:", error);

    res.status(500).json({
      message: "Failed to get experience",
    });
  }
};

export const createExperience = async (
  req: Request,
  res: Response,
) => {
  try {
    const experience = await Experience.create(req.body);

    res.status(201).json(experience);
  } catch (error) {
    console.error("Create experience error:", error);

    res.status(500).json({
      message: "Failed to create experience",
    });
  }
};

export const updateExperience = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid experience ID",
      });
    }

    const experience = await Experience.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!experience) {
      return res.status(404).json({
        message: "Experience not found",
      });
    }

    res.json(experience);
  } catch (error) {
    console.error("Update experience error:", error);

    res.status(500).json({
      message: "Failed to update experience",
    });
  }
};

export const deleteExperience = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid experience ID",
      });
    }

    const experience = await Experience.findByIdAndDelete(id);

    if (!experience) {
      return res.status(404).json({
        message: "Experience not found",
      });
    }

    res.json({
      message: "Experience deleted successfully",
    });
  } catch (error) {
    console.error("Delete experience error:", error);

    res.status(500).json({
      message: "Failed to delete experience",
    });
  }
};