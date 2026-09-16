import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const authMiddleware = (
  req: Request,
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

    const token = authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        message: "Access denied. Invalid token.",
      });
    }

    jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    );

    next();
  } catch (error) {
    return res.status(401).json({
      message: "Access denied. Invalid or expired token.",
    });
  }
};

export default authMiddleware;