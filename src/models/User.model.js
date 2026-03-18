import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const { Schema, model } = mongoose;

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: [true, "username is required"]
    },

    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true
    },

    password: {
      type: String,
      required: [true, "Password is required"]
    },

    avatar: {
      type: String,
      default: ""
    },

    role: {
      type: String,
      enum: ["admin"],
      default: "admin"
    },

    refreshToken: {
      type: String,
      default: ""
    }
  },
  {
    timestamps: true
  }
);



// 🔐 Generate access token
userSchema.methods.generateAccessToken = function () {
  return jwt.sign(
    {
      _id: this._id,
      email: this.email,
      role: this.role
    },
    process.env.JWT_ACCESS_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRES || "15m"
    }
  );
};

// 🔐 Generate refresh token
userSchema.methods.generateRefreshToken = function () {
  const token = jwt.sign(
    {
      _id: this._id
    },
    process.env.JWT_REFRESH_SECRET,
    {
      expiresIn: process.env.REFRESH_TOKEN_EXPIRES || "7d"
    }
  );

  this.refreshToken = token;
  return token;
};

export const User = model("User", userSchema);
