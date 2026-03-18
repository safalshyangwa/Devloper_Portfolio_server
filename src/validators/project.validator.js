// import { z } from "zod";

// export const createProjectSchema = z.object({
//   title: z
//     .string()
//     .min(3, "Title must be at least 3 characters")
//     .max(100),

//   description: z
//     .string()
//     .min(10, "Description must be at least 10 characters")
//     .max(2000),

//   techStack: z.string(),

 

// });

/**
 * Update project schema
 * All fields optional, but validated if present
 */
export const updateProjectSchema = createProjectSchema.partial();