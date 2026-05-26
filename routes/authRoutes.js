const express = require("express");
const { body } = require("express-validator");
const { getLogin, login, getRegister, register, logout } = require("../controllers/authController");

const authRoutes = express.Router();

authRoutes.get("/login", getLogin);
authRoutes.post("/login", [
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").notEmpty().withMessage("Password is required"),
], login);

authRoutes.get("/register", getRegister);
authRoutes.post("/register", [
  body("username").trim().isLength({ min: 3 }).withMessage("Username must be at least 3 characters"),
  body("email").isEmail().withMessage("Please enter a valid email"),
  body("password").isLength({ min: 6 }).withMessage("Password must be at least 6 characters"),
], register);

authRoutes.get("/logout", logout);

module.exports = authRoutes;
