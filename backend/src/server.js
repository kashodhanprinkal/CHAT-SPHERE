import dns from "dns";
dns.setServers(["8.8.8.8", "1.1.1.1"]);

import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import cookieParser from "cookie-parser";
import cors from "cors";

import authRoutes from "./routes/auth.route.js";
import messageRoutes from "./routes/message.route.js";
import uploadRoutes from "./routes/upload.routes.js";
import callRoutes from "./routes/call.routes.js";
import notificationRoutes from "./routes/notification.routes.js";

import { connectDB } from "./lib/db.js";
import { app, server } from "./lib/socket.js";

dotenv.config();

// (__dirname doesn't exist by default)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Server Port Render automatically provides PORT
const PORT = process.env.PORT || 3000;

// Parse JSON request bodies
app.use(express.json({ limit: "10mb" }));

// Parse URL Encoded request bodies
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

// Parse Cookies
app.use(cookieParser());

// CORS
// In production (same domain), this can be simplified later.
// For now, it supports local frontend during development.
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// API Routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/calls", callRoutes);
app.use("/api/notifications", notificationRoutes);

// Serve React (Vite) Build Files
// Serve static files from frontend/dist
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// For React Router
// Any route that is not an API route will return index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../../frontend/dist/index.html"));
});


// Start Server
server.listen(PORT, async () => {
  console.log(`🚀 Server running on port ${PORT}`);

  // Connect to MongoDB
  await connectDB();
});