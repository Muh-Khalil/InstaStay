const Listing = require("../models/listing");
const Review = require("../models/review");

// Review controller
module.exports.review = async (req, res, next) => {
    try {
        console.log("ID received:", req.params.id);
        
        let list = await Listing.findById(req.params.id);
        if (!list) {
            req.flash("error", "Listing not found!");
            return res.redirect("/listings");  // Redirect if not found
        }

        let { rating, comment } = req.body;
        console.log("Review:", rating, comment);
        let revs = new Review({
            rating: rating || 3,
            comment: comment,
            Author: req.user._id
        });

        list.reviews.push(revs);
        await revs.save();
        await list.save();
        console.log("Review Added:", rating, comment);

        req.flash("success", "Review Added!");
        res.redirect(`/listings/${req.params.id}`);
    } catch (error) {
        console.error("Error:", error);
        next(error); 
    }
};

// Delete review controller
module.exports.deletereview = async (req, res) => {
    try {
        let { id, reviewId } = req.params;
        await Listing.findByIdAndUpdate(id, { $pull: { reviews: reviewId } });
        await Review.findByIdAndDelete(reviewId);
        //flash review deleted
        req.flash("success", "Review Deleted!");

        res.redirect(`/listings/${id}`);
    } catch (err) {
        next(err);
    }
};