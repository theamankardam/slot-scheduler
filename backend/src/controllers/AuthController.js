require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const SECRET_KEY = process.env.SECRET_KEY;

const signup = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({
                success: false,
                message: "user already exist. Please login"
            })
        }

        const newUser = new User({ username, email, password });
        const response = await newUser.save(); // change this line to only await newUser.save()

        return res.status(201).json({
            success: true,
            message: `User registered Succesfully`,
            User: response // remove this line after app done
        });
    } catch (error) {
        console.log(`SignUp Error: `, error); // remove this line after app done
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}



const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                error: "User Not Found"
            });
        }

        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                error: "Invalid credentials"
            });
        }

        const token = jwt.sign(
            { userId: user._id },
            SECRET_KEY,
            { expiresIn: "24h" }
        );

        res.status(200).json({
            success: true,
            message: "Login successful!",
            token: token
        });
    } catch (error) {
        console.log("Login error:", error);
        res.status(500).json({
            success: false,
            error: "Internal Server Error"
        });
    }
}


module.exports = { signup, login }