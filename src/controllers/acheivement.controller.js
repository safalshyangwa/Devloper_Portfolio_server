import {Achievement}  from "../models/Achievement.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// CREATE Achievement
export const createAchievement = asyncHandler(async (req, res) => {
  const avatar = req.file ? req.file.filename : "";
  const userId=req.user?._id 

 const achievement = await Achievement.create({
  ...req.body,   // Spreads title and description from the request
  image: avatar,
  owner: userId // Maps your 'avatar' variable to the 'image' field in your schema
});


  res.status(201).json(new ApiResponse(true, "Achievement created", achievement));
});

// GET ALL Achievements
export const getAchievements = asyncHandler(async (req, res) => {
  const achievments = await Achievement.find().sort({createdAt:-1})
  if (!achievments)
    
  {
    throw new ApiError(404,"No achievment found")
  }

  res
    .status(200)
    .json(new ApiResponse(true, achievments, "Achievements fetched"));
});
// GET SINGLE Achievement
export const getAchievement = asyncHandler(async (req, res) => {
  const achievement = await Achievement.findById(req.params.id);
  if (!achievement) throw new ApiError(404, "Achievement not found");
  res.status(200).json(new ApiResponse(true,achievement, "Achievement fetched" ));
});

// UPDATE Achievement
export const updateAchievement = asyncHandler(async (req, res) => {
  const { title, description } = req.body;
  const image = req.file?.filename;

  const achievement = await Achievement.findById(req.params.id);

  if (!achievement) {
    return res.status(404).json({ message: "Achievement not found" });
  }

  // Update fields only if provided
  achievement.title = title || achievement.title;
  achievement.description = description || achievement.description;

  if (image) {
    achievement.image = image;
  }

  await achievement.save();

  res.status(200).json({
    success: true,
    data: achievement,
    message: "Achievement updated successfully"
  });
});

// DELETE Achievement
export const deleteAchievement = asyncHandler(async (req, res) => {
  const achievement = await Achievement.findByIdAndDelete(req.params.id);
  if (!achievement) throw new ApiError(404, "Achievement not found");
  res.status(200).json(new ApiResponse(true, "Achievement deleted successfully"));
});