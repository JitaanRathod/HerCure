const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const app = express();
const authMiddleware = require("./middleware/auth.middleware");
const cycleRoutes = require("./routes/cycle.routes");
app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/cycle", cycleRoutes);
app.get("/", (req, res) => {
  res.send("Backend is running");
});

module.exports = app;
