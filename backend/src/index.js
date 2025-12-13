const express = require("express");
const app = express();
const db = require("./db/db");
const auth = require('./middlewares/authMiddleware')

require("dotenv").config();
const PORT = process.env.PORT || 8000;
app.use(express.json());

app.get("/", (req, res) => res.send(`Server is running`));


app.get("/check", auth, (req, res) => res.send("Middleware successfully working"));





// Routes
const authRoute = require("./routes/authRotue");
app.use("/", authRoute);

app.listen(PORT, (req, res) => console.log(`Server is listening on ${PORT}`));
