const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    accountType: { type: String, enum: ["shark", "pitcher"], required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);