const Cycle = require("../models/Cycle");

// POST /api/cycle
exports.saveCycle = async (req, res) => {
  try {
    const userId = req.user.id;

    const { lastPeriodDate, cycleLength, periodDuration } = req.body;

    if (!lastPeriodDate || !cycleLength || !periodDuration) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (cycleLength < 21 || cycleLength > 35) {
      return res.status(400).json({ message: "Invalid cycle length" });
    }

    if (periodDuration < 3 || periodDuration > 7) {
      return res.status(400).json({ message: "Invalid period duration" });
    }

    await Cycle.findOneAndUpdate(
      { user: userId },
      {
        user: userId,
        lastPeriodDate,
        cycleLength,
        periodDuration
      },
      { upsert: true, new: true }
    );

    res.json({ message: "Cycle data saved successfully" });

  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
// GET /api/cycle/latest
exports.getLatestCycle = async (req, res) => {
  try {
    const userId = req.user.id;

    const cycle = await Cycle.findOne({ user: userId }).select(
      "lastPeriodDate cycleLength periodDuration"
    );

    if (!cycle) {
      return res.status(404).json({ message: "No cycle data found" });
    }

    res.json(cycle);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
