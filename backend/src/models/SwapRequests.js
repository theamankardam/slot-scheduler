const mongoose = require("mongoose");

const swapRequestSchema = new mongoose.Schema({
    requester: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    mySlot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Events",
        required: true
    },
    theirSlot: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Events",
        required: true
    },
    status: {
        type: String,
        enum: ["PENDING", "ACCEPTED", "REJECTED"],
        default: "PENDING"
    }

}, { timestamps: true })


const SwapRequest = mongoose.model("SwapRequest", swapRequestSchema);
module.exports = SwapRequest;