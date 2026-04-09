const mongoose = require("mongoose");
const Review = require("./review.js");

const roomSchema = new mongoose.Schema({
    hotel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "List", // Refers to the Listing (Hotel) model
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: String,
    roomType: {
        type: String, // e.g., 'Deluxe King', 'Suite', 'Family Room'
        required: true
    },
    capacity: {
        type: Number,
        required: true,
        default: 2
    },
    price: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: ["Available", "Booked", "Maintenance"],
        default: "Available"
    },
    images: [{
        filename: String,
        url: String
    }],
    reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ]
});

// Delete MiddleWare in case a room is deleted, delete its reviews
roomSchema.post("findOneAndDelete", async (room) => {
    if (room && room.reviews.length) {
        await Review.deleteMany({ _id: { $in: room.reviews } });
    }
});

module.exports = mongoose.model("Room", roomSchema);
