const asyncHandler = require("express-async-handler");
const { validationResult } = require("express-validator");
const File = require("../models/File");
const Post = require("../models/Post");
const cloudinary = require("../config/cloudinary");

const POSTS_PER_PAGE = 10;

//Rendering post form
exports.getPostForm = asyncHandler((req, res) => {
  res.render("newPost", {
    title: "Create Post",
    user: req.user,
    error: "",
    success: "",
  });
});

//Creating new post
exports.createPost = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.render("newPost", {
      title: "Create Post",
      user: req.user,
      error: errors.array()[0].msg,
      success: "",
    });
  }
  const { title, content } = req.body;
  if (!req.files || req.files.length === 0) {
    return res.render("newPost", {
      title: "Create Post",
      user: req.user,
      error: "At least one image is required",
      success: "",
    });
  }
  const images = await Promise.all(
    req.files.map(async (file) => {
      const newFile = new File({
        url: file.path,
        public_id: file.filename,
        uploaded_by: req.user._id,
      });
      await newFile.save();
      return { url: newFile.url, public_id: newFile.public_id };
    }),
  );
  const newPost = new Post({ title, content, author: req.user._id, images });
  await newPost.save();
  res.render("newPost", {
    title: "Create Post",
    user: req.user,
    success: "Post created successfully",
    error: "",
  });
});

//Get all posts — with pagination and search
exports.getPosts = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const search = req.query.search || "";
  const query = search
    ? { title: { $regex: search, $options: "i" } }
    : {};

  const totalPosts = await Post.countDocuments(query);
  const totalPages = Math.ceil(totalPosts / POSTS_PER_PAGE);

  const posts = await Post.find(query)
    .populate("author", "username")
    .sort({ createdAt: -1 })
    .skip((page - 1) * POSTS_PER_PAGE)
    .limit(POSTS_PER_PAGE);

  res.render("posts", {
    title: "Posts",
    posts,
    user: req.user,
    success: "",
    error: "",
    currentPage: page,
    totalPages,
    search,
  });
});

//Get post by id
exports.getPostById = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id)
    .populate("author", "username")
    .populate("likes", "_id")
    .populate({
      path: "comments",
      populate: { path: "author", model: "User", select: "username" },
    });
  res.render("postDetails", {
    title: "Post",
    post,
    user: req.user,
    success: "",
    error: "",
  });
});

//Get edit post form
exports.getEditPostForm = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.render("postDetails", {
      title: "Post",
      post,
      user: req.user,
      error: "Post not found",
      success: "",
    });
  }
  res.render("editPost", {
    title: "Edit Post",
    post,
    user: req.user,
    error: "",
    success: "",
  });
});

//Update post — fix: only replace images if new files uploaded
exports.updatePost = asyncHandler(async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const post = await Post.findById(req.params.id);
    return res.render("editPost", {
      title: "Edit Post",
      post,
      user: req.user,
      error: errors.array()[0].msg,
      success: "",
    });
  }
  const { title, content } = req.body;
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.render("postDetails", {
      title: "Post",
      post,
      user: req.user,
      error: "Post not found",
      success: "",
    });
  }
  if (post.author.toString() !== req.user._id.toString()) {
    return res.render("postDetails", {
      title: "Post",
      post,
      user: req.user,
      error: "You are not authorized to edit this post",
      success: "",
    });
  }
  post.title = title || post.title;
  post.content = content || post.content;

  // Only replace images if new ones were uploaded
  if (req.files && req.files.length > 0) {
    await Promise.all(
      post.images.map(async (image) => {
        await cloudinary.uploader.destroy(image.public_id);
      }),
    );
    post.images = await Promise.all(
      req.files.map(async (file) => {
        const newFile = new File({
          url: file.path,
          public_id: file.filename,
          uploaded_by: req.user._id,
        });
        await newFile.save();
        return { url: newFile.url, public_id: newFile.public_id };
      }),
    );
  }
  await post.save();
  res.redirect(`/posts/${post._id}`);
});

//Delete post
exports.deletePost = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.render("postDetails", {
      title: "Post",
      post,
      user: req.user,
      error: "Post not found",
      success: "",
    });
  }
  if (post.author.toString() !== req.user._id.toString()) {
    return res.render("postDetails", {
      title: "Post",
      post,
      user: req.user,
      error: "You are not authorized to delete this post",
      success: "",
    });
  }
  await Promise.all(
    post.images.map(async (image) => {
      await cloudinary.uploader.destroy(image.public_id);
    }),
  );
  await Post.findByIdAndDelete(req.params.id);
  res.redirect("/posts");
});

//Like / Unlike post
exports.toggleLike = asyncHandler(async (req, res) => {
  const post = await Post.findById(req.params.id);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }
  const userId = req.user._id.toString();
  const alreadyLiked = post.likes.some((id) => id.toString() === userId);
  if (alreadyLiked) {
    post.likes = post.likes.filter((id) => id.toString() !== userId);
  } else {
    post.likes.push(req.user._id);
  }
  await post.save();
  res.json({ likes: post.likes.length, liked: !alreadyLiked });
});
