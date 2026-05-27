// lib/call.socket.js

import { io, getReceiverSocketId } from "./socket.js";

/**
 * =========================================================
 * 📞 REGISTER CALL EVENTS
 * =========================================================
 * This function handles:
 *
 * ✅ Call request
 * ✅ Accept call
 * ✅ Reject call
 * ✅ End call
 *
 * Later we will add:
 * - offer
 * - answer
 * - ice-candidate
 * =========================================================
 */

export const registerCallEvents = (socket) => {
  /**
   * =========================================================
   * 📞 CALL USER
   * =========================================================
   * Caller sends request to another user
   *
   * Frontend will emit:
   * "call-user"
   *
   * Payload example:
   * {
   *   receiverId,
   *   caller,
   *   callType // "audio" or "video"
   * }
   * =========================================================
   */

  socket.on("call-user", ({ receiverId, caller, callType }) => {
    console.log("📞 Incoming call request");

    // ✅ find receiver socket id
    const receiverSocketId = getReceiverSocketId(receiverId);

    // ❌ receiver offline
    if (!receiverSocketId) {
      return socket.emit("user-offline", {
        message: "User is offline",
      });
    }

    // ✅ send incoming call event to receiver
    io.to(receiverSocketId).emit("incoming-call", {
      caller,
      callType,
    });
  });

  /**
   * =========================================================
   * ✅ ACCEPT CALL
   * =========================================================
   * Receiver accepted the call
   *
   * Frontend emits:
   * "accept-call"
   * =========================================================
   */

  socket.on("accept-call", ({ receiverId }) => {
    console.log("✅ Call accepted");

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("call-accepted");
    }
  });

  /**
   * =========================================================
   * ❌ REJECT CALL
   * =========================================================
   * Receiver rejected the call
   *
   * Frontend emits:
   * "reject-call"
   * =========================================================
   */

  socket.on("reject-call", ({ receiverId }) => {
    console.log("❌ Call rejected");

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("call-rejected");
    }
  });

  /**
   * =========================================================
   * 📴 END CALL
   * =========================================================
   * Any user can end the call
   *
   * Frontend emits:
   * "end-call"
   * =========================================================
   */

  socket.on("end-call", ({ receiverId }) => {
    console.log("📴 Call ended");

    const receiverSocketId = getReceiverSocketId(receiverId);

    if (receiverSocketId) {
      io.to(receiverSocketId).emit("call-ended");
    }
  });
};

/**
 * =========================================================
 * 🌐 WEBRTC OFFER
 * =========================================================
 * Caller sends offer SDP
 * Backend forwards to receiver
 * =========================================================
 */

socket.on("offer", ({ receiverId, offer }) => {
  console.log("📡 WebRTC Offer");

  const receiverSocketId = getReceiverSocketId(receiverId);

  if (receiverSocketId) {
    io.to(receiverSocketId).emit("offer", {
      offer,
      senderId: socket.userId,
    });
  }
});

/**
 * =========================================================
 * 🌐 WEBRTC ANSWER
 * =========================================================
 * Receiver sends answer SDP
 * Backend forwards to caller
 * =========================================================
 */

socket.on("answer", ({ receiverId, answer }) => {
  console.log("📡 WebRTC Answer");

  const receiverSocketId = getReceiverSocketId(receiverId);

  if (receiverSocketId) {
    io.to(receiverSocketId).emit("answer", {
      answer,
      senderId: socket.userId,
    });
  }
});

/**
 * =========================================================
 * 🧊 ICE CANDIDATES
 * =========================================================
 * Exchange network candidates
 * Required for real-world connectivity
 * =========================================================
 */

socket.on("ice-candidate", ({ receiverId, candidate }) => {
  const receiverSocketId = getReceiverSocketId(receiverId);

  if (receiverSocketId) {
    io.to(receiverSocketId).emit("ice-candidate", {
      candidate,
      senderId: socket.userId,
    });
  }
});