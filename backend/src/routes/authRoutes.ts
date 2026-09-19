import express from "express";

import {
  loginAdmin,
  getCurrentAdmin,
} from "../controllers/authController.js";

import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", loginAdmin);

router.get(
  "/me",
  authMiddleware,
  getCurrentAdmin,
);

export default router;