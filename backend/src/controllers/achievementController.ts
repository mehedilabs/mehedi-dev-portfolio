import { Request, Response } from "express";
import Achievement from "../models/Achievement.js";

export const getAchievements = async (
  _req: Request,
  res: Response,
) => {
  try {
    const achievements = await Achievement.find().sort({
      order: 1,
      date: -1,
    });

    res.json(achievements);
  } catch (error) {
    console.error("Get achievements error:", error);

    res.status(500).json({
      message: "Failed to get achievements",
    });
  }
};

export const getAchievementById = async (
  req: Request,
  res: Response,
) => {
  try {
    const achievement = await Achievement.findById(
      req.params.id,
    );

    if (!achievement) {
      return res.status(404).json({
        message: "Achievement not found",
      });
    }

    res.json(achievement);
  } catch (error) {
    console.error("Get achievement error:", error);

    res.status(500).json({
      message: "Failed to get achievement",
    });
  }
};

export const createAchievement = async (
  req: Request,
  res: Response,
) => {
  try {
    const achievement = await Achievement.create(req.body);

    res.status(201).json(achievement);
  } catch (error) {
    console.error("Create achievement error:", error);

    res.status(500).json({
      message: "Failed to create achievement",
    });
  }
};

export const updateAchievement = async (
  req: Request,
  res: Response,
) => {
  try {
    const achievement =
      await Achievement.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
          runValidators: true,
        },
      );

    if (!achievement) {
      return res.status(404).json({
        message: "Achievement not found",
      });
    }

    res.json(achievement);
  } catch (error) {
    console.error("Update achievement error:", error);

    res.status(500).json({
      message: "Failed to update achievement",
    });
  }
};

export const deleteAchievement = async (
  req: Request,
  res: Response,
) => {
  try {
    const achievement =
      await Achievement.findByIdAndDelete(
        req.params.id,
      );

    if (!achievement) {
      return res.status(404).json({
        message: "Achievement not found",
      });
    }

    res.json({
      message: "Achievement deleted successfully",
    });
  } catch (error) {
    console.error("Delete achievement error:", error);

    res.status(500).json({
      message: "Failed to delete achievement",
    });
  }
};