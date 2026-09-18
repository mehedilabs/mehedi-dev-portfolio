import { Request, Response } from "express";
import About from "../models/About.js";

export const getAbout = async (_req: Request, res: Response) => {
  try {
    const about = await About.findOne();

    if (!about) {
      return res.status(404).json({
        message: "About content not found",
      });
    }

    res.status(200).json(about);
  } catch (error) {
    console.error("Get about error:", error);

    res.status(500).json({
      message: "Failed to get about content",
    });
  }
};

export const createAbout = async (req: Request, res: Response) => {
  try {
    const existingAbout = await About.findOne();

    if (existingAbout) {
      return res.status(400).json({
        message: "About content already exists",
      });
    }

    const about = await About.create(req.body);

    res.status(201).json({
      message: "About content created successfully",
      about,
    });
  } catch (error) {
    console.error("Create about error:", error);

    res.status(500).json({
      message: "Failed to create about content",
    });
  }
};

export const updateAbout = async (req: Request, res: Response) => {
  try {
    const about = await About.findOne();

    if (!about) {
      return res.status(404).json({
        message: "About content not found",
      });
    }

    const updatedAbout = await About.findByIdAndUpdate(
      about._id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    res.status(200).json({
      message: "About content updated successfully",
      about: updatedAbout,
    });
  } catch (error) {
    console.error("Update about error:", error);

    res.status(500).json({
      message: "Failed to update about content",
    });
  }
};