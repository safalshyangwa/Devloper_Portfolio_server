import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "Blog title is required"],
  },
  description: {
    type: String,
    required: [true, "Content is required"],
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  image: {
    type: String, // URL or uploaded path
  },
}, { timestamps: true });

export const Blog = mongoose.model("Blog", blogSchema);