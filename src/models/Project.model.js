import mongoose from "mongoose";
import { User } from "./User.model.js";
const projectSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    techStack: {
      type: [String],
    },
    image: String,
 
    owner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User",
  required: true
}
  },
  { timestamps: true }
);

export const  Project=mongoose.model("Project", projectSchema);