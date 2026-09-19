import express from "express";

import {
  loginAdmin,
  logoutAdmin,
  getCurrentAdmin,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import { adminLoginLimiter } from "../middleware/rateLimiters.js";

const router = express.Router();

router.post(
  "/login",
  adminLoginLimiter,
  loginAdmin,
);

router.post(
  "/logout",
  logoutAdmin,
);

router.get(
  "/me",
  authMiddleware,
  getCurrentAdmin,
);

export default router;