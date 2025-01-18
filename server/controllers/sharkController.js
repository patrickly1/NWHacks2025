// controllers/sharkController.js
const Shark = require("../models/Shark");
const Pitcher = require("../models/Pitcher");
const Message = require("../models/Message");
const User = require("../models/User");

exports.getPitchers = async (req, res) => {
  try {
    // For TikTok-like functionality, you might provide a random or sequential pitcher
    // For simplicity, let's just return all. In practice, you'd handle infinite scrolling or pagination.
    const pitchers = await Pitcher.find().populate("userId", "username email");
    res.json(pitchers);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.bookmarkPitcher = async (req, res) => {
  try {
    const sharkUserId = req.user.userId; // from auth middleware
    const { pitcherId } = req.params;

    // Find the Shark document
    let shark = await Shark.findOne({ userId: sharkUserId });
    if (!shark) return res.status(404).json({ msg: "Shark profile not found" });

    // Add the pitcher to the bookmarkedCompanies array if not already in it
    if (!shark.bookmarkedCompanies.includes(pitcherId)) {
      shark.bookmarkedCompanies.push(pitcherId);
      await shark.save();
    }

    res.json({ msg: "Pitcher bookmarked successfully" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.sendMessageRequest = async (req, res) => {
  try {
    const sharkUserId = req.user.userId;
    const { pitcherId } = req.params;
    const { content } = req.body;

    // Find the pitcher’s User record
    const pitcher = await Pitcher.findById(pitcherId);
    if (!pitcher) return res.status(404).json({ msg: "Pitcher not found" });

    const pitcherUserId = pitcher.userId;

    // Create a message
    const newMessage = new Message({
      senderId: sharkUserId,
      recipientId: pitcherUserId,
      content,
      status: "pending"
    });

    await newMessage.save();
    res.json({ msg: "Message request sent" });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};