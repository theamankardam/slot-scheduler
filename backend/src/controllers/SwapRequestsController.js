const Events = require('../models/Events');
const SwapRequests = require("../models/SwapRequests");

const fetchAllSwappableSlots = async (req, res) => {
    try {
        const { userId } = req.user;
        const swappableEvents = await Events.find({
            user: { $ne: userId },
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


const swapRequest = async (req, res) => {
    try {
        const { mySlotId, theirSlotId } = req.body;
        const { userId } = req.user;

        const mySlot = await Events.findById(mySlotId);
        const theirSlot = await Events.findById(theirSlotId);



        if (!mySlot || !theirSlot) {
            return res.status(403).json({
                success: false,
                message: "One or both slots not found"
            });
        }


        if (theirSlot.user.toString() === userId) {
            return res.status(400).json({
                success: false,
                message: "Cannot swap with your own slot"
            })
        }


        if (
            mySlot.status !== "SWAPPABLE" ||
            theirSlot.status !== "SWAPPABLE"
        ) {
            return res.status(400).json({
                success: false,
                message: "Both slots must be swappable"
            });
        }


        const swapRequest = await SwapRequests.create({
            requester: userId,
            receiver: theirSlot.user,
            mySlot: mySlotId,
            theirSlot: theirSlotId
        })


        mySlot.status = "SWAP_PENDING";
        theirSlot.status = "SWAP_PENDING";

        await mySlot.save();
        await theirSlot.save();

        return res.status(201).json({
            success: true,
            message: "Swap request sent  successfully",
            swapRequest
        })



    } catch (error) {
        console.log(`Error Sending a swap-request : `, error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }

}



// const swapResponse = async (req, res) => {
//     try {

//     } catch (error) {

//     }

// }


module.exports = { fetchAllSwappableSlots, swapRequest }