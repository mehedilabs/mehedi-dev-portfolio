import { Router } from "express";

import {
  getProjects,
  getProjectCount,
  createProject,
  updateProject,
  deleteProject,
} from "../controllers/projectController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

// Public routes
router.get("/", getProjects);
router.get("/count", getProjectCount);

// Admin routes
router.post("/", authMiddleware, createProject);
router.put("/:id", authMiddleware, updateProject);
router.delete("/:id", authMiddleware, deleteProject);

export default router;