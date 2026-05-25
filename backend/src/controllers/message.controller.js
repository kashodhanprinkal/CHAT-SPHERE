import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
import { get } from "mongoose";
import { getReceiverSocketId } from "../lib/socket.js";
import { io } from "../lib/socket.js"; 



export const getAllContacts = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const filteredUsers = await User.find({
      _id: { $ne: loggedInUserId },
    }).select("-password");

    res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("error in getallcontacts:", error);
    res.status(500).json({ message: "server error" });
  }
};

export const getMessageByUserId = async (req, res) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    const messags = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messags);
  } catch (error) {
    console.log("error in getMessages contoller:", error.message);
    res.status(500).json({ error: "internal server error" });
  }
};

export const sendMessage = async (req, res) => {
  try {
    const { text, image, voiceUrl, voiceDuration } = req.body;

    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    // Validation
    if (!text && !image && !voiceUrl) {
      return res.status(400).json({
        message: "Text, image or voice note is required",
      });
    }

    // Prevent self message
    if (senderId.equals(receiverId)) {
      return res.status(400).json({
        message: "Cannot send message to yourself",
      });
    }

    // Check receiver exists
    const receiverExists = await User.exists({
      _id: receiverId,
    });

    if (!receiverExists) {
      return res.status(404).json({
        message: "Receiver not found",
      });
    }

    let imageUrl = "";

    // Upload image if exists
    if (image) {
      const uploadResponse =
        await cloudinary.uploader.upload(image);

      imageUrl = uploadResponse.secure_url;
    }

    // Detect message type
    let messageType = "text";

    if (imageUrl) {
      messageType = "image";
    }

    if (voiceUrl) {
      messageType = "voice";
    }

    // Create message
    const newMessage = new Message({
  senderId,
  receiverId,
  text: text || "",
  image: imageUrl || "",
  messageType: voiceUrl ? "voice" : imageUrl ? "image" : "text",
  voiceUrl: voiceUrl || "",
  voiceDuration: voiceDuration || 0,
});

    await newMessage.save();

    // SOCKET.IO
    const receiverSocketId =
      getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit(
        "newMessage",
        newMessage
      );
    }

    res.status(201).json(newMessage);

  } catch (error) {
    console.log(
      "error in sendMessage controller",
      error.message
    );

    res.status(500).json({
      message: "Internal server error",
    });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id.toString();

    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    });

    // ✅ Get unique partner IDs
    const chatPartnerIds = [
      ...new Set(
        messages.map((msg) =>
          msg.senderId.toString() === loggedInUserId
            ? msg.receiverId.toString()
            : msg.senderId.toString(),
        ),
      ),
    ];

    // ✅ Fetch users
    const chatPartners = await User.find({
      _id: { $in: chatPartnerIds },
    }).select("-password");

    res.status(200).json(chatPartners);
  } catch (error) {
    console.log("error in getChatPartners:", error);
    res.status(500).json({ message: "server error" });
  }
};

// ADD THIS FUNCTION FOR VOICE MESSAGES
export const sendVoiceMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const { duration } = req.body;

    // Check if voice file exists
    if (!req.file) {
      return res.status(400).json({ error: "No voice file provided" });
    }

    // Upload to Cloudinary (audio treated as video)
    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video", // Important: audio uses 'video' type
      folder: "voice-notes",
      format: "mp3"
    });

    // Create voice message in database
    const newMessage = new Message({
      senderId,
      receiverId,
      messageType: "voice",
      voiceUrl: result.secure_url,
      voiceDuration: duration || 0,
    });

    await newMessage.save();

    // Populate sender info (to send back to frontend)
    const populatedMessage = await Message.findById(newMessage._id)
      .populate("senderId", "fullName profilePic")
      .populate("receiverId", "fullName profilePic");

    // Send real-time notification via Socket.IO
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", populatedMessage);
    }

    // Delete temporary file from server
    const fs = await import("fs");
    fs.unlinkSync(req.file.path);

    // Send success response back to sender
    res.status(201).json(populatedMessage);
    
  } catch (error) {
    console.error("Error in sendVoiceMessage: ", error.message);
    res.status(500).json({ error: "Failed to send voice message" });
  }
};