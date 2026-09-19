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
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({
        message: "Access denied. No token provided.",
      });
    }

    const [scheme, token] = authHeader.split(" ");

    if (scheme !== "Bearer" || !token) {
      return res.status(401).json({
        message: "Access denied. Invalid token.",
      });
    }

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
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