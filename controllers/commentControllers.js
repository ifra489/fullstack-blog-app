const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const Comment = require("../models/Comment");
const Post = require("../models/Post");

//add comment
exports.addComment = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const post = await Post.findById(req.params.id)
      .populate("author", "username")
      .populate({ path: "comments", populate: { path: "author", model: "User", select: "username" } });
    return res.render("postDetails", {
      title: "Post",
      post,
      user: req.user,
      error: errors.array()[0].msg,
      success: "",
    });
  }
  const { content } = req.body;
  const postId = req.params.id;
  const post = await Post.findById(postId);
  if (!post) {
    return res.render("postDetails", {
      title: "Post",
      post,
      user: req.user,
      error: "Post not found",
      success: "",
    });
  }
  const comment = new Comment({ content, post: postId, author: req.user._id });
  await comment.save();
  post.comments.push(comment._id);
  await post.save();
  res.redirect(`/posts/${postId}`);
});

//get comment form
exports.getCommentForm = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.render("postDetails", {
      title: "Post",
      comment,
      user: req.user,
      error: "Comment not found",
      success: "",
    });
  }
  res.render("editComment", {
    title: "Edit Comment",
    comment,
    user: req.user,
    error: "",
    success: "",
  });
});

//update comment
exports.updateComment = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const comment = await Comment.findById(req.params.id);
    return res.render("editComment", {
      title: "Edit Comment",
      comment,
      user: req.user,
      error: errors.array()[0].msg,
      success: "",
    });
  }
  const { content } = req.body;
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.render("postDetails", {
      title: "Post",
      comment,
      user: req.user,
      error: "Comment not found",
      success: "",
    });
  }
  if (comment.author.toString() !== req.user._id.toString()) {
    return res.render("postDetails", {
      title: "Post",
      comment,
      user: req.user,
      error: "You are not authorized to edit this comment",
      success: "",
    });
  }
  comment.content = content || comment.content;
  await comment.save();
  res.redirect(`/posts/${comment.post}`);
});

//delete comment
exports.deleteComment = asyncHandler(async (req, res) => {
  const comment = await Comment.findById(req.params.id);
  if (!comment) {
    return res.render("postDetails", {
      title: "Post",
      comment,
      user: req.user,
      error: "Comment not found",
      success: "",
    });
  }
  if (comment.author.toString() !== req.user._id.toString()) {
    return res.render("postDetails", {
      title: "Post",
      comment,
      user: req.user,
      error: "You are not authorized to delete this comment",
      success: "",
    });
  }
  await Comment.findByIdAndDelete(req.params.id);
  res.redirect(`/posts/${comment.post}`);
});
