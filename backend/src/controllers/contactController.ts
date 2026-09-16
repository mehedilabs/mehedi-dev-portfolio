import { Request, Response } from "express";
import Contact from "../models/Contact.js";

export const createContact = async (
  req: Request,
  res: Response,
) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    const newContact = await Contact.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      message: "Message sent successfully",
      contact: newContact,
    });
  } catch (error) {
    console.error("Contact creation failed:", error);

    res.status(500).json({
      message: "Something went wrong",
    });
  }
};