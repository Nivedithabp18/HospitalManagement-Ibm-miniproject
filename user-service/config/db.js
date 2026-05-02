const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("User Service: MongoDB connected");
  } catch (err) {
    console.error("User Service DB error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
