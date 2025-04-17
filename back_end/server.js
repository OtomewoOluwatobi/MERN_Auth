import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes.js";

dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Constants
const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI;

// Database connection
const connectDB = async () => {
  try {
    await mongoose.connect(MONGODB_URI); // Remove deprecated options
    console.log("MongoDB connected successfully");
  } catch (error) {
    console.error("MongoDB connection error:", error.message);
    process.exit(1);
  }
};

// Routes
app.use("/api", routes);

// Start server
const startServer = async () => {
  try {
    await connectDB();
    app.listen(PORT, () => {
      console.log(`Server running on port localhost:${PORT}`);
    });
  } catch (error) {
    console.error("Server error:", error.message);
    process.exit(1);
  }
};

startServer();

// Handle unhandled promise rejections
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  process.exit(1);
});
