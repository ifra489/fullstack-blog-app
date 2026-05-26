const express = require("express");
const { body } = require("express-validator");
const {
  getPostForm, createPost, getPosts, getPostById,
  getEditPostForm, updatePost, deletePost, toggleLike,
} = require("../controllers/postControllers");
const upload = require("../config/multer");
const { ensureAuthenticated } = require("../middleware/auth");

const postRoutes = express.Router();

const postValidation = [
  body("title").trim().isLength({ min: 3 }).withMessage("Title must be at least 3 characters"),
  body("content").trim().isLength({ min: 10 }).withMessage("Content must be at least 10 characters"),
];

// Fix: GET /add also protected
postRoutes.get("/add", ensureAuthenticated, getPostForm);
postRoutes.post("/add", ensureAuthenticated, upload.array("images", 5), postValidation, createPost);

postRoutes.get("/", getPosts);
postRoutes.get("/:id", getPostById);
postRoutes.get("/:id/edit", ensureAuthenticated, getEditPostForm);
postRoutes.put("/:id", ensureAuthenticated, upload.array("images", 5), postValidation, updatePost);
postRoutes.delete("/:id", ensureAuthenticated, deletePost);

// Like / Unlike
postRoutes.post("/:id/like", ensureAuthenticated, toggleLike);

module.exports = postRoutes;
