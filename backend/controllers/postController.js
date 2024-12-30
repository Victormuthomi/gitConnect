import asyncHandler from "express-async-handler";
import Post from "../models/postModels.js";
import User from "../models/userModels.js";

// @desc Get Posts
// @Route GET /api/posts
// @access public
export const getPosts = asyncHandler(async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    res.status(500).json({ message: "Server error fetching posts" });
  }
});

export const getPost = asyncHandler(async (req, res) => {
  try {
    // Fetch the post by ID
    const post = await Post.findById(req.params.id);

    // Check if the post exists
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    // Verify that the post belongs to the logged-in user
    if (post.user.toString() !== req.user.id) {
      return res
        .status(403)
        .json({ message: "Not authorized to view this post" });
    }

    // Return the post if authorized
    res.json(post);
  } catch (error) {
    console.error("Error fetching post:", error);
    res.status(500).json({ message: "Server error fetching post" });
  }
});

// @desc Create Post
// @Route POST /api/posts
// @access private
export const createPost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.create({
      text: req.body.text,
      user: req.user.id,
    });
    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post", error);
    res.status(500).json({ message: "Server error creating post" });
  }
});

// @desc Update Post
// @Route PUT /api/posts/:id
// @access private
export const updatePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      res.status(400);
      throw new Error("Post not found");
    }
    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(401);
      throw new Error("User not found");
    }

    if (post.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    res.json(updatedPost);
  } catch (error) {
    console.error("Error updating post", error);
    res.status(500).json({ message: "Server error updating post" });
  }
});

// @desc Delete Post
// @Route DELETE /api/posts/:id
// @access private
export const deletePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);

    if (!post) {
      res.status(400);
      throw new Error("Post not found");
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      res.status(401);
      throw new Error("Not Authorized");
    }

    if (post.user.toString() !== user.id) {
      res.status(401);
      throw new Error("User not authorized");
    }

    res.json({ message: "Post deleted", id: req.params.id });
  } catch (error) {
    console.error("Error deleting post", error);
    res.status(500).json({ message: "Server error deleting post" });
  }
});

// @desc Like Post
// @Route POST /api/posts/:id/like
// @access private
export const likePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(400);
      throw new Error("Post Not found");
    }
    post.likes += 1;
    await post.save();
    res.json({ message: "Post liked", likes: post.likes });
  } catch (error) {
    console.error("Error liking post", error);
    res.status(500).json({ message: "Server error liking post" });
  }
});

// @desc Dislike Post
// @Route POST /api/posts/:id/dislike
// @access private
export const dislikePost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(200);
      throw new Error("Post not found");
    }
    post.dislikes += 1;
    await post.save();
    res.json({ message: "Post Disliked", dislikes: post.dislikes });
  } catch (error) {
    console.error("Error disliking post", error);
    res.status(500).json({ message: "Server error disliking post" });
  }
});

// @desc Comment Post
// @Route POST /api/posts/:id/comment
// @access private
export const commentPost = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(400);
      throw new Error("Post not found");
    }
    post.comments.push(req.body.comment);

    await post.save();

    res.json({ message: "Comment added", comments: post.comments });
  } catch (error) {
    console.error("Error commenting post", error);
    res.status(500).json({ message: "Server error commenting post" });
  }
});

// @desc Get All Comments for a Post
// @Route GET /api/posts/:id/comments
// @access public
export const getComments = asyncHandler(async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      res.status(400);
      throw new Error("Post not found");
    }

    res.status(200).json({
      message: "Comments retrieved successfully",
      comments: post.comments,
    });
  } catch (error) {
    console.error("Error getting comments", error);
    res.status(500).json({ message: "Server error getting comments" });
  }
});
