const { signup, login, getCurrentUser } = require("../controllers/AuthController");
const authMiddleware = require("../middlewares/authMiddleware");
const router = require("express").Router();


router.post("/signup", signup)
router.post("/login", login)
router.get("/currentUser", authMiddleware, getCurrentUser);

module.exports = router;
