const Events = require('../models/Events');
const SwapRequests = require("../models/SwapRequests");

const fetchAllSwappableSlots = async (req, res) => {
    try {
        const { userId } = req.user;
        const swappableEvents = await Events.find({
            user: { $ne: userId },
            status: "SWAPPABLE"
        }).populate("user", "username");

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


const fetchMySwapRequests = async (req, res) => {
    try {
        const { userId } = req.user;

        const requests = await SwapRequests.find({
            requester: userId, 
        })
            .populate("mySlot")
            .populate("theirSlot")
            .populate("receiver", "username");

        return res.status(200).json({
            success: true,
            requests,
            count: requests.length
        });

    } catch (error) {
        console.log("Error fetching notifications:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


const fetchtheirSwapRequests = async (req, res) => {
    try {
        const { userId } = req.user;

        const requests = await SwapRequests.find({
            receiver: userId,
            status: "PENDING"
        })
            .populate("mySlot")
            .populate("theirSlot")
            .populate("requester", "username");

        return res.status(200).json({
            success: true,
            requests,
            count: requests.length
        });

    } catch (error) {
        console.log("Error fetching notifications:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};


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



const swapResponse = async (req, res) => {
    try {
        const { requestId } = req.params;
        const { accept } = req.body || {};
        const { userId } = req.user;


        if (typeof accept !== "boolean") {
            return res.status(400).json({
                success: false,
                message: "accept field must be true or false"
            });
        }


        // Populate converts referenced slot ObjectIds into full Event documents
        const request = await SwapRequests.findById(requestId)
            .populate('mySlot')
            .populate('theirSlot');

        if (!request) {
            return res.status(404).json({
                success: false,
                message: "Swap request not found"
            });
        }

        // Only receiver can respond
        if (request.receiver.toString() !== userId) {
            return res.status(403).json({
                success: false,
                message: "Unauthorized action"
            });
        }

        const mySlot = request.mySlot;
        const theirSlot = request.theirSlot;

        // Rejection flow
        if (!accept) {
            request.status = "REJECTED";
            mySlot.status = "SWAPPABLE";
            theirSlot.status = "SWAPPABLE";

            await Promise.all([
                request.save(),
                mySlot.save(),
                theirSlot.save()
            ]);

            return res.status(200).json({
                success: true,
                message: "Swap request rejected"
            });
        }

        // Acceptance flow 
        const tempOwner = mySlot.user;
        mySlot.user = theirSlot.user;
        theirSlot.user = tempOwner;

        mySlot.status = "BUSY";
        theirSlot.status = "BUSY";
        request.status = "ACCEPTED";

        await Promise.all([
            mySlot.save(),
            theirSlot.save(),
            request.save()
        ]);

        return res.status(200).json({
            success: true,
            message: "Swap completed successfully"
        });

    } catch (error) {
        console.log("Error responding to swap:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        });
    }
};

module.exports = { fetchAllSwappableSlots, swapRequest, swapResponse, fetchMySwapRequests, fetchtheirSwapRequests }