import { z } from "zod";

export const signupSchema = z.object({
  username: z
    .string()
    .min(2, "Username must be at least 2 characters")
    .max(50, "Username too long")
    .trim(),


  email: z
    .string()
    .email("Invalid email format")
    .trim(),
    

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),

});


export const signinSchema = z.object({
  email: z
    .string()
    .email("Invalid email format")
    .trim()
    .toLowerCase(),

  password: z
    .string()
    .min(1, "Password is required")
});