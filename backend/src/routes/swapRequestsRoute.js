const router = require("express").Router();
const { fetchAllSwappableSlots } = require("../controllers/SwapRequestsController");
const authMiddleware = require('../middlewares/authMiddleware');
router.use(authMiddleware);




// router.get('/swappable-slots', (req,res) => res.send("ehllo"));
router.get('/swappable-slots', fetchAllSwappableSlots);


// // router.post('/swap-request');
// // router.post('/swap-response');



module.exports = router;



// aman token

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTNlOTJhMTEzYTdlOWVhMzJmMDEyN2MiLCJpYXQiOjE3NjU3MDg0NjksImV4cCI6MTc2NTc5NDg2OX0.bUvWQ5AIxEV08M_Efx3ee-JFThfTRD29r3oSRMNnVd0

// amit token

// eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2OTNlOTM4ZmNjNjcwZmYwYzQzN2JhOTAiLCJpYXQiOjE3NjU3MDg3MDIsImV4cCI6MTc2NTc5NTEwMn0.0r1i9Bu05L-kLq_MCBm8bQRS_vX2PfpkP98wJClMmiE