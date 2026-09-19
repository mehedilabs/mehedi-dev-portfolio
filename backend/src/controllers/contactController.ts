import { Request, Response } from "express";
import { Resend } from "resend";

import Contact from "../models/Contact.js";

const escapeHtml = (value: string) => {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
};

const isValidEmail = (email: string) => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

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

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof subject !== "string" ||
      typeof message !== "string"
    ) {
      return res.status(400).json({
        message: "Invalid input",
      });
    }

    if (!isValidEmail(email.trim())) {
      return res.status(400).json({
        message: "Please provide a valid email address",
      });
    }

    if (name.trim().length > 100) {
      return res.status(400).json({
        message: "Name is too long",
      });
    }

    if (subject.trim().length > 200) {
      return res.status(400).json({
        message: "Subject is too long",
      });
    }

    if (message.trim().length > 5000) {
      return res.status(400).json({
        message: "Message is too long",
      });
    }

    const newContact = await Contact.create({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      subject: subject.trim(),
      message: message.trim(),
      status: "unread",
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

export const getContacts = async (
  _req: Request,
  res: Response,
) => {
  try {
    const contacts = await Contact.find()
      .sort({ createdAt: -1 })
      .lean();

    res.status(200).json(contacts);
  } catch (error) {
    console.error("Failed to fetch contacts:", error);

    res.status(500).json({
      message: "Failed to fetch messages",
    });
  }
};

export const getContactById = async (
  req: Request,
  res: Response,
) => {
  try {
    const contact = await Contact.findById(req.params.id).lean();

    if (!contact) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    res.status(200).json(contact);
  } catch (error) {
    console.error("Failed to fetch contact:", error);

    res.status(500).json({
      message: "Failed to fetch message",
    });
  }
};

export const markContactAsRead = async (
  req: Request,
  res: Response,
) => {
  try {
    const contact = await Contact.findByIdAndUpdate(
      req.params.id,
      { status: "read" },
      { new: true },
    ).lean();

    if (!contact) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    res.status(200).json({
      message: "Message marked as read",
      contact,
    });
  } catch (error) {
    console.error("Failed to update message:", error);

    res.status(500).json({
      message: "Failed to update message",
    });
  }
};

export const deleteContact = async (
  req: Request,
  res: Response,
) => {
  try {
    const contact = await Contact.findByIdAndDelete(
      req.params.id,
    );

    if (!contact) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    res.status(200).json({
      message: "Message deleted successfully",
    });
  } catch (error) {
    console.error("Failed to delete message:", error);

    res.status(500).json({
      message: "Failed to delete message",
    });
  }
};

export const replyToContact = async (
  req: Request,
  res: Response,
) => {
  try {
    const { message } = req.body;

    if (!message || typeof message !== "string") {
      return res.status(400).json({
        message: "Reply message is required",
      });
    }

    const trimmedMessage = message.trim();

    if (!trimmedMessage) {
      return res.status(400).json({
        message: "Reply message cannot be empty",
      });
    }

    if (trimmedMessage.length > 5000) {
      return res.status(400).json({
        message: "Reply message is too long",
      });
    }

    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is missing");

      return res.status(500).json({
        message: "Email service is not configured",
      });
    }

    if (!process.env.RESEND_FROM_EMAIL) {
      console.error("RESEND_FROM_EMAIL is missing");

      return res.status(500).json({
        message: "Sender email is not configured",
      });
    }

    const contact = await Contact.findById(req.params.id);

    if (!contact) {
      return res.status(404).json({
        message: "Message not found",
      });
    }

    const safeName = escapeHtml(contact.name);
    const safeMessage = escapeHtml(trimmedMessage);

    const resend = new Resend(
      process.env.RESEND_API_KEY,
    );

    const emailResult = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL,
      to: contact.email,
      subject: `Re: ${contact.subject}`,
      replyTo: process.env.RESEND_FROM_EMAIL,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #222;">
          <p>Hi ${safeName},</p>

          <p>${safeMessage.replace(/\n/g, "<br />")}</p>

          <hr style="border: 0; border-top: 1px solid #ddd; margin: 24px 0;" />

          <p style="font-size: 13px; color: #666;">
            This is a reply to your message from Mehedi's portfolio.
          </p>
        </div>
      `,
    });

    if (emailResult.error) {
      console.error(
        "Resend email failed:",
        emailResult.error,
      );

      return res.status(502).json({
        message: "Failed to send email",
      });
    }

    contact.replies.push({
      message: trimmedMessage,
      sender: "admin",
    });

    contact.status = "read";

    await contact.save();

    res.status(200).json({
      message: "Reply sent successfully",
      contact,
    });
  } catch (error) {
    console.error("Failed to reply to contact:", error);

    res.status(500).json({
      message: "Failed to send reply",
    });
  }
};