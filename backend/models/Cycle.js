const mongoose = require("mongoose");

const cycleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
      unique: true
    },
    lastPeriodDate: {
      type: Date,
      required: true
    },
    cycleLength: {
      type: Number,
      required: true,
      min: 21,
      max: 35
    },
    periodDuration: {
      type: Number,
      required: true,
      min: 3,
      max: 7
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cycle", cycleSchema);
