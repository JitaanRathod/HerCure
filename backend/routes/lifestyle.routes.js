const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware"); // adjust if needed
const {
  addEntry,
  getByDay,
  getLatest
} = require("../controllers/lifestyle.controller");

router.post("/", authMiddleware, addEntry);
router.get("/day", authMiddleware, getByDay);
router.get("/latest", authMiddleware, getLatest);

module.exports = router;
