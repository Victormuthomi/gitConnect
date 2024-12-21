const express = require("express");
const router = express.Router();
const {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  commentPost,
  getComments,
} = require("../controllers/postController");

const { protect } = require("../middleware/authMiddleware");

//Route to get and post requests
router.route("/").get(protect, getPosts).post(protect, createPost);

//Route to update  and and delete post
router.route("/:id").put(protect, updatePost).delete(protect, deletePost);

//Route to like post
router.route("/:id/like").post(protect, likePost);

////Route to dislike post
router.route("/:id/dislike").post(protect, dislikePost);

//Route to comment post
router.route("/:id/comment").post(protect, commentPost);

////Route to get comments  post
router.route("/:id/comments").get(protect, getComments);

module.exports = router;
