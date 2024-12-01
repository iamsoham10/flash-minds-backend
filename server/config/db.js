const mongoose = require("mongoose");
require("dotenv").config();

const connectToDB = async () => {
  try {
    await mongoose.connect(process.env.DB_URI, {
      dbName: "cards",
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.log("MongoDB connection failed:", err);
    process.exit(1);
  }
};

module.exports = connectToDB;
