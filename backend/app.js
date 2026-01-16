const express = require("express");
const cors = require("cors");
const authRoutes = require("./routes/auth.routes");
const app = express();
const authMiddleware = require("./middleware/auth.middleware");

app.get("/api/test/protected", authMiddleware, (req, res) => {
  res.json({
    message: "Protected route accessed",
    user: req.user
  });
});

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
app.get("/", (req, res) => {
  res.send("Backend is running");
});

module.exports = app;
