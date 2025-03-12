const express = require("express");
const router = express.Router({mergeParams: true});
//isAuthenication middleware
const { isloggedIn, IsReviewedAuthor } = require("../middleware.js");
const reviewControllers = require("../controllers/reviews.js");

//Review
//post review route
router.post("", isloggedIn, reviewControllers.review);

//Delete review Route
router.post("/:reviewId",isloggedIn, IsReviewedAuthor, reviewControllers.deletereview);

module.exports = router;