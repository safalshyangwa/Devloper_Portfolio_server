import express from "express";
import upload from "../middlewares/Upload.middleware.js";

import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject
} from "../controllers/Project.controller.js";

import { verifyJWT, authorizeRoles } from "../middlewares/Auth.middleware.js";
import { validateMiddleware } from "../middlewares/validate.middleware.js";
import { createBlogSchema } from "../validators/blog.validator.js";

const router = express.Router();

// Public routes for viewing projects
router.get("/", getAllProjects);
router.get("/:id", getProjectById);

// Authorization middleware for write operations
router.use(verifyJWT);

router.use(authorizeRoles("admin"));

router.post("/create", upload.single("image"), createProject);
router.put("/:id", upload.single("image"), updateProject);
router.delete("/:id", deleteProject);

export default router;
