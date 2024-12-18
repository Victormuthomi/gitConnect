const asyncHandler = require("express-async-handler");
//@desc Get Posts
//@Route GET /api/posts
//@acess private
const getPosts = asyncHandler(async (req, res) => {
  res.json({ message: "Get a Post" });
});

//@desc Create Post
//@Route POST /api/posts
//@acess private
const createPost = asyncHandler(async (req, res) => {
  res.json({ message: "create a post" });
});

//@desc Update Posts
//@Route PUT  /api/posts/:id
//@acess private
const updatePost = asyncHandler(async (req, res) => {
  res.json({ message: `update post ${req.params.id}` });
});

//@desc Delete Post
//@Route DELETE /api/posts/:id
//@acess private
const deletePost = asyncHandler(async (req, res) => {
  res.json({ message: `Delete post ${req.params.id}` });
});

//@desc Like Post
//@Route POST /api/posts/:id/like
//@acess private
const likePost = asyncHandler(async (req, res) => {
  res.json({ message: `like a post ${req.params.id}` });
});

//@desc Disike Post
//@Route POST /api/posts/:id/dislike
//@acess private
const dislikePost = asyncHandler(async (req, res) => {
  res.json({ message: `dislike a post ${req.params.id}` });
});

//@desc Comment Post
//@Route POST /api/posts/:id/comment
//@acess private
const commentPost = asyncHandler(async (req, res) => {
  res.json({ message: `comment on a post ${req.params.id}` });
});

//@desc Get a single  Post with comments
//@Route POST /api/posts/:id/
//@acess private
const GetPostWithComments = asyncHandler(async (req, res) => {
  res.json({ message: `Post with comments of  ${req.params.id}` });
});

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  commentPost,
  GetPostWithComments,
};
