const express = require("express");
const { body } = require("express-validator");
const commentRoutes = express.Router();
const { ensureAuthenticated } = require("../middleware/auth");
const { addComment, getCommentForm, updateComment, deleteComment } = require("../controllers/commentControllers");

const commentValidation = [
  body("content").trim().isLength({ min: 1, max: 500 }).withMessage("Comment must be between 1 and 500 characters"),
];

commentRoutes.post("/posts/:id/comments", ensureAuthenticated, commentValidation, addComment);
commentRoutes.get("/comments/:id/edit", ensureAuthenticated, getCommentForm);
commentRoutes.put("/comments/:id", ensureAuthenticated, commentValidation, updateComment);
commentRoutes.delete("/comments/:id", ensureAuthenticated, deleteComment);

module.exports = commentRoutes;
