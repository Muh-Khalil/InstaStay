const User = require("../models/User.js");
const { validationResult } = require("express-validator");

//Render signup page
module.exports.signup = (req, res) => {
    res.render("users/normal/SignUp.ejs");
};

//Handle signup with validation
module.exports.signupPost = async (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        req.flash("error", errors.array().map(err => err.msg).join(", "));
        return res.redirect("/signup");
    }

    try {
        const { username, email, password } = req.body;

        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            req.flash("error", "Email is already registered! Please log in.");
            return res.redirect("/signup");
        }

        // Register the user
        let newUser = new User({ username, email });
        let registeredUser = await User.register(newUser, password);
        console.log(registeredUser);

        // Automatically log in the user after signup
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to InstaStay!");
            res.redirect("/listings");
        });

    } catch (error) {
        req.flash("error", "An error occurred. Please try again.");
        res.redirect("/signup");
    }
};

//Render login page
module.exports.login = (req, res) => {
    res.render("users/normal/Login.ejs");
};

//Handle login with validation
module.exports.loginPost = (req, res) => {
    req.flash("success", "Welcome back to InstaStay!");
    
    if (res.locals.RedirectUrl) {
        res.redirect(res.locals.RedirectUrl);
    } else {
        res.redirect("/listings");
    }
};

//Handle logout
module.exports.logout = (req, res) => {
    req.logout((err) => {
        if (err) {
            next(err);
        } else {
            req.flash("success", "You logged out!");
            res.redirect("/listings");
        }
    });
};