// 🔔 NOTIFICATION HELPER
export const isNotificationSupported = () => {
  return "Notification" in window && "serviceWorker" in navigator;
};

export const getPermission = () => {
  if (!isNotificationSupported()) return "unsupported";
  return Notification.permission;
};

export const isGranted = () => getPermission() === "granted";

export const requestPermission = async () => {
  if (!isNotificationSupported()) return "unsupported";
  try {
    return await Notification.requestPermission();
  } catch (error) {
    console.error("Error requesting permission:", error);
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
  }
};

export const getSubscription = async (registration) => {
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
    const response = await fetch("/api/notifications/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ subscription }),
    });

    if (!response.ok) throw new Error("Failed to save subscription");
    console.log("✅ Subscription saved to server");
    return await response.json();
  } catch (error) {
    console.error("❌ Error saving subscription:", error);
    throw error;
  }
};

export const sendTestNotification = async () => {
  try {
    const response = await fetch("/api/notifications/test", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return await response.json();
  } catch (error) {
    console.error("❌ Error sending test notification:", error);
  }
};