import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config();

export const socketAuthMiddleware = async (socket, next) => {
  try {
    // ✅ extract token from cookies
    const token = socket.handshake.headers.cookie
      ?.split("; ")
      .find((row) => row.startsWith("jwt="))
      ?.split("=")[1];

    if (!token) {
      console.log("❌ Socket rejected: No token");
      return next(new Error("Unauthorized - No token"));
    }

    // ✅ verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded) {
      console.log("❌ Socket rejected: Invalid token");
      return next(new Error("Unauthorized - Invalid token"));
    }

    // ✅ find user
    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      console.log("❌ Socket rejected: User not found");
      return next(new Error("Unauthorized - User not found"));
    }

    // ✅ attach user to socket
    socket.user = user;
    socket.userId = user._id.toString();

    console.log(`✅ Socket connected: ${user.fullName}`);

    next();
  } catch (error) {
    console.log("❌ Socket error:", error.message);
    next(new Error("Unauthorized - Invalid token"));
  }
};