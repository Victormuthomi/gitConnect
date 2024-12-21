const asyncHandler = require("express-async-handler");

const Post = require("../models/postModels");
const user = require("../models/userModels");

//@desc Get Posts
//@Route GET /api/posts
//@acess private
const getPosts = asyncHandler(async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
});

//@desc Create Post
//@Route POST /api/posts
//@acess private
const createPost = asyncHandler(async (req, res) => {
  const post = await Post.create({
    text: req.body.text,
    user: req.user.id,
  });

  res.status(201).json(post);
});

//@desc Update Posts
//@Route PUT  /api/posts/:id
//@acess private
const updatePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }
  //Get the user
  const user = await User.findById(req.user.id);

  //check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  //make sure the logged in user matches the post user
  if (post.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }
  //update the post
  const updatedGoal = await Post.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.json(updatedGoal);
});

//@desc Delete Post
//@Route DELETE /api/posts/:id
//@access private
const deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findByIdAndDelete(req.params.id);

  //get the user
  const user = await User.findById(req.user.id);

  //Check for user
  if (!user) {
    res.status(401);
    throw new Error("Not Authorized");
  }

  //make sure the logged in user matches the post user
  if (post.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized");
  }

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  res.json({ message: "Post deleted", id: req.params.id });
});

//@desc Like Post
//@Route POST /api/posts/:id/like
//@acess private
const likePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post Not found");
  }
  post.likes += 1;
  await post.save();
  res.json({ message: "Post liked", likes: post.likes });
});

//@desc Disike Post
//@Route POST /api/posts/:id/dislike
//@acess private
const dislikePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(200);
    throw new Error("Post not found");
  }
  post.dislikes += 1;
  await post.save();
  res.json({ message: "Post Disliked", dislikes: post.dislikes });
});

//@desc Comment Post
//@Route POST /api/posts/:id/comment
//@acess private
const commentPost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }
  post.comments.push(req.body.comment);

  await post.save();

  res.json({ message: "Comment added", comments: post.comments });
});

//@desc Get All Comments for a Post
//@Route GET /api/posts/:id/comments
//@access public
const getComments = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);

  if (!post) {
    res.status(400);
    throw new Error("Post not found");
  }

  res.status(200).json({
    message: "Comments retrieved successfully",
    comments: post.comments,
  });
});

module.exports = {
  getPosts,
  createPost,
  updatePost,
  deletePost,
  likePost,
  dislikePost,
  commentPost,
  getComments,
};
