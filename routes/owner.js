const express = require("express");
const router = express.Router();
const { isloggedIn, isOwnerRole } = require("../middleware.js");
const ownerControllers = require("../controllers/owner.js");

// All owner routes require being logged in and having the 'owner' role
router.use(isloggedIn, isOwnerRole);

// Owner Dashboard
router.get("/dashboard", ownerControllers.dashboard);

// My Listings
router.get("/listings", ownerControllers.myListings);

// My Bookings
router.get("/bookings", ownerControllers.myBookings);

module.exports = router;
