const router = require("express").Router();
const { fetchAllEvents, fetchEventsByStatus, createEvent, updateEventById, deleteEventById } = require("../controllers/EventsController");
const authMiddleware = require('../middlewares/authMiddleware');
router.use(authMiddleware);

router.get("/", fetchAllEvents);
router.get("/:status", fetchEventsByStatus);
router.post("/", createEvent);
router.put("/:id", updateEventById);
router.delete("/:id", deleteEventById);

module.exports = router;
