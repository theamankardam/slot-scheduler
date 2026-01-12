const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const db = require("./db/db");


const allowedOrigins = [
  "https://jazzy-fenglisu-86af18.netlify.app",
  "http://localhost:3000",
  "http://localhost:5173"
];


app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (Postman, mobile apps)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
  })
);


app.options("*", cors());

app.use(express.json());

// ===== ROUTES =====
const authRoute = require("./routes/authRotue");
const eventsRoute = require("./routes/eventsRoute");
const swapRequestsRoute = require("./routes/swapRequestsRoute");

app.get("/", (req, res) => {
  res.status(200).send("Backend API is running 🚀");
});

app.use("/api/auth", authRoute);
app.use("/api/events", eventsRoute);
app.use("/api", swapRequestsRoute);

module.exports = app;







