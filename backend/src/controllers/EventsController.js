const Events = require('../models/Events');

const createEvent = async (req, res) => {
    try {
        const eventData = req.body;
        const { userId } = req.user;
        const newEvent = new Events({
            ...eventData,
            user: userId
        });

        const savedEvent = await newEvent.save();

        return res.status(201).json({
            success: true,
            message: "Event Created successfully",
            event: savedEvent
        })

    } catch (error) {
        console.log(`Error Creating a Event : `, error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


const fetchAllEvents = async (req, res) => {
    try {
        const { userId } = req.user;
        const userEvents = await Events.find({ user: userId });

        return res.status(200).json({
            success: true,
            message: "Events fetched successfully",
            events: userEvents,
            count: userEvents.length
        })

    } catch (error) {
        console.log(`Error Fetching Events : `, error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}



const fetchEventsByStatus = async (req, res) => {
    try {
        const { status } = req.params;
        const { userId } = req.user;
        const allowedStatus = ["BUSY", "SWAPPABLE", "SWAP_PENDING"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status.Allowed values: BUSY, SWAPPABLE, SWAP_PENDING"
            })
        }

        const userEvents = await Events.find({ status: status, user: userId });

        return res.status(200).json({
            success: true,
            message: "Events fetched successfully",
            events: userEvents,
            count: userEvents.length
        })

    } catch (error) {
        console.log(`Error Fetching Events : `, error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


const updateEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.user;
        const updatedEvent = await Events.findOneAndUpdate(
            { _id: id, user: userId },
            req.body,
            {
                new: true,
                runValidators: true
            }
        )

        if (!updatedEvent) {
            return res.status(403).json({
                success: false,
                message: "Access denied or event not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Events Updated successfully",
            event: updatedEvent
        })

    } catch (error) {
        console.log(`Error Updating Events : `, error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}


const deleteEventById = async (req, res) => {
    try {
        const { id } = req.params;
        const { userId } = req.user;
        const deletedEvent = await Events.findOneAndDelete({
            _id: id,
            user: userId
        });

        if (!deletedEvent) {
            return res.status(404).json({
                success: false,
                message: "Access denied or event not found"
            })
        }

        res.status(200).json({
            success: true,
            message: "Item Deleted Successfully"
        })



    } catch (error) {

        console.log(`Error Deleting Events : `, error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}




module.exports = {
    createEvent,
    fetchAllEvents,
    fetchEventsByStatus,
    updateEventById,
    deleteEventById
}