import express from "express";
import {
  createBlog,
  getBlogs,
  getBlog,
  updateBlog,
  deleteBlog
} from "../controllers/blog.controller.js";
import { verifyJWT, authorizeRoles } from "../middlewares/Auth.middleware.js";
import { validate } from "../middlewares/validate.middleware.js";
import { createBlogSchema,updateBlogSchema } from "../validators/blog.validator.js";
import upload from "../middlewares/Upload.middleware.js";

const router = express.Router();
router.use(verifyJWT);
router.use(authorizeRoles("admin"));

router.post("/create",upload.single('image'),createBlog);
router.get("/", getBlogs);
router.get("/:id", getBlog);
router.put("/:id",updateBlog);
router.delete("/:id", deleteBlog);

export default router;