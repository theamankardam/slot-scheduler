const express = require("express");
const app = express();
const db = require("./db/db");
const auth = require('./middlewares/authMiddleware')

require("dotenv").config();
const PORT = process.env.PORT || 8000;
app.use(express.json());

app.get("/", (req, res) => res.send(`Server is running`));


// Routes
const authRoute = require("./routes/authRotue");
app.use("/", authRoute);

const eventsRoute = require('./routes/eventsRoute');
app.use("/api/events", eventsRoute);


const swapRequestsRoute = require('./routes/swapRequestsRoute');
app.use('/api',swapRequestsRoute);


app.listen(PORT, (req, res) => console.log(`Server is listening on ${PORT}`));
