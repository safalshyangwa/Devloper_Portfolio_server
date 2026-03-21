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
  const blogs = await Blog.find().sort({ createAt: -1 })
  if (!blogs)
  {
    throw new ApiError(404,"blog not found")
  }
  res
    .status(200)
    .json(new ApiResponse(true, blogs, "Blogs fetched"));
});

// GET SINGLE Blog
export const getBlog = asyncHandler(async (req, res) => {
  
  const blog = await Blog.findById(req.params.id);
  if (!blog) throw new ApiError(404, "Blog not found");
  res.status(200).json(new ApiResponse(true, blog, "Blog fetched"));
});

// UPDATE Blog
export const updateBlog = asyncHandler(async (req, res) =>
{
  const { title, description } = req.body
  const image = req.file?.filename
  const blog = await Blog.findById(req.params.id)
 
  if (!blog)
  {
throw new ApiError(404,"blog not found")
  }
    blog.title = title || blog.title;
    blog.description = description || blog.description;
  if (image) blog.image = image;
  
  await blog.save()
  res.status(200).json({
    success: true,
    data: blog,
    message: "blog updated successfully"
  });
})

// DELETE Blog
export const deleteBlog = asyncHandler(async (req, res) => {
  const blog = await Blog.findByIdAndDelete(req.params._id);
  if (!blog) throw new ApiError(404, "Blog not found");
  res.status(200).json(new ApiResponse(true, "Blog deleted successfully"));
});
