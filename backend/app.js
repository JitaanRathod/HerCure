const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const app = express();
const authMiddleware = require("./middleware/auth.middleware");

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Backend is running");
});

module.exports = app;
