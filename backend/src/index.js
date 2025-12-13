const express = require("express");
const app = express();
const db = require("./db/db");

require("dotenv").config();
const PORT = process.env.PORT || 8000;
app.use(express.json());

app.get("/", (req, res) => res.send(`Server is running`));

// Routes
const authRoute = require("./routes/authRotue");

app.use("/", authRoute);

app.listen(PORT, (req, res) => console.log(`Server is listening on ${PORT}`));
