// routes/sharkRoutes.js
const express = require("express");
const router = express.Router();
const { getPitchers, bookmarkPitcher, sendMessageRequest } = require("../controllers/sharkController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/pitchers", authMiddleware, getPitchers);
router.post("/bookmark/:pitcherId", authMiddleware, bookmarkPitcher);
router.post("/message/:pitcherId", authMiddleware, sendMessageRequest);

module.exports = router;