import { axiosInstance } from "./axios";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000/api";

// ============================================================
// 🔔 NOTIFICATION FUNCTIONS
// ============================================================

export const isNotificationSupported = () => {
  return "Notification" in window && "serviceWorker" in navigator;
};

export const getPermission = () => {
  if (!isNotificationSupported()) return "unsupported";
  return Notification.permission;
};

export const isGranted = () => {
  return getPermission() === "granted";
};

export const requestPermission = async () => {
  if (!isNotificationSupported()) return "unsupported";
  try {
    const result = await Notification.requestPermission();
    console.log("✅ Permission result:", result);
    return result;
  } catch (error) {
    console.error("❌ Error requesting permission:", error);
    return "error";
  }
};

export const registerServiceWorker = async () => {
  try {
    const registration = await navigator.serviceWorker.register("/sw.js");
    console.log("✅ Service Worker registered");
    return registration;
  } catch (error) {
    console.error("❌ Service Worker registration failed:", error);
    return null;
  }
};

export const getSubscription = async (registration) => {
  if (!registration) {
    console.error("❌ No registration provided");
    return null;
  }
  try {
    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY,
    });
    console.log("✅ Push subscription created");
    return subscription;
  } catch (error) {
    console.error("❌ Error subscribing:", error);
    throw error;
  }
};

export const saveSubscription = async (subscription) => {
  try {
    console.log("📤 Saving subscription...");
    const response = await axiosInstance.post("/notifications/subscribe", {
      subscription,
    });
    console.log("✅ Subscription saved:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error saving subscription:", error.response?.data || error.message);
    throw error;
  }
};

export const sendTestNotification = async () => {
  try {
    console.log("📤 Sending test notification...");
    const response = await axiosInstance.post("/notifications/test");
    console.log("✅ Test notification sent:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error sending test notification:", error.response?.data || error.message);
    throw error;
  }
};

console.log("✅ notification.js loaded successfully");
console.log("✅ notification.js loaded successfully");
console.log("Exports:", {
  isNotificationSupported,
  getPermission,
  isGranted,
  requestPermission,
  registerServiceWorker,
  getSubscription,
  saveSubscription,
  sendTestNotification,
});