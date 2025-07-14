const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const dotenv = require("dotenv");
const http = require("http");
const { Server } = require("socket.io");
const path = require("path");

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan("dev"));

app.use("/recordings", express.static(path.join(__dirname, "recordings")));

app.get("/", (req, res) => {
  res.send("Live Device Monitoring API");
});

// Import and use routes here
const recordingsRoutes = require("./routes/recordings");
app.use("/api/recordings", recordingsRoutes);

// WebSocket setup
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: process.env.frontendUrl || "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

// WebSocket logic
require("./socket/deviceSocket")(io);

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
