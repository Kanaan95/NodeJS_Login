const express = require("express");
const app = express();
const { connectDB, closeDB } = require("./config/db");
const dotenv = require("dotenv");
const cors = require("cors");
const auth = require("./middleware/auth");

// Dotenv
dotenv.config();

// Connect to DB
connectDB();

// CORS
app.use(
  cors({
    origin: "http://localhost:4200",
  })
);

// Import routes
const authRoute = require("./routes/auth");
const postRoute = require("./routes/post");
const userRoute = require("./routes/users");
const testRoute = require("./routes/test-api");

// Middlewares
app.use(express.json());
app.use("/api/auth", authRoute);
app.use("/api/posts", postRoute);
app.use("/api/users", userRoute);
app.use("/api/test", testRoute);

const server = app.listen(3000, () => {
  console.log("Server up and running");
});

server.on("close", () => {
  closeDB();
});

// For testing
module.exports = server;
