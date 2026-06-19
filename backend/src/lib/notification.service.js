import webpush from "web-push";
import dotenv from "dotenv";
import Notification from "../models/Notification.js"; // ✅ Importing Notification

dotenv.config();

// Configure VAPID
webpush.setVapidDetails(
  process.env.VAPID_SUBJECT || "mailto:kashodhanprinkal@gmail.com",
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

// ============================================================
// 📤 SEND NOTIFICATION TO A USER
// ============================================================
export const sendPushNotification = async (userId, payload) => {
  try {
    // ✅ Using Notification (not NotificationSubscription)
    const subscriptions = await Notification.find({ userId });

    if (!subscriptions || subscriptions.length === 0) {
      console.log(`No subscriptions found for user ${userId}`);
      return { success: false, reason: "No subscriptions" };
    }

    const results = [];

    for (const subscription of subscriptions) {
      try {
        const pushSubscription = {
          endpoint: subscription.endpoint,
          keys: {
            auth: subscription.keys.auth,
            p256dh: subscription.keys.p256dh,
          },
        };

        await webpush.sendNotification(pushSubscription, JSON.stringify(payload));
        results.push({ success: true, endpoint: subscription.endpoint });
      } catch (error) {
        if (error.statusCode === 410 || error.statusCode === 404) {
          // ✅ Using Notification
          await Notification.findByIdAndDelete(subscription._id);
          console.log("Removed invalid subscription");
        }
        results.push({ success: false, error: error.message });
      }
    }

    return {
      success: true,
      results,
      totalSent: results.filter((r) => r.success).length,
      totalFailed: results.filter((r) => !r.success).length,
    };
  } catch (error) {
    console.error("Error sending push notification:", error);
    return { success: false, error: error.message };
  }
};

// ============================================================
// 🔔 SEND NEW MESSAGE NOTIFICATION
// ============================================================
export const sendNewMessageNotification = async (receiverId, message, sender) => {
  const payload = {
    title: sender.fullName || "New message",
    body: message.text || (message.image ? "📸 Image shared" : "🎤 Voice message"),
    icon: sender.profilePic || "/avatar.png",
    data: {
      type: "new-message",
      messageId: message._id,
      senderId: sender._id,
      senderName: sender.fullName,
    },
    vibrate: [100, 50, 100],
    requireInteraction: true,
  };

  return await sendPushNotification(receiverId, payload);
};

// ============================================================
// 📞 SEND INCOMING CALL NOTIFICATION
// ============================================================
export const sendIncomingCallNotification = async (receiverId, caller, callType) => {
  const payload = {
    title: `📞 ${callType === "video" ? "Video" : "Audio"} Call`,
    body: `${caller.fullName} is calling you...`,
    icon: caller.profilePic || "/avatar.png",
    data: {
      type: "incoming-call",
      callerId: caller._id,
      callerName: caller.fullName,
      callType: callType,
    },
    vibrate: [200, 100, 200, 100, 200],
    requireInteraction: true,
  };

  return await sendPushNotification(receiverId, payload);
};

// ============================================================
// ❌ SEND MISSED CALL NOTIFICATION
// ============================================================
export const sendMissedCallNotification = async (userId, caller) => {
  const payload = {
    title: "❌ Missed Call",
    body: `Missed call from ${caller.fullName}`,
    icon: caller.profilePic || "/avatar.png",
    data: {
      type: "missed-call",
      callerId: caller._id,
    },
  };

  return await sendPushNotification(userId, payload);
};