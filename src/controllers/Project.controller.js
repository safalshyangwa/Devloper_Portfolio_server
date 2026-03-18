import { Project } from "../models/Project.model.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import fs from "fs";

/**
 * @desc Create new project
 * @route POST /api/projects
 *
 *
 */
export const createProject = asyncHandler(async (req, res) => {
  const { title, description, techStack } = req.body;

  const image = req.file?.filename;
  // 1. Split the string into an array
  const techStacks = techStack ? techStack.split(",") : [];

  // 2. Check the image separately (don't put it in parens after split)
  if (!image) {
    throw new ApiError(400, "Avatar file is required");
  }

  // Now you can use techStacks (the array) and image

  const project = await Project.create({
    title,
    description,
    techStack: techStacks,
    image,
    owner: req.user?._id
  });

  return res
    .status(201)
    .json(new ApiResponse(201, project, "Project created successfully"));
});

/**
 * @desc Get all projects
 * @route GET /api/projects
 */
export const getAllProjects = asyncHandler(async (req, res) => {
  const projects = await Project.find().sort({ createdAt: -1 });

  return res
    .status(200)
    .json(new ApiResponse(200, projects, "Projects fetched successfully"));
});

/**
 * @desc Get single project
 * @route GET /api/projects/:id
 */
export const getProjectById = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project fetched successfully"));
});

/**
 * @desc Update project
 * @route PUT /api/projects/:id
 */
export const updateProject = asyncHandler(async (req, res) => {
  const { title, description, techStack } = req.body;

  const project = await Project.findById(req.params.id);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  // replace image if new uploaded
  if (req.file) {
    if (project.image && fs.existsSync(project.image)) {
      fs.unlinkSync(project.image);
    }
    project.image = req.file.path;
  }

  if (title !== undefined) project.title = title;
  if (description !== undefined) project.description = description;
  if (techStack !== undefined) project.techStack = techStack;


  await project.save();

  return res
    .status(200)
    .json(new ApiResponse(200, project, "Project updated successfully"));
});

/**
 * @desc Delete project
 * @route DELETE /api/projects/:id
 */
export const deleteProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.id);

  if (!project) {
    throw new ApiError(404, "Project not found");
  }

  if (project.image && fs.existsSync(project.image)) {
    fs.unlinkSync(project.image);
  }

  await project.deleteOne();

  return res
    .status(200)
    .json(new ApiResponse(200, null, "Project deleted successfully"));
});
