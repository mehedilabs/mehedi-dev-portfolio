import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

interface AuthenticatedRequest extends Request {
  adminId?: string;
}

const authMiddleware = (
  req: AuthenticatedRequest,
  res: Response,
  next: NextFunction,
) => {
  try {
    const token = req.cookies?.adminToken;

    if (!token) {
      return res.status(401).json({
        message: "Access denied. Authentication required.",
      });
    }

    if (!process.env.JWT_SECRET) {
      console.error("JWT_SECRET is missing");

      return res.status(500).json({
        message: "Authentication service is not configured",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET,
    ) as { adminId?: string };

    if (!decoded.adminId) {
      return res.status(401).json({
        message: "Access denied. Invalid token.",
      });
    }

    req.adminId = decoded.adminId;

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Access denied. Invalid or expired token.",
    });
  }
};

export default authMiddleware;