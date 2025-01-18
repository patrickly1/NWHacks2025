// routes/pitcherRoutes.js
const express = require("express");
const router = express.Router();
const { updatePitcherProfile, getInbox, respondToMessage } = require("../controllers/pitcherController");
const authMiddleware = require("../middleware/authMiddleware");

router.put("/update", authMiddleware, updatePitcherProfile);
router.get("/inbox", authMiddleware, getInbox);
router.post("/respond/:messageId", authMiddleware, respondToMessage);

module.exports = router;