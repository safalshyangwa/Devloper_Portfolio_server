import { User } from "../models/User.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { validate } from "../middlewares/validate.middleware.js";
import { signupSchema } from "../validators/auth.validator.js";



export const Signup = asyncHandler(async (req, res) => {
  const data = validate(signupSchema, req.body)
  console.log(data)

  if (!data.success)
  {
    throw  new ApiError(400,"not validated")
  }
  const { username, email, password } = req.body;
  

 
  // check existing
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "User already exists");
  }

  // hash password
  const hashedPassword = await bcrypt.hash(password, 10);

const avatar = req.file?.filename || "";
console.log("Avatar filename:", avatar);

  // create user
  const user = await User.create({
    username,
    email,
    password: hashedPassword,
    avatar
  });

  return res.status(201).json(
    new ApiResponse(
      201,
      {
        user
      },
      "User registered successfully"
    )
  );
});

export const Signin = asyncHandler(async (req, res) => {
  
  const { email, password } = req.body;

 
  // 2. Check if user exists
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "user is not with this  email");
  }
  // 1. Correctly compare the plain text password with the hashed one
  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  // 2. Check the result
  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid credentials");
  }

  const accessToken = user.generateAccessToken();
  const refreshToken = user.generateRefreshToken();

  // 4. SEND the response (Crucial fix)
  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        { accessToken, refreshToken },
        "User signed in successfully"
      )
    );
})

export const Signout = asyncHandler(async (req, res) => {
  const user=req.user
  try {

    // Clear the refresh token from the database
    user.refreshToken = null;
    await user.save();

    return res
      .status(200)
      .json(new ApiResponse(200, null, "User signed out successfully"));
  } catch (error) {
    console.error("Error signing out:", error.message);
    throw new ApiError(401, "Invalid refresh token");
  }
});
export const RefreshToken = asyncHandler(async (req, res) => {
  const {refreshToken}  = req.body;

  if (!refreshToken || typeof refreshToken !== "string") {
    throw new ApiError(400, "Valid refresh token is required");
  }

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const user = await User.findById(decoded._id);

    if (!user) {
      throw new ApiError(401, "Invalid refresh token");
    }

    const newAccessToken = user.generateAccessToken();
    const newRefreshToken = user.generateRefreshToken();

    return res.status(200).json(
      new ApiResponse(
        200,
        {
          accessToken: newAccessToken,
          refreshToken: newRefreshToken
        },
        "Tokens refreshed successfully"
      )
    );
  } catch (error) {
    console.error("Error refreshing token:", error.message);

    throw new ApiError(401, "Invalid or expired refresh token");
  }
});

export const getCurrentUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).select("-password");

  return res
    .status(200)
    .json(new ApiResponse(200, user, "User fetched successfully"));
});
