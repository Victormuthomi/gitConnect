// Import all the dependencies
import express from "express";
import colors from "colors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./config/db.js";
import errorHandler from "./middleware/errorMiddleware.js";

// Import routes
import postRoutes from "./routes/postRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import profileRoutes from "./routes/profileRoutes.js";

const port = process.env.PORT || 8000;

// Call the connect DB function
connectDB();

// Create an express app
const app = express();

// Middleware to handle incoming JSON and URL-encoded data
app.use(express.json()); // For parsing application/json
app.use(express.urlencoded({ extended: true })); // For parsing application/x-www-form-urlencoded

// Routes
app.use("/api/posts", postRoutes);
app.use("/api/users", userRoutes);
app.use("/api/profiles", profileRoutes);

// Use the error handler middleware (should come after the routes)
app.use(errorHandler);

// Listen to a specified port in the .env file
app.listen(port, () => console.log(`Server started on port ${port}`));
