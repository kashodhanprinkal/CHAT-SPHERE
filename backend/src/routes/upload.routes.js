import express from "express";
import cloudinary from "../lib/cloudinary.js";
import { uploadVoice } from "../middleware/uploadVoice.js";
import fs from "fs";

const router = express.Router();

router.post("/voice", uploadVoice.single("voice"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No voice file uploaded" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "raw",   // ✅ FIXED
      folder: "voice-notes",
    });

    fs.unlinkSync(req.file.path);

    res.status(200).json({
      voiceUrl: result.secure_url,
    });

  } catch (error) {
    console.log("Voice upload error:", error);

    res.status(500).json({
      message: "Voice upload failed",
    });
  }
});

export default router;