require("dotenv").config();
const mongoose = require("mongoose");
const mongoURL = process.env.MONGODB_URL;

mongoose
  .connect(mongoURL)
  .then(() => {
    console.log("MongoDB Connected...");
  })
  .catch((err) => {
    console.log(`MongoDB Connection Error`);
  });
