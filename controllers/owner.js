const Listing = require("../models/listing.js");
const User = require("../models/User.js");
const Booking = require("../models/booking.js");
const Review = require("../models/review.js");

// Render Owner Dashboard
module.exports.dashboard = async (req, res) => {
    try {
        const ownerId = req.user._id;
        
        // Find listings owned by this user
        const listings = await Listing.find({ owner: ownerId });
        const listingIds = listings.map(l => l._id);
        
        // Find bookings for these listings
        const bookings = await Booking.find({ listing: { $in: listingIds } })
            .populate("user")
            .populate("listing");
            
        let totalRevenue = 0;
        bookings.forEach(booking => {
            if (booking.listing && booking.listing.price) {
                totalRevenue += booking.listing.price;
            }
        });

        res.render("owner/dashboard.ejs", { listings, bookings, totalRevenue });
    } catch (error) {
        console.error("Dashboard Error:", error);
        req.flash("error", "Could not load dashboard.");
        res.redirect("/listings");
    }
};

// Manage My Listings
module.exports.myListings = async (req, res) => {
    try {
        const listings = await Listing.find({ owner: req.user._id });
        res.render("owner/my-listings.ejs", { listings });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

// Manage My Bookings
module.exports.myBookings = async (req, res) => {
    try {
        const listings = await Listing.find({ owner: req.user._id });
        const listingIds = listings.map(l => l._id);
        const bookings = await Booking.find({ listing: { $in: listingIds } })
            .populate("user")
            .populate("listing");
            
        res.render("owner/my-bookings.ejs", { bookings });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};
