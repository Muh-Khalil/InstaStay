const { validationResult } = require("express-validator");
const User = require("../models/User.js");

// Render Admin Signup Page
module.exports.Singup = (req, res) => {
    res.render("users/admin/SignUp.ejs");
};

// Handle Admin Signup with Validation
module.exports.SingupPost = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("error", errors.array().map(err => err.msg).join(", "));
        return res.redirect("/admin/signup");
    }

    try {
        const { username, email, password } = req.body;

        // Check if admin already exists
        const existingAdmin = await User.findOne({ email, isAdmin: true });
        if (existingAdmin) {
            req.flash("error", "Admin already exists! Please login.");
            return res.redirect("/admin/login");
        }

        // Create a new admin
        const admin = new User({ username, email, isAdmin: true });
        await User.register(admin, password); // Passport-local-mongoose handles hashing
        req.flash("success", "Registered successfully! Please login.");
        res.redirect("/admin/login");

    } catch (error) {
        req.flash("error", "An error occurred during signup. Please try again.");
        res.redirect("/admin/signup");
    }
};

// Render Admin Login Page
module.exports.login = (req, res) => {
    res.render("users/admin/Login.ejs");
};

// Handle Admin Login
module.exports.loginPost = (req, res) => {
    if (!req.user || !req.user.isAdmin) {
        req.flash("error", "Access denied. Admins only.");
        return res.redirect("/admin/login");
    }
    res.redirect("/admin"); // Redirect to admin dashboard
};