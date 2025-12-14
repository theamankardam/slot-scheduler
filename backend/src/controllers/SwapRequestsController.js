const Events = require('../models/Events');



const fetchAllSwappableSlots = async (req, res) => {
    try {
        const { userId } = req.user;
        res.send(userId)


    } catch (error) {
        console.log(`Error Fetching Swappable-slots : `, error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }

}

module.exports ={ fetchAllSwappableSlots}