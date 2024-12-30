import express from "express";
const router = express.Router(); // Use express.Router() directly

import {
  getPosts,
  getPost,
  createPost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  commentPost,
  getComments,
} from "../controllers/postController.js";

// Importing protect middleware
import protect from "../middleware/authMiddleware.js"; // Corrected import

// Route to get and post requests
router.route("/").get(getPosts).post(protect, createPost);

// Route to get individual post
router.route("/:id/").get(protect, getPost);

// Route to update and delete post
router.route("/:id").put(protect, updatePost).delete(protect, deletePost);

// Route to like post
router.route("/:id/like").post(protect, likePost);

// Route to dislike post
router.route("/:id/dislike").post(protect, dislikePost);

// Route to comment post
router.route("/:id/comment").post(protect, commentPost);

// Route to get comments for a post
router.route("/:id/comments").get(protect, getComments);

export default router;
