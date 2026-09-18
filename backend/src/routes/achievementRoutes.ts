import { Router } from "express";

import {
  getAchievements,
  getAchievementById,
  createAchievement,
  updateAchievement,
  deleteAchievement,
} from "../controllers/achievementController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

// Public
router.get("/", getAchievements);
router.get("/:id", getAchievementById);

// Admin
router.post("/", authMiddleware, createAchievement);
router.put("/:id", authMiddleware, updateAchievement);
router.delete("/:id", authMiddleware, deleteAchievement);

export default router;