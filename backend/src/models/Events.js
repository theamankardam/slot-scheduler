const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    startTime: {
        type: String,
        required: true
    },
    endTime: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["BUSY", "SWAPPABLE", "SWAP_PENDING"],
        default: "BUSY",
    },
    day: {
        type: String,
        enum: ["Mon", "Tue", "Wed", "Thu", "Fri"],
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

}, { timestamps: true })

const Events = mongoose.model("Events", eventSchema);
module.exports = Events;