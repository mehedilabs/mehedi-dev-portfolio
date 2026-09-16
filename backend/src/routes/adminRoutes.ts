import express from "express";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", authMiddleware, (_req, res) => {
  res.status(200).json({
    message: "Admin access granted",
  });
});

export default router;