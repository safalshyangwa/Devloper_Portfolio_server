import express from "express";
import upload from "../middlewares/Upload.middleware.js";
import {validate} from "../middlewares/validate.middleware.js";
// import { createProjectSchema,updateProjectSchema } from "../validators/project.validator.js";
import {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject
} from "../controllers/Project.controller.js";

import { verifyJWT, authorizeRoles } from "../middlewares/Auth.middleware.js";

const router = express.Router();

// Only logged-in admin can access these routes
router.use(verifyJWT);
router.use(authorizeRoles("admin"));
router.post('/create',upload.single("image"),createProject)
router.get("/", getAllProjects);

router.get("/:id", getProjectById);

router.put(
  "/:id",
  upload.single("avatar"),

  updateProject
);

router.delete("/:id", deleteProject);

export default router;
