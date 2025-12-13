const jwt = require("jsonwebtoken");
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader) {
            return res.status(401).json({
                success: false,
                message: "Authorization token missing or invalid",
            });
        }
        const token = authHeader.split(" ")[1];
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        req.user = decodedToken;
        next();
    } catch (error) {
        return res.status(401).json({
            success: false,
            message: "Token expired or invalid",
        });
    }
};

module.exports = authMiddleware;
