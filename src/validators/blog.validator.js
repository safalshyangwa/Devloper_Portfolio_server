import { z } from "zod";

// Blog schema
export const createBlogSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: "Title is required",
    }).min(5, "Title must be at least 5 characters long"),

    content: z.string({
      required_error: "Content is required",
    }).min(20, "Content must be at least 20 characters long"),

    author: z.string().optional(),

    image: z.string().url("Image must be a valid URL").optional(),
  }),
});

// Update schema (all fields optional)
export const updateBlogSchema = z.object({
  body: z.object({
    title: z.string().min(5).optional(),
    content: z.string().min(20).optional(),
    author: z.string().optional(),
    image: z.string().url().optional(),
  }),
});