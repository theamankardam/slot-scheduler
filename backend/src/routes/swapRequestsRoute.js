const router = require("express").Router();
const { fetchAllSwappableSlots, swapRequest, swapResponse } = require("../controllers/SwapRequestsController");
const authMiddleware = require('../middlewares/authMiddleware');
router.use(authMiddleware);


router.get('/swappable-slots', fetchAllSwappableSlots);
router.post('/swap-request', swapRequest);
router.post('/swap-response/:requestId', swapResponse);


module.exports = router;



