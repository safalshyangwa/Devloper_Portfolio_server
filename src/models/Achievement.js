import mongoose from "mongoose";

const achievementSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      minlength: [5, "Title must be at least 5 characters"], // Lowercase 'l'
      maxlength: [20, "Title cannot exceed 20 characters"]  // Lowercase 'l'
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      minlength: [10, "Description must be at least 10 characters"],
      maxlength: [100, "Description cannot exceed 100 characters"]
    },
    image: {
      type: String
    },
    owner:{
       type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
  },
  { timestamps: true }
);

// Check if the model exists in the mongoose.models object, otherwise create it
export const Achievement = mongoose.model("Achievement", achievementSchema);

