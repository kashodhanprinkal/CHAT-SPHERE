import { Server } from "socket.io";
import http from "http";
import express from "express";
import dotenv from "dotenv";
import { socketAuthMiddleware } from "../middleware/socket.auth.middleware.js";
import { registerCallEvents } from "./call.socket.js";
dotenv.config();

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: process.env.CLIENT_URL,
    credentials: true,
  },
});

// ✅ apply auth middleware
io.use(socketAuthMiddleware);

// ✅ store online users
const userSocketMap = {}; // { userId: socketId }

// ✅ helper
export function getReceiverSocketId(userId) {
  return userSocketMap[userId];
}

io.on("connection", (socket) => {
  console.log("✅ user connected:", socket.user.fullName);

  const userId = socket.userId;
  userSocketMap[userId] = socket.id;

  // ✅ send online users
  io.emit("getOnlineUsers", Object.keys(userSocketMap));

  // =========================
  // ✍️ TYPING INDICATOR
  // =========================

  socket.on("typing", ({ receiverId, senderName }) => {
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("typing", {
        senderName,
      });
    }
  });

  socket.on("stop-typing", ({ receiverId }) => {
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("stop-typing");
    }
  });

  // =========================
  registerCallEvents(socket);
  socket.on("disconnect", () => {
    console.log("❌ user disconnected:", socket.user.fullName);

    delete userSocketMap[userId];

    io.emit("getOnlineUsers", Object.keys(userSocketMap));
  });
});

export { io, app, server };