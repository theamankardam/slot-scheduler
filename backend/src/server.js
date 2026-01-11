const express = require("express");
const cors = require("cors");
const app = express();

require("dotenv").config();
const db = require("./db/db");
const auth = require('./middlewares/authMiddleware')

const PORT = process.env.PORT || 8000;
app.use(
  cors({
    origin: [
      process.env.CLIENT_URL,
      "http://localhost:5173",
    ],
    credentials: true,
  })
)
app.use(express.json());


// Routes
const authRoute = require("./routes/authRotue");
const eventsRoute = require('./routes/eventsRoute');
const swapRequestsRoute = require('./routes/swapRequestsRoute');
app.use("/api", authRoute);
app.use("/api/events", eventsRoute);
app.use('/api', swapRequestsRoute);


module.exports = app;
