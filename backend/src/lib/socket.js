import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";
import { registerCallEvents } from "./call.socket.js";
import Message from "../models/Message.js"; // ✅ IMPORT Message model

dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

// apply auth middleware
io.use(socketAuthMiddleware);

// store online users
const userSocketMap = {}; // { userId: socketId }

// helper
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", async (socket) => {
  console.log("✅ user connected:", socket.user.fullName);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  // send online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // ✅ MARK MESSAGES AS DELIVERED WHEN USER CONNECTS
  try {
    // Update all sent messages to delivered
    const updateResult = await Message.updateMany(
      { 
        receiverId: userId, 
        status: 'sent' 
      },
      { 
        status: 'delivered', 
        deliveredAt: new Date() 
      }
    );
    
    if (updateResult.modifiedCount > 0) {
      console.log(`📬 Marked ${updateResult.modifiedCount} messages as delivered for ${socket.user.fullName}`);
      
      // Notify senders that messages were delivered
      const messages = await Message.find({
        receiverId: userId,
        status: 'delivered'
      }).select('senderId');
      
      const uniqueSenders = [...new Set(messages.map(m => m.senderId.toString()))];
      
      uniqueSenders.forEach(senderId => {
        const senderSocketId = getReceiverSocketId(senderId);
        if (senderSocketId) {
          io.to(senderSocketId).emit('messages-delivered', {
            userId: userId,
            messageIds: messages.filter(m => m.senderId.toString() === senderId).map(m => m._id)
          });
        }
      });
    }
  } catch (error) {
    console.error('Error marking messages as delivered:', error);
  }

  // TYPING INDICATOR
  socket.on("typing", ({ receiverId, senderName }) => {
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("typing", { senderName });
    }
  });

  socket.on("stop-typing", ({ receiverId }) => {
    const receiverSocketId = getReceiverSocketId(receiverId);
    if (receiverSocketId) {
      io.to(receiverSocketId).emit("stop-typing");
    }
  });

  // 📞 MARK MESSAGES AS READ WHEN USER OPENS CHAT
  socket.on("mark-messages-read", async ({ senderId }) => {
    try {
      const receiverId = socket.userId;
      
      // Update all delivered messages from this sender to read
      const result = await Message.updateMany(
        { 
          senderId: senderId, 
          receiverId: receiverId, 
          status: 'delivered' 
        },
        { 
          status: 'read', 
          readAt: new Date() 
        }
      );
      
      if (result.modifiedCount > 0) {
        console.log(`👁️ Marked ${result.modifiedCount} messages as read from ${senderId} to ${receiverId}`);
        
        // Notify sender that messages were read
        const senderSocketId = getReceiverSocketId(senderId);
        if (senderSocketId) {
          io.to(senderSocketId).emit('messages-read', {
            userId: receiverId,
            fromUser: senderId
          });
        }
      }
    } catch (error) {
      console.error('Error marking messages as read:', error);
    }
  });

  // 📞 CALL EVENTS
  registerCallEvents(socket);

  // ❌ DISCONNECT
  socket.on("disconnect", () => {
    console.log("❌ user disconnected:", socket.user.fullName);
    delete userSocketMap[userId];
    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };