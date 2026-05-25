import multer from "multer";
import fs from "fs";

// Create uploads folder if it doesn't exist
const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure where and how to save audio files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);  // Save to "uploads" folder
  },
  filename: (req, file, cb) => {
    // Create unique filename: voice-1734567890-123456.mp3
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, "voice-" + uniqueSuffix + ".mp3");
  }
});

// Only allow audio files
const fileFilter = (req, file, cb) => {
  const allowedAudioTypes = ['audio/mpeg', 'audio/mp3', 'audio/wav', 'audio/webm'];
  
  if (allowedAudioTypes.includes(file.mimetype)) {
    cb(null, true);  // Accept this file
  } else {
    cb(new Error("Only audio files are allowed"), false);  // Reject
  }
};

// Create the multer upload middleware
export const uploadVoice = multer({ 
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // Max 10MB
  fileFilter: fileFilter
});