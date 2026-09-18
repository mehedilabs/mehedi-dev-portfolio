import { Router } from "express";

import {
  getStats,
  updateStats,
} from "../controllers/statsController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = Router();

// Public route
router.get("/", getStats);

// Admin route
router.put("/", authMiddleware, updateStats);

export default router;