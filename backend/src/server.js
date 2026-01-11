const express = require("express");
const cors = require("cors");
require("dotenv").config();

const app = express();
const db = require("./db/db");

app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      "http://localhost:5173",
    ],
    credentials: true,
  })
);

app.use(express.json());

// ===== ROUTES =====
const authRoute = require("./routes/authRoute");
const eventsRoute = require("./routes/eventsRoute");
const swapRequestsRoute = require("./routes/swapRequestsRoute");

app.get("/", (req, res) => {
  res.status(200).send("Backend API is running 🚀");
});

app.use("/api/auth", authRoute);
app.use("/api/events", eventsRoute);
app.use("/api", swapRequestsRoute);

module.exports = app;
