import { Router } from "express";

import {
  getEducation,
  getEducationById,
  createEducation,
  updateEducation,
  deleteEducation,
} from "../controllers/educationController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

// Public
router.get("/", getEducation);
router.get("/:id", getEducationById);

// Admin
router.post("/", authMiddleware, createEducation);
router.put("/:id", authMiddleware, updateEducation);
router.delete("/:id", authMiddleware, deleteEducation);

export default router;