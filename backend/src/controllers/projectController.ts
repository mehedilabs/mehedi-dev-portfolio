import { Request, Response } from "express";
import Project from "../models/Project.js";

export const getProjects = async (_req: Request, res: Response) => {
  try {
    const projects = await Project.find().sort({
      createdAt: -1,
    });

    res.status(200).json(projects);
  } catch (error) {
    console.error("Get projects error:", error);

    res.status(500).json({
      message: "Failed to get projects",
    });
  }
};

export const getProjectCount = async (
  _req: Request,
  res: Response,
) => {
  try {
    const count = await Project.countDocuments();

    res.status(200).json({
      count,
    });
  } catch (error) {
    console.error("Get project count error:", error);

    res.status(500).json({
      message: "Failed to get project count",
    });
  }
};

export const createProject = async (
  req: Request,
  res: Response,
) => {
  try {
    const project = await Project.create(req.body);

    res.status(201).json({
      message: "Project created successfully",
      project,
    });
  } catch (error) {
    console.error("Create project error:", error);

    res.status(500).json({
      message: "Failed to create project",
    });
  }
};

export const updateProject = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
        runValidators: true,
      },
    );

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      message: "Project updated successfully",
      project,
    });
  } catch (error) {
    console.error("Update project error:", error);

    res.status(500).json({
      message: "Failed to update project",
    });
  }
};

export const deleteProject = async (
  req: Request,
  res: Response,
) => {
  try {
    const { id } = req.params;

    const project = await Project.findByIdAndDelete(id);

    if (!project) {
      return res.status(404).json({
        message: "Project not found",
      });
    }

    res.status(200).json({
      message: "Project deleted successfully",
    });
  } catch (error) {
    console.error("Delete project error:", error);

    res.status(500).json({
      message: "Failed to delete project",
    });
  }
};