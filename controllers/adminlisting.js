const Listing = require("../models/listing.js");
const User = require("../models/User.js");
const Booking = require("../models/booking.js");
const Review = require("../models/review.js")

//Render admin dashboard
module.exports.admin = async (req, res) => {
    const users = await User.find();
    const listings = await Listing.find();
    const bookings = await Booking.find().populate("user").populate("listing");
    let Revenue = 0;
    bookings.forEach(booking => {
        console.log(booking);
        Revenue += booking.listing.price;
    });
    console.log("Admin Panel accessed");
    res.render("adminlisting/home.ejs", { users, listings, bookings, Revenue });
};

//admin users management 
module.exports.Userhandle = async (req, res) => {
    try {
        const users = await User.find();
        if (!users) {
            req.flash("error", "No users found!");
            return res.redirect("/admin");
        }
        res.render("adminlisting/users.ejs", { users });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

//admin edit User
module.exports.editUser = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);

        if (!user) {
            req.flash("error", "User not found!");
            return res.redirect("/admin/user");
        }

        res.render("adminlisting/edit-user.ejs", { user });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

//admin update user
module.exports.updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, isAdmin } = req.body;

        const updatedUser = await User.findByIdAndUpdate(id, { username, email, isAdmin }, { new: true });

        if (!updatedUser) {
            req.flash("error", "User not found!");
            return res.redirect("/admin/user");
        }

        req.flash("success", "User updated successfully!");
        res.redirect("/admin/user");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

//Delete User
module.exports.deleteUser = async (req, res) => {
    try {
        const { id } = req.params;
        const UserBooing = await Booking.deleteMany({ user: id });
                console.log("Deleted Bookings:", UserBooing);
        const deleteListing = await Listing.deleteMany({owner: id});
        const deleteReview = await Review.deleteMany({Author: id});
        
        const deletedUser = await User.findByIdAndDelete(id);

        if (!deletedUser) {
            req.flash("error", "User not found!");
            return res.redirect("/admin/user");
        }

        req.flash("success", "User deleted successfully!");
        res.redirect("/admin/user");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

//Admin Listing Management
module.exports.listinghandle = async (req, res) => {
    try {
        const listings = await Listing.find();
        const users = await User.find();
        if (!listings || !users) {
            req.flash("error", "No listings found!");
            return res.redirect("/admin");
        }
        res.render("adminlisting/view-listing.ejs", { listings, users });
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

//admin delete Listing
module.exports.deleteList = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBookings = await Booking.deleteMany({ listing: id });
        console.log("Deleted Bookings:", deletedBookings);
        const listing = await Listing.findById(id);
        const deleteReview =  await Review.deleteMany({ id: { $in: listing.reviews } });
        console.log(deleteReview);
        const deletedListing = await Listing.findByIdAndDelete(id);

        if (!deletedListing) {
            req.flash("error", "Listing not found!");
            return res.redirect("/admin/listing");
        }

        req.flash("success", "Listing deleted successfully!");
        res.redirect("/admin/listing");
    } catch (error) {
        res.status(500).send("Internal Server Error");
    }
};

//admin Booking Management
module.exports.handleBooking = async (req, res) => {
    try {
        console.log("Booking route");
        const bookings = await Booking.find().populate("user").populate("listing");
        if (!bookings) {
            req.flash("error", "No bookings found!");
            return res.redirect("/admin");
        }
        res.render("adminlisting/view-booking.ejs", { bookings });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

//admin edit booking
module.exports.editBooking = async (req, res) => {
    try {
        const { id } = req.params;
        const booking = await Booking.findById(id).populate("user").populate("listing");

        if (!booking) {
            req.flash("error", "Booking not found!");
            return res.redirect("/admin/booking");
        }

        res.render("adminlisting/edit-booking.ejs", { booking });
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }
};

//admin update Booking
module.exports.updateBooking = async (req, res) => {
    try {
        const { id } = req.params;

        let { checkin, checkout, roomType, payment } = req.body;
        const updateBooking = await Booking.findByIdAndUpdate(id, { checkin, checkout, roomType, payment });
        if (!updateBooking) {
            req.flash("error", "Booking not found!");
            return res.redirect("/admin/booking");
        }
        req.flash("success", "Booking updated successfully!");
        res.redirect("/admin/booking");
    } catch (err) {
        console.log(err);
        req.flash("error", "Something went wrong!");
        res.redirect("/admin/booking");
    }
};

//admin reviews render
module.exports.reviewHandle = async (req, res) => {
    try {
        const reviews = await Review.find({}).populate('Author');
        if (!reviews) {
            req.flash('error', 'No reviews found!');
            return res.redirect('/admin');
        }
        res.render('adminlisting/review.ejs', { reviews });
    } catch (error) {
        console.error('Error fetching reviews:', error);
        res.status(500).send('Server error');
    }
};

//admin delete review 
module.exports.deletereview = async (req, res) => {
    try {
        const { id } = req.params;
        await Review.findByIdAndDelete(id);
        res.redirect('/admin/review');
    } catch (error) {
        console.error('Error deleting review:', error);
        res.status(500).send('Server error');
    }
};

//admin analytics render
module.exports.adminanalytic = async (req, res) => {
    try {
        const bookings = await Booking.find().populate("user").populate("listing");
        const users = await User.find();
        const listings = await Listing.find();
        if (!bookings || !users || !listings) {
            req.flash("error", "No data found!");
            return res.redirect("/admin");
        }
        let totalRevenue = 0;
        bookings.forEach(booking => {
            totalRevenue += booking.listing.price;
        });
        res.render("adminlisting/analytics.ejs", { bookings, users, listings, totalRevenue });
    } catch (error) {
        console.log(error);
        res.status(500).send("Internal Server Error");
    }
};

//admin analytics setting
module.exports.analyticadmin= async (req, res) => {
    const user = req.user;
    const session = req.session;// Get the logged-in admin user
    res.render("adminlisting/setting.ejs", { user, session });
};

//admin analytics update admin
module.exports.Updateadmin = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.findById(req.user._id);

        if (!user) {
            req.flash("error", "User not found!");
            return res.redirect("/admin/setting");
        }

        user.username = username;
        user.email = email;
        if (password) user.password = password; // Hash before saving (implement hashing)

        await user.save();
        req.flash("success", "Profile updated successfully!");
        res.redirect("/admin/setting");
    } catch (error) {
        console.error(error);
        req.flash("error", "Something went wrong!");
        res.redirect("/admin/setting");
    }
};

//admin delete account
module.exports.deleteadmin = async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.user._id);

        if (!user) {
            req.flash("error", "User not found!");
            return res.redirect("/admin/setting");
        }

        req.flash("success", "Profile deleted successfully!");
        res.redirect("/admin/signup");
    } catch (error) {
        console.error(error);
        req.flash("error", "Something went wrong!");
        res.redirect("/admin/setting");
    }
};