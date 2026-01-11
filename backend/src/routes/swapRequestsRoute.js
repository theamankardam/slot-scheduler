const router = require("express").Router();
const { fetchAllSwappableSlots, swapRequest, swapResponse, fetchMySwapRequests, fetchtheirSwapRequests } = require("../controllers/SwapRequestsController");
const authMiddleware = require('../middlewares/authMiddleware');
router.use(authMiddleware);


router.get('/swappable-slots', fetchAllSwappableSlots);
router.post('/swap-request', swapRequest);
router.get("/myswap-requests", fetchMySwapRequests);
router.get("/theirswap-requests", fetchtheirSwapRequests);
router.post('/swap-response/:requestId', swapResponse);


module.exports = router;



