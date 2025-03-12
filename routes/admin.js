const express = require("express");
const passport = require("passport");
const User = require("../models/User.js"); // User schema
const router = express.Router();
const { validationResult } = require("express-validator");
const { validateSignup, restrictAdminSignup} = require("../middleware.js");
const adminControllers = require("../controllers/admin.js");

// Render Admin Signup Page
router.get("/signup", restrictAdminSignup, adminControllers.Singup);

// Handle Admin Signup with Validation
router.post("/signup", validateSignup, adminControllers.SingupPost);

// Render Admin Login Page
router.get("/login", adminControllers.login);

// Handle Admin Login
router.post("/login", passport.authenticate("local", {
    failureRedirect: "/admin/login",
    failureFlash: true,
}), adminControllers.loginPost);

module.exports = router;
