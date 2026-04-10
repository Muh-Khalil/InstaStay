const express = require("express");
const router = express.Router();
const passport = require("passport");
const adminController = require("../controllers/admin.js");
const { saveRedirectUrl, restrictAdminSignup } = require("../middleware.js");

// Admin Signup routes
router.get("/signup", restrictAdminSignup, adminController.Singup);
router.post("/signup", adminController.SingupPost);

// Admin Login routes
router.get("/login", adminController.login);
router.post("/login", saveRedirectUrl, passport.authenticate("local", {
    failureRedirect: "/admin/login",
    failureFlash: true,
}), adminController.loginPost);

module.exports = router;
