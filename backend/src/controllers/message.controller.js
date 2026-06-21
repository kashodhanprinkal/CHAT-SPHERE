import Message from "../models/Message.js";
import User from "../models/User.js";
import cloudinary from "../lib/cloudinary.js";
import { get } from "mongoose";
import { getReceiverSocketId } from "../lib/socket.js";
import { io } from "../lib/socket.js"; 
import { sendNewMessageNotification } from "../lib/notification.service.js";


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
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    });
    res.status(200).json(messages);
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
    const receiverExists = await User.exists({ _id: receiverId });
    if (!receiverExists) {
      return res.status(404).json({ message: "Receiver not found" });
    }

    let imageUrl = "";
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    // Detect message type
    let messageType = "text";
    if (imageUrl) messageType = "image";
    if (voiceUrl) messageType = "voice";

    // Create message with status 'sent'
    const newMessage = new Message({
      senderId,
      receiverId,
      text: text || "",
      image: imageUrl || "",
      messageType,
      voiceUrl: voiceUrl || "",
      voiceDuration: voiceDuration || 0,
      status: 'sent',
      deliveredAt: null,
      readAt: null
    });

    await newMessage.save();

    // Populate sender info
    const populatedMessage = await Message.findById(newMessage._id)
      .populate("senderId", "fullName profilePic")
      .populate("receiverId", "fullName profilePic");

    // SOCKET.IO
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", populatedMessage);
      
      // Auto mark as delivered if receiver is online
      await Message.findByIdAndUpdate(newMessage._id, {
        status: 'delivered',
        deliveredAt: new Date()
      });
      
      populatedMessage.status = 'delivered';
      populatedMessage.deliveredAt = new Date();
    }

     try {
      const sender = await User.findById(senderId).select("fullName profilePic");
      await sendNewMessageNotification(receiverId, newMessage, sender);
      console.log("✅ Push notification sent to receiver");
    } catch (error) {
      console.error("❌ Push notification error:", error.message);
      // Don't fail the request if notification fails
    }

    res.status(201).json(populatedMessage);
  } catch (error) {
    console.log("error in sendMessage controller", error.message);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getChatPartners = async (req, res) => {
  try {
    const loggedInUserId = req.user._id.toString();

    // Get all messages where user is involved, sorted by latest
    const messages = await Message.find({
      $or: [{ senderId: loggedInUserId }, { receiverId: loggedInUserId }],
    }).sort({ createdAt: -1 });

    // Get unique partner IDs with latest message
    const chatMap = new Map();

    for (const msg of messages) {
      const partnerId = msg.senderId.toString() === loggedInUserId 
        ? msg.receiverId.toString() 
        : msg.senderId.toString();
      
      // Only store the latest message for each partner
      if (!chatMap.has(partnerId)) {
        chatMap.set(partnerId, {
          lastMessage: msg,
          lastMessageAt: msg.createdAt,
        });
      }
    }

    // Get all unique partner IDs
    const partnerIds = [...chatMap.keys()];

    // Fetch users
    const chatPartners = await User.find({
      _id: { $in: partnerIds },
    }).select("-password");

    // Combine user data with last message
    const result = chatPartners.map(user => {
      const chatData = chatMap.get(user._id.toString());
      return {
        _id: user._id,
        fullName: user.fullName,
        profilePic: user.profilePic,
        participants: [user, req.user],
        lastMessage: chatData?.lastMessage || null,
        lastMessageAt: chatData?.lastMessageAt || null,
      };
    });

    // Sort by latest message
    result.sort((a, b) => {
      const dateA = a.lastMessageAt ? new Date(a.lastMessageAt) : new Date(0);
      const dateB = b.lastMessageAt ? new Date(b.lastMessageAt) : new Date(0);
      return dateB - dateA;
    });

    res.status(200).json(result);
  } catch (error) {
    console.log("error in getChatPartners:", error);
    res.status(500).json({ message: "server error" });
  }
};

export const sendVoiceMessage = async (req, res) => {
  try {
    const { id: receiverId } = req.params;
    const senderId = req.user._id;
    const { duration } = req.body;

    if (!req.file) {
      return res.status(400).json({ error: "No voice file provided" });
    }

    const result = await cloudinary.uploader.upload(req.file.path, {
      resource_type: "video",
      folder: "voice-notes",
      format: "mp3"
    });

    const newMessage = new Message({
      senderId,
      receiverId,
      messageType: "voice",
      voiceUrl: result.secure_url,
      voiceDuration: duration || 0,
      status: 'sent',
      deliveredAt: null,
      readAt: null
    });

    await newMessage.save();

    const populatedMessage = await Message.findById(newMessage._id)
      .populate("senderId", "fullName profilePic")
      .populate("receiverId", "fullName profilePic");

    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("newMessage", populatedMessage);
      
      // Auto mark as delivered if receiver is online
      await Message.findByIdAndUpdate(newMessage._id, {
        status: 'delivered',
        deliveredAt: new Date()
      });
      
      populatedMessage.status = 'delivered';
      populatedMessage.deliveredAt = new Date();
    }

     // ✅ SEND PUSH NOTIFICATION FOR VOICE MESSAGE
    try {
      const sender = await User.findById(senderId).select("fullName profilePic");
      await sendNewMessageNotification(receiverId, newMessage, sender);
      console.log("✅ Push notification sent for voice message");
    } catch (error) {
      console.error("❌ Push notification error:", error.message);
    }

    const fs = await import("fs");
    fs.unlinkSync(req.file.path);

    res.status(201).json(populatedMessage);
  } catch (error) {
    console.error("Error in sendVoiceMessage: ", error.message);
    res.status(500).json({ error: "Failed to send voice message" });
  }
};

// ✅ NEW FUNCTION - Get message status for a conversation
export const getMessageStatus = async (req, res) => {
  try {
    const { userId } = req.params;
    const currentUserId = req.user._id;
    
    const messages = await Message.find({
      $or: [
        { senderId: currentUserId, receiverId: userId },
        { senderId: userId, receiverId: currentUserId }
      ]
    }).select('status deliveredAt readAt senderId receiverId createdAt');
    
    res.status(200).json(messages);
  } catch (error) {
    console.error("Error getting message status:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ NEW FUNCTION - Mark messages as delivered
export const markMessagesAsDelivered = async (req, res) => {
  try {
    const { senderId } = req.params;
    const receiverId = req.user._id;
    
    await Message.updateMany(
      { senderId: senderId, receiverId: receiverId, status: 'sent' },
      { status: 'delivered', deliveredAt: new Date() }
    );
    
    res.status(200).json({ message: "Messages marked as delivered" });
  } catch (error) {
    console.error("Error marking messages as delivered:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ✅ NEW FUNCTION - Mark messages as read
export const markMessagesAsRead = async (req, res) => {
  try {
    const { senderId } = req.params;
    const receiverId = req.user._id;
    
    const result = await Message.updateMany(
      { senderId: senderId, receiverId: receiverId, status: 'delivered' },
      { status: 'read', readAt: new Date() }
    );
    
    res.status(200).json({ 
      message: "Messages marked as read",
      count: result.modifiedCount 
    });
  } catch (error) {
    console.error("Error marking messages as read:", error);
    res.status(500).json({ message: "Server error" });
  }
};