const express = require("express");
const app = express();

require("dotenv").config();
const db = require("./db/db");
const auth = require('./middlewares/authMiddleware')

const PORT = process.env.PORT || 8000;
app.use(express.json());


// Routes
const authRoute = require("./routes/authRotue");
const eventsRoute = require('./routes/eventsRoute');
const swapRequestsRoute = require('./routes/swapRequestsRoute');
app.use("/", authRoute);
app.use("/api/events", eventsRoute);
app.use('/api', swapRequestsRoute);


app.listen(PORT, (req, res) => console.log(`Server is listening on ${PORT}`));
