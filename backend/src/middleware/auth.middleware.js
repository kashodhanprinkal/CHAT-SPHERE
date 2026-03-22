import jwt from "jsonwebtoken";
import User from "../models/User.js";
import dotenv from "dotenv";

dotenv.config(); // ✅ load env variables

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt; // ✅ FIXED

    if (!token) {
      return res.status(401).json({ message: "Unauthorized - No Token Provided" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET); // ✅ FIXED

    if (!decoded) {
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });
    }

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    req.user = user; // ✅ attach user
    next();

  } catch (error) {
    console.log("Error in protectRoute middleware:", error.message);
    res.status(500).json({ message: "Internal Server Error" });
  }
};