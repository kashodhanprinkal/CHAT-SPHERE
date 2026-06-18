import Notification from "../models/Notification.js";
import { sendPushNotification } from "../lib/notification.service.js";

// ============================================================
// 📝 SAVE SUBSCRIPTION
// ============================================================
export const saveSubscription = async (req, res) => {
  try {
    const userId = req.user._id;
    const { subscription } = req.body;

    if (!subscription || !subscription.endpoint) {
      return res.status(400).json({ message: "Invalid subscription data" });
    }

    const existing = await NotificationSubscription.findOne({
      userId,
      endpoint: subscription.endpoint,
    });

    if (existing) {
      return res.status(200).json({ message: "Subscription already exists" });
    }

    const newSubscription = new NotificationSubscription({
      userId,
      endpoint: subscription.endpoint,
      keys: {
        auth: subscription.keys.auth,
        p256dh: subscription.keys.p256dh,
      },
    });

    await newSubscription.save();

    // Send test notification
    await sendPushNotification(userId, {
      title: "🔔 Notifications Enabled",
      body: "You will now receive notifications for new messages and calls.",
      icon: "/favicon.ico",
    });

    res.status(201).json({
      message: "Subscription saved successfully",
      subscription: newSubscription,
    });
  } catch (error) {
    console.error("Error saving subscription:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ============================================================
// ❌ REMOVE SUBSCRIPTION
// ============================================================
export const removeSubscription = async (req, res) => {
  try {
    const userId = req.user._id;
    const { endpoint } = req.body;

    await NotificationSubscription.findOneAndDelete({ userId, endpoint });
    res.status(200).json({ message: "Subscription removed" });
  } catch (error) {
    console.error("Error removing subscription:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// ============================================================
// 🧪 TEST NOTIFICATION
// ============================================================
export const sendTestNotification = async (req, res) => {
  try {
    const result = await sendPushNotification(req.user._id, {
      title: "🔔 Test Notification",
      body: "Your push notifications are working! 🎉",
      icon: "/favicon.ico",
    });

    res.status(200).json({ message: "Test notification sent", result });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Server error" });
  }
};