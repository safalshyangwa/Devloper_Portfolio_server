import mongoose from "mongoose";

export const connectDB = async () => {
  // Access variables inside the function to ensure they are loaded
  const { DATABASE_HOST, DATABASE_PORT, DATABASE_NAME } = process.env;

  const mongoURI = `mongodb://${DATABASE_HOST}:${DATABASE_PORT}/${DATABASE_NAME}`;

  // Debug check: This should NOT say "mongodb://undefined:undefined/undefined"
 console.log ("Attempting to connect to:", mongoURI);

  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error.message);
    process.exit(1);
  }
};
