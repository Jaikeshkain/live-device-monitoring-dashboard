// Entry point for the backend server
const express = require("express");
const morgan =require("morgan");
const cors = require("cors");
const dotenv = require("dotenv");

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(morgan("dev")); // Logging middleware
app.use(cors()); // Enable CORS for all routes

// Basic route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Start server
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
