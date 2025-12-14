const router = require("express").Router();
const { fetchAllSwappableSlots } = require("../controllers/SwapRequestsController");
const authMiddleware = require('../middlewares/authMiddleware');
router.use(authMiddleware);




// router.get('/swappable-slots', (req,res) => res.send("ehllo"));
router.get('/swappable-slots', fetchAllSwappableSlots);


// // router.post('/swap-request');
// // router.post('/swap-response');



module.exports = router;