const Events = require('../models/Events');

const fetchAllSwappableSlots = async (req, res) => {
    try {
        const { userId } = req.user;
        const swappableEvents = await Events.find({
            user: { $ne: userId }, // exclude current user's events
            status: "SWAPPABLE"
        });

        return res.status(200).json({
            success: true,
            messages: "Swappable-slots fetched successfully",
            events: swappableEvents,
            count: swappableEvents.length
        })


    } catch (error) {
        console.log(`Error Fetching Swappable-slots : `, error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }

}

module.exports = { fetchAllSwappableSlots }