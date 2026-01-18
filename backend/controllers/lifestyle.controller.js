const Lifestyle = require("../models/Lifestyle");

/**
 * POST /api/lifestyle
 * Add a lifestyle/symptom entry
 */


exports.addEntry = async (req, res) => {
  try {
    const userId = req.user.userId;

    const { type, timestamp, data } = req.body;

    if (!type || !timestamp || !data) {
      return res.status(400).json({ message: "Required fields missing" });
    }

    // Type-specific validation
    if (type === "sleep" && data.sleepHours === undefined) {
      return res.status(400).json({ message: "sleepHours required" });
    }

    if (type === "mood" && !["bad", "okay", "good"].includes(data.mood)) {
      return res.status(400).json({ message: "Invalid mood value" });
    }

    if (type === "activity" && data.activityMinutes === undefined) {
      return res.status(400).json({ message: "activityMinutes required" });
    }

    if (type === "symptom") {
      if (!data.symptom || data.severity === undefined) {
        return res.status(400).json({ message: "symptom and severity required" });
      }
    }

    if (type === "note" && !data.note) {
      return res.status(400).json({ message: "note required" });
    }

    await Lifestyle.create({
      user: userId,
      type,
      timestamp,
      data
    });

    res.status(201).json({ message: "Entry saved successfully" });

  } catch (error) {
    console.error("Lifestyle Entry Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/lifestyle/day?date=YYYY-MM-DD
 * Fetch all entries for a specific day
 */
exports.getByDay = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ message: "Date query is required" });
    }

    const start = new Date(date);
    const end = new Date(date);
    end.setDate(end.getDate() + 1);

    const entries = await Lifestyle.find({
      user: userId,
      timestamp: { $gte: start, $lt: end }
    }).sort({ timestamp: 1 });

    res.json(entries);

  } catch (error) {
    console.error("Lifestyle Day Fetch Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

/**
 * GET /api/lifestyle/latest
 * Fetch most recent entry
 */
exports.getLatest = async (req, res) => {
  try {
    const userId = req.user.userId;
    const entry = await Lifestyle.findOne({ user: userId })
      .sort({ timestamp: -1 });

    if (!entry) {
      return res.status(404).json({ message: "No lifestyle data found" });
    }

    res.json(entry);

  } catch (error) {
    console.error("Lifestyle Latest Fetch Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
