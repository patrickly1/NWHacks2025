// controllers/pitcherController.js
const Pitcher = require("../models/Pitcher");
const Message = require("../models/Message");

exports.updatePitcherProfile = async (req, res) => {
  try {
    const userId = req.user.userId;
    const { companyName, companyDescription, pitchVideoUrl } = req.body;

    // Update pitcher info
    const updatedPitcher = await Pitcher.findOneAndUpdate(
      { userId },
      { companyName, companyDescription, pitchVideoUrl },
      { new: true }
    );

    res.json(updatedPitcher);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.getInbox = async (req, res) => {
  try {
    const userId = req.user.userId;
    // Find all messages where the recipient is the pitcher
    const messages = await Message.find({ recipientId: userId })
      .populate("senderId", "username email")
      .sort({ createdAt: -1 });

    res.json(messages);
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};

exports.respondToMessage = async (req, res) => {
  try {
    const { messageId } = req.params;
    const { action } = req.body; // "accept" or "delete"

    const message = await Message.findById(messageId);
    if (!message) return res.status(404).json({ msg: "Message not found" });

    if (action === "accept") {
      message.status = "accepted";
    } else if (action === "delete") {
      message.status = "deleted";
    }
    await message.save();

    res.json({ msg: `Message ${action}ed successfully` });
  } catch (error) {
    res.status(500).json({ msg: "Server error" });
  }
};