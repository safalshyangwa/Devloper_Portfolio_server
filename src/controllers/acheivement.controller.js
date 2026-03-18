import {Achievement}  from "../models/Achievement.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

// CREATE Achievement
export const createAchievement = asyncHandler(async (req, res) => {
  const avatar = req.file ? req.file.filename: "";

 const achievement = await Achievement.create({
  ...req.body,   // Spreads title and description from the request
  image: avatar,
  owner:req.user?._id   // Maps your 'avatar' variable to the 'image' field in your schema
});


  res.status(201).json(new ApiResponse(true, "Achievement created", achievement));
});

// GET ALL Achievements
export const getAchievements = asyncHandler(async (req, res) => {
  const achievements = await Achievement.find().sort({ createdAt: -1 });
  res.status(200).json(new ApiResponse(true, achievements,"Achievements fetched"));
});

// GET SINGLE Achievement
export const getAchievement = asyncHandler(async (req, res) => {
  const achievement = await Achievement.findById(req.params.id);
  if (!achievement) throw new ApiError(404, "Achievement not found");
  res.status(200).json(new ApiResponse(true,achievement, "Achievement fetched" ));
});

// UPDATE Achievement
export const updateAchievement = asyncHandler(async (req, res) => {
  const achievement = await Achievement.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true, runValidators: true }
  );
  if (!achievement) throw new ApiError(404, "Achievement not found");
  res.status(200).json(new ApiResponse(true,achievement, "Achievement updated"));
});

// DELETE Achievement
export const deleteAchievement = asyncHandler(async (req, res) => {
  const achievement = await Achievement.findByIdAndDelete(req.params.id);
  if (!achievement) throw new ApiError(404, "Achievement not found");
  res.status(200).json(new ApiResponse(true, "Achievement deleted successfully"));
});