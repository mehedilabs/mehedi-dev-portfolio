import { Router } from "express";

import {
  getExperiences,
  getExperienceById,
  createExperience,
  updateExperience,
  deleteExperience,
} from "../controllers/experienceController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

// Public
router.get("/", getExperiences);
router.get("/:id", getExperienceById);

// Admin
router.post("/", authMiddleware, createExperience);
router.put("/:id", authMiddleware, updateExperience);
router.delete("/:id", authMiddleware, deleteExperience);

export default router;