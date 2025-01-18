const mongoose = require("mongoose");

const pitcherSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    companyName: { type: String, required: true },
    companyDescription: { type: String },
    pitchVideoUrl: { type: String },
    // Additional fields as needed
  },
  { timestamps: true }
);

module.exports = mongoose.model("Pitcher", pitcherSchema);