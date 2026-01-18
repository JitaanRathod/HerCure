const mongoose = require("mongoose");

const lifestyleSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    type: {
      type: String,
      enum: ["sleep", "mood", "activity", "symptom", "note"],
      required: true
    },

    timestamp: {
      type: Date,
      required: true
    },

    data: {
      sleepHours: {
        type: Number,
        min: 0,
        max: 24
      },

      mood: {
        type: String,
        enum: ["bad", "okay", "good"]
      },

      activityMinutes: {
        type: Number,
        min: 0,
        max: 1440
      },

      symptom: {
        type: String,
        trim: true
      },

      severity: {
        type: Number,
        min: 1,
        max: 5
      },

      note: {
        type: String,
        trim: true
      }
    }
  },
  { timestamps: true }
);

// For fast timeline queries
lifestyleSchema.index({ user: 1, timestamp: 1 });

module.exports = mongoose.model("Lifestyle", lifestyleSchema);
