import { Blog } from "../models/blog.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// CREATE Blog
export const createBlog = asyncHandler(async (req, res) => {
 const image = req.file?.filename || "";
  const blog = await Blog.create({ ...req.body, image, owner: req.user?._id });
  blog;
  res.status(201).json(new ApiResponse(true, blog, "Blog created"));
});

// GET ALL Blogs
export const getBlogs = asyncHandler(async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res
    .status(200)
    .json(new ApiResponse(true, blogs, "Blogs fetched", blogs.length));
});

// GET SINGLE Blog
export const getBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new ApiError(404, "Blog not found");
  res.status(200).json(new ApiResponse(true, blog, "Blog fetched"));
});

// UPDATE Blog
export const updateBlog = asyncHandler(async (req, res) => {
  if (req.file) req.body.image = req.file.filename;
  const blog = await Blog.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!blog) throw new ApiError(404, "Blog not found");
  res.status(200).json(new ApiResponse(true, blog, "Blog updated"));
});

// DELETE Blog
export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params.id);
  if (!blog) throw new ApiError(404, "Blog not found");
  res.status(200).json(new ApiResponse(true, "Blog deleted successfully"));
});
