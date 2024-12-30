import express from "express";
const router = express.Router(); // Use express.Router() directly

import {
  viewProfiles,
  createProfile,
  updateProfile,
  deleteProfile,
} from "../controllers/ProfileController.js";
import protect from "../middleware/authMiddleware.js";

// Route to get and create profiles
router.route("/").get(viewProfiles).post(protect, createProfile);

// Route to update and delete profiles
router.route("/:id").put(protect, updateProfile).delete(protect, deleteProfile);

export default router;
