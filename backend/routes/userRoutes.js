import express from "express"; // Import express
const router = express.Router(); // Use express.Router() directly

import {
  viewUsers,
  registerUser,
  loginUser,
  getuser,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

import protect from "../middleware/authMiddleware.js";

// Route to get and register users
router.route("/").get(viewUsers).post(registerUser);

// Route to login user
router.route("/login").post(loginUser);

// Route to get user data
router.route("/me").get(protect, getuser);

// Route to update and delete profiles
router.route("/:id").put(protect, updateUser).delete(protect, deleteUser);

export default router;
