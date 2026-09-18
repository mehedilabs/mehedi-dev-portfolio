import { Request, Response } from "express";
import Stats from "../models/Stats.js";

export const getStats = async (_req: Request, res: Response) => {
  try {
    let stats = await Stats.findOne();

    if (!stats) {
      stats = await Stats.create({
        experience: "00",
        clients: "00",
      });
    }

    res.status(200).json(stats);
  } catch (error) {
    console.error("Get stats error:", error);

    res.status(500).json({
      message: "Failed to get stats",
    });
  }
};

export const updateStats = async (
  req: Request,
  res: Response,
) => {
  try {
    let stats = await Stats.findOne();

    if (!stats) {
      stats = await Stats.create(req.body);
    } else {
      stats = await Stats.findByIdAndUpdate(
        stats._id,
        req.body,
        {
          new: true,
          runValidators: true,
        },
      );
    }

    res.status(200).json({
      message: "Stats updated successfully",
      stats,
    });
  } catch (error) {
    console.error("Update stats error:", error);

    res.status(500).json({
      message: "Failed to update stats",
    });
  }
};