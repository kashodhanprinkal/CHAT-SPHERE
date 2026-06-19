import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    endpoint: {
      type: String,
      required: true,
    },
    keys: {
      auth: { type: String, required: true },
      p256dh: { type: String, required: true },
    },
    userAgent: { type: String, default: "" },
  },
  { timestamps: true }
);

notificationSchema.index({ userId: 1, endpoint: 1 }, { unique: true });

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;