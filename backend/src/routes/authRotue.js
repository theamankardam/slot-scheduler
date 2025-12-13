require("dotenv").config();
const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const SECRET_KEY = process.env.SECRET_KEY;

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newUser = new User(data);
    const response = await newUser.save();
    res
      .status(200)
      .json({ message: `Person Signed Up Succesfully!!`, User: response });
  } catch (error) {
    console.log(`Error SignUp Person`, error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find the user
    const user = await User.findOne({ email });
    if (!user) return  res.status(404).json({ error: "User Not Found!" });

    console.log(user);

    // Compare password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(401).json({ error: "Invalid passoword" });

    // Generate token
    const token = jwt.sign(
      { id: user._id, email: user.email },
      SECRET_KEY,
      { expiresIn: "24h" }
    );

    res.status(200).json({ message: "Login successful!", token: token });
  } catch (error) {
    console.log("Login error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
