// lib/call.socket.js

import { io, getReceiverSocketId } from "./socket.js";
import { Call } from "../models/Call.js";

// Store call start times in memory (in production, use Redis)
const callSessions = new Map();

export const registerCallEvents = (socket) => {

  // 📞 CALL USER
  socket.on("call-user", ({ receiverId, caller, callType }) => {
    console.log("📞 Incoming call request from", caller.fullName);

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (!receiverSocketId) {
      return socket.emit("user-offline", {
        message: "User is offline",
      });
    }

    // Store call session info
    callSessions.set(socket.userId, {
      startTime: Date.now(),
      receiverId,
      callType,
      callerId: socket.userId,
      status: "outgoing"
    });

    io.to(receiverSocketId).emit("incoming-call", {
      caller,
      callType,
    });
  });

  // ✅ ACCEPT CALL
  socket.on("accept-call", ({ receiverId }) => {
    console.log("✅ Call accepted");

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("call-accepted");
    }

    // Update call session
    const session = callSessions.get(receiverId);
    if (session) {
      session.status = "connected";
      session.connectedAt = Date.now();
    }
  });

  // ❌ REJECT CALL
  socket.on("reject-call", async ({ receiverId }) => {
    console.log("❌ Call rejected");

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("call-rejected");
    }

    // Save missed call log for caller
    const session = callSessions.get(receiverId);
    if (session) {
      const callLog = new Call({
        callerId: session.callerId,
        receiverId: session.receiverId,
        callType: session.callType,
        status: "missed",
        duration: 0,
        startedAt: new Date(session.startTime),
        endedAt: new Date()
      });

      await callLog.save();

      // Emit call log to both users
      const callerSocketId = getReceiverSocketId(session.callerId);
      io.to(callerSocketId).emit("new-call-log", callLog);
      io.to(receiverSocketId).emit("new-call-log", callLog);

      callSessions.delete(receiverId);
    }
  });

  // 📴 END CALL
  socket.on("end-call", async ({ receiverId, duration, callType }) => {
    console.log("📴 Call ended");

    const receiverSocketId = getReceiverSocketId(receiverId);
    const callerSocketId = getReceiverSocketId(socket.userId);

    // Calculate duration if not provided
    let callDuration = duration || 0;
    let session = callSessions.get(socket.userId);

    if (!session && callType) {
      // Fallback: create session from data
      session = {
        callerId: socket.userId,
        receiverId: receiverId,
        callType: callType,
        startTime: Date.now() - (callDuration * 1000)
      };
    }

    if (session) {
      if (!duration) {
        callDuration = Math.floor((Date.now() - session.startTime) / 1000);
      }

      // Save call log
      const callLog = new Call({
        callerId: session.callerId,
        receiverId: session.receiverId,
        callType: session.callType,
        status: "ended",
        duration: callDuration,
        startedAt: new Date(session.startTime),
        endedAt: new Date()
      });

      await callLog.save();

      // Emit call log to both users
      if (receiverSocketId) {
        io.to(receiverSocketId).emit("new-call-log", callLog);
      }
      if (callerSocketId) {
        io.to(callerSocketId).emit("new-call-log", callLog);
      }

      // Clean up session
      callSessions.delete(socket.userId);
      if (session.receiverId) {
        callSessions.delete(session.receiverId);
      }
    }

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("call-ended");
    }
  });

  // 🌐 WEBRTC OFFER
  socket.on("offer", ({ receiverId, offer }) => {
    console.log("📡 Offer sent");

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("offer", {
        offer,
        senderId: socket.userId,
      });
    }
  });

  // 🌐 WEBRTC ANSWER
  socket.on("answer", ({ receiverId, answer }) => {
    console.log("📡 Answer sent");

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("answer", {
        answer,
        senderId: socket.userId,
      });
    }
  });

  // 🧊 ICE CANDIDATE
  socket.on("ice-candidate", ({ receiverId, candidate }) => {
    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("ice-candidate", {
        candidate,
        senderId: socket.userId,
      });
    }
  });

  // Clean up on disconnect
  socket.on("disconnect", async () => {
    // Check if there was an active call
    const session = callSessions.get(socket.userId);
    if (session && session.status === "connected") {
      const callDuration = Math.floor((Date.now() - session.connectedAt) / 1000);
      
      const callLog = new Call({
        callerId: session.callerId,
        receiverId: session.receiverId,
        callType: session.callType,
        status: "ended",
        duration: callDuration,
        startedAt: new Date(session.startTime),
        endedAt: new Date()
      });

      await callLog.save();

      const receiverSocketId = getReceiverSocketId(session.receiverId);
      io.to(receiverSocketId).emit("call-ended");
      io.to(receiverSocketId).emit("new-call-log", callLog);
    }
    
    callSessions.delete(socket.userId);
  });
};