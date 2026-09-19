import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import Admin from "../models/Admin.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite:
    process.env.NODE_ENV === "production"
      ? ("none" as const)
      : ("lax" as const),
};

export const loginAdmin = async (
  req: Request,
  res: Response,
) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const admin = await Admin.findOne({
      email: email.trim().toLowerCase(),
    });

    if (!admin) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isPasswordCorrect = await bcrypt.compare(
      password,
      admin.password,
    );

    if (!isPasswordCorrect) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing");

      return res.status(500).json({
        message: "Authentication service is not configured",
      });
    }

    const token = jwt.sign(
      { adminId: admin._id.toString() },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie(
      "adminToken",
      token,
      cookieOptions,
    );

    return res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.error("Admin login failed:", error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};

export const logoutAdmin = (
  _req: Request,
  res: Response,
) => {
  res.clearCookie("adminToken", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite:
      process.env.NODE_ENV === "production"
        ? ("none" as const)
        : ("lax" as const),
  });

  return res.status(200).json({
    message: "Logout successful",
  });
};

interface AuthenticatedRequest extends Request {
  adminId?: string;
}

export const getCurrentAdmin = async (
  req: AuthenticatedRequest,
  res: Response,
) => {
  try {
    if (!req.adminId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    const admin = await Admin.findById(req.adminId).select(
      "_id email",
    );

    if (!admin) {
      return res.status(401).json({
        message: "Admin account not found",
      });
    }

    return res.status(200).json({
      admin: {
        id: admin._id,
        email: admin.email,
      },
    });
  } catch (error) {
    console.error("Failed to verify admin:", error);

    return res.status(500).json({
      message: "Something went wrong",
    });
  }
};