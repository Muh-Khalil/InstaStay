const express = require("express");
const router = express.Router();
//isAuthenication middleware
const { isloggedIn, IsOwner } = require("../middleware.js");
//Parseing file-data
const multer = require('multer');
const { storage, cloudinary } = require("../cloudConfigs.js");
// const upload = multer({ dest: "uploads/"});
const upload = multer({ storage: storage });
const listingControllers = require("../controllers/listings.js");

//Index Route
router.get("", listingControllers.index);

//Create new listing Route
router.get("/new", isloggedIn, listingControllers.newlisting);


//Saved the Created listing.
router.post("/new", upload.single('image'), isloggedIn, listingControllers.savelisting);

//filter get route
router.get("/filter", isloggedIn, listingControllers.filter);


//filter post route
router.post("/filter", isloggedIn, listingControllers.filterlisting);

//Booking get Route
router.get("/:id/booking", isloggedIn, listingControllers.booking);

// Booking post route
router.post("/:id/booking", isloggedIn, listingControllers.bookinglist);

//AboutUs page get route
router.get("/aboutus", listingControllers.aboutUs);

//Blog page get route
router.get("/blog", listingControllers.blog);

//Edit the listing route
router.get("/:id/edit", isloggedIn, IsOwner, listingControllers.edit);

//UPDATE listing Route
router.put("/:id/edit", upload.single("image"), isloggedIn, IsOwner, listingControllers.updatelist);

// Delete listing Route
router.get("/:id/delete", isloggedIn, IsOwner, listingControllers.deletelist);

//Read listing Route
router.get("/:id", listingControllers.showlisting);

module.exports = router;