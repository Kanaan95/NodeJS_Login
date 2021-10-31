/**
 * @file    MongoDB Connect
 */

const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.DB_CONNECT, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected...");
  } catch (err) {
    console.error("Error: ", err.message);
    // Exit process with failire
    process.exit(1);
  }
};

const closeDB = async () => {
  try {
    await mongoose.connection.close();
    console.log("Closing DB Connection");
  } catch (err) {
    console.error("Error: ", err.message);
    // Exit process with failire
    process.exit(1);
  }
};

module.exports = { connectDB, closeDB };
