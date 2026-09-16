import { Request, Response } from "express";
import Profile from "../models/Profile.js";

export const getProfile = async (
  _req: Request,
  res: Response,
) => {
  try {
    const profile = await Profile.findOne();

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.status(200).json(profile);
  } catch (error) {
    console.error("Profile fetch failed:", error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const createProfile = async (
  req: Request,
  res: Response,
) => {
  try {
    const existingProfile = await Profile.findOne();

    if (existingProfile) {
      return res.status(400).json({
        message: "Profile already exists",
      });
    }

    const profile = await Profile.create(req.body);

    res.status(201).json({
      message: "Profile created successfully",
      profile,
    });
  } catch (error) {
    console.error("Profile creation failed:", error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const updateProfile = async (
  req: Request,
  res: Response,
) => {
  try {
    const profile = await Profile.findOneAndUpdate(
      {},
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!profile) {
      return res.status(404).json({
        message: "Profile not found",
      });
    }

    res.status(200).json({
      message: "Profile updated successfully",
      profile,
    });
  } catch (error) {
    console.error("Profile update failed:", error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};