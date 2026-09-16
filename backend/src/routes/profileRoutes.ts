import express from "express";
import {
  createProfile,
  getProfile,
  updateProfile,
} from "../controllers/profileController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getProfile);

router.post("/", authMiddleware, createProfile);

router.put("/", authMiddleware, updateProfile);

export default router;