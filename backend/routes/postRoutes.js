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
  GetPostWithComments,
} = require("../controllers/postController");

router.route("/").get(getPosts).post(createPost);

router
  .route("/:id")
  .put(updatePost)
  .delete(deletePost)
  .get(GetPostWithComments);

router.route("/:id/like").post(likePost);

router.route("/:id/dislike").post(dislikePost);

router.route("/:id/comment").post(commentPost);

module.exports = router;
