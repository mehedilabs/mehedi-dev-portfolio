import express from "express";

import {
  createContact,
  getContacts,
  getContactById,
  markContactAsRead,
  deleteContact,
  replyToContact,
} from "../controllers/contactController.js";

import authMiddleware from "../middleware/authMiddleware.js";

import { contactLimiter } from "../middleware/rateLimiters.js";

const router = express.Router();

// Public
router.post("/", contactLimiter, createContact);

// Admin only
router.get("/", authMiddleware, getContacts);
router.get("/:id", authMiddleware, getContactById);
router.patch("/:id/read", authMiddleware, markContactAsRead);
router.delete("/:id", authMiddleware, deleteContact);
router.post("/:id/reply", authMiddleware, replyToContact);

export default router;