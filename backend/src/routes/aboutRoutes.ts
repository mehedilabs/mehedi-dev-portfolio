import express from "express";
import {
  createAbout,
  getAbout,
  updateAbout,
} from "../controllers/aboutController.js";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAbout);

router.post("/", authMiddleware, createAbout);

router.put("/", authMiddleware, updateAbout);

export default router;