const Events = require('../models/Events');

const createEvent = async (req, res) => {
    try {
        const eventData = req.body;
        const newEvent = new Events(eventData);
        const savedEvent = await newEvent.save();

        return res.status(201).json({
            success: true,
            message: "Event Created successfully",
            EventData: savedEvent
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
        const events = await Events.find();

        return res.status(200).json({
            success: true,
            message: "Events fetched successfully",
            events: events,
            count: events.length
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
        const allowedStatus = ["BUSY", "SWAPPABLE", "SWAP_PENDING"];
        if (!allowedStatus.includes(status)) {
            return res.status(400).json({
                success: false,
                message: "Invalid status.Allowed values: BUSY, SWAPPABLE, SWAP_PENDING"
            })
        }

        const events = await Events.find({ status: status });

        return res.status(200).json({
            success: true,
            message: "Events fetched successfully",
            events: events,
            count: events.length
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
        const updatedEvent = await Events.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
                runValidators: true
            }
        )

        if (!updatedEvent) {
            return res.status(404).json({
                success: false,
                message: "Event not Found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Events Updated successfully",
            UpdatedEvent: updatedEvent
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
        const response = await Events.findByIdAndDelete(id);
        if (!response) {
            return res.status(404).json({
                success: false,
                message: "Event Not Found"
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