const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const {
  saveCycle,
  getLatestCycle
} = require("../controllers/cycle.controller");

router.post("/", authMiddleware, saveCycle);
router.get("/latest", authMiddleware, getLatestCycle);

module.exports = router;
