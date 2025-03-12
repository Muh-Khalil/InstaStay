const express = require("express");
const router = express.Router();
const passport = require("passport");
const { saveRedirectUrl, validateSignup } = require("../middleware.js");
const userControllers = require("../controllers/users.js");

// Render Signup Form
router.get("/signup", userControllers.signup);

// Handle Signup with Validation
router.post("/signup", validateSignup, userControllers.signupPost);

// Render Login Form
router.get("/login", userControllers.login);

// Handle Login with Validation
router.post("/login", saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }), userControllers.loginPost);

// Logout Route
router.get("/logout", userControllers.logout);

module.exports = router;
