const mongoose = require("mongoose");

const sharkSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    name: { type: String, required: true },
    bio: { type: String },
    bookmarkedCompanies: [{ type: mongoose.Schema.Types.ObjectId, ref: "Pitcher" }]
    // Additional fields as needed
  },
  { timestamps: true }
);

module.exports = mongoose.model("Shark", sharkSchema);