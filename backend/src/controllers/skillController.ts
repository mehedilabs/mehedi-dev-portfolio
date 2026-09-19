import { Request, Response } from "express";
import mongoose from "mongoose";

import Skill from "../models/Skill.js";

export const getSkills = async (
  _req: Request,
  res: Response,
) => {
  try {
    const skills = await Skill.find().sort({
      createdAt: 1,
    });

    res.status(200).json(skills);
  } catch (error) {
    console.error("Get skills error:", error);

    res.status(500).json({
      message: "Failed to get skills",
    });
  }
};

export const createSkill = async (
  req: Request,
  res: Response,
) => {
  try {
    const skill = await Skill.create(req.body);

    res.status(201).json({
      message: "Skill category created successfully",
      skill,
    });
  } catch (error) {
    console.error("Create skill error:", error);

    res.status(500).json({
      message: "Failed to create skill category",
    });
  }
};

export const updateSkill = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid skill category ID",
      });
    }

    const skill = await Skill.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!skill) {
      return res.status(404).json({
        message: "Skill category not found",
      });
    }

    res.status(200).json({
      message: "Skill category updated successfully",
      skill,
    });
  } catch (error) {
    console.error("Update skill error:", error);

    res.status(500).json({
      message: "Failed to update skill category",
    });
  }
};

export const deleteSkill = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({
        message: "Invalid skill category ID",
      });
    }

    const skill = await Skill.findByIdAndDelete(id);

    if (!skill) {
      return res.status(404).json({
        message: "Skill category not found",
      });
    }

    res.status(200).json({
      message: "Skill category deleted successfully",
    });
  } catch (error) {
    console.error("Delete skill error:", error);

    res.status(500).json({
      message: "Failed to delete skill category",
    });
  }
};