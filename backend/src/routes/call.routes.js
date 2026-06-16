import express from "express";
import { Call } from "../models/Call.js";
import { protectRoute } from "../middleware/auth.middleware.js";

const router = express.Router();

// Get call logs between current user and another user
router.get("/:userId", protectRoute, async (req, res) => {
  try {
    const currentUserId = req.user._id;
    const otherUserId = req.params.userId;

    const callLogs = await Call.find({
      $or: [
        { callerId: currentUserId, receiverId: otherUserId },
        { callerId: otherUserId, receiverId: currentUserId }
      ]
    })
    .sort({ createdAt: -1 })
    .limit(50)
    .populate("callerId", "fullName profilePic")
    .populate("receiverId", "fullName profilePic");

    res.json(callLogs);
  } catch (error) {
    console.error("Error fetching call logs:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// Get recent call logs for current user
router.get("/recent/all", protectRoute, async (req, res) => {
  try {
    const currentUserId = req.user._id;

    const callLogs = await Call.find({
      $or: [
        { callerId: currentUserId },
        { receiverId: currentUserId }
      ]
    })
    .sort({ createdAt: -1 })
    .limit(30)
    .populate("callerId", "fullName profilePic")
    .populate("receiverId", "fullName profilePic");

    res.json(callLogs);
  } catch (error) {
    console.error("Error fetching recent calls:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;