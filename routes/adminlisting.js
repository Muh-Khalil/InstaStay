const express = require("express");
const router = express.Router();
const app = express();
const Listing = require("../models/listing.js");
const Booking = require("../models/booking.js");
const User = require("../models/User.js");
const Review = require("../models/review.js");
//isAuthenication middleware
const { isloggedIn, IsOwner, isAdmin } = require("../middleware.js");
const adminlistControllers = require("../controllers/adminlisting.js");

// Admin Panel route
router.get("", isAdmin, adminlistControllers.admin);

// admin user route
router.get("/user", isAdmin, adminlistControllers.Userhandle);

//admin edit user route
router.get("/edit-user/:id", isAdmin, adminlistControllers.editUser);


//admin update user route
router.put("/update-user/:id", isAdmin, adminlistControllers.updateUser);


//admin delete user route
router.get("/delete-user/:id", isAdmin, adminlistControllers.deleteUser);

//admin listing route
router.get("/listing", isAdmin, adminlistControllers.listinghandle);

//admin delete listing router
router.get("/delete-listing/:id", isAdmin, adminlistControllers.deleteList);

//admin booking route
router.get("/booking", isAdmin, adminlistControllers.handleBooking);

//admin edit booking route
router.get("/edit-booking/:id", isAdmin, adminlistControllers.editBooking);

//admin update booking route
router.put("/edit-booking/:id", isAdmin, adminlistControllers.updateBooking);

// Get all reviews
router.get('/review',isAdmin, adminlistControllers.reviewHandle);

// Delete review
router.post('/review/:id/delete',isAdmin, adminlistControllers.deletereview);

//admin Analytics route
router.get("/analytics", isAdmin, adminlistControllers.adminanalytic);

//admin settings route
router.get("/setting", isAdmin, adminlistControllers.analyticadmin);

//admin update profile route
router.post("/setting/profile", isAdmin, adminlistControllers.Updateadmin);

//admin delete profile route 
router.get("/setting/delete", isAdmin, adminlistControllers.deleteadmin);
module.exports = router;