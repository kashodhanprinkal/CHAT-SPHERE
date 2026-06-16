import mongoose from "mongoose";

const callSchema = new mongoose.Schema({
  callerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  receiverId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  callType: {
    type: String,
    enum: ["audio", "video"],
    required: true,
  },
  status: {
    type: String,
    enum: ["incoming", "outgoing", "missed", "ended"],
    required: true,
  },
  duration: {
    type: Number,
    default: 0,
  },
  startedAt: {
    type: Date,
    default: Date.now,
  },
  endedAt: {
    type: Date,
  },
}, { 
  timestamps: true 
});

// Index for faster queries
callSchema.index({ callerId: 1, receiverId: 1 });
callSchema.index({ createdAt: -1 });

export const Call = mongoose.model("Call", callSchema);