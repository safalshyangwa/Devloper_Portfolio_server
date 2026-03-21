import express from "express";
import {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog
} from "../controllers/blog.controller.js";
import { verifyJWT, authorizeRoles } from "../middlewares/Auth.middleware.js";


import upload from "../middlewares/Upload.middleware.js";
import { validateMiddleware } from "../middlewares/validate.middleware.js";

const router = express.Router();

// Public routes for viewing blogs
router.get("/", getBlogs);
router.get("/:id", getBlog);

// Protected routes for admin only
router.use(verifyJWT);
router.use(authorizeRoles("admin"));
router.post("/create",upload.single('image'),createBlog);
router.put("/:id",upload.single("image"),updateBlog);
router.delete("/:id", deleteBlog);

export default router;