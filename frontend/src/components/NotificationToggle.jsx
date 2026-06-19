import React, { useState } from "react";
import { Bell, BellRing, Loader } from "lucide-react";

// ✅ Import ALL functions
import * as notification from "../lib/notification";

const NotificationToggle = () => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    console.log("🔔 Bell clicked!");
    console.log("Notification object:", notification);
    
    setLoading(true);

    try {
      // Check if functions exist
      if (!notification.requestPermission) {
        console.error("❌ requestPermission is undefined!");
        alert("Error: notification.js not loaded properly");
        setLoading(false);
        return;
      }

      // Request permission
      const result = await notification.requestPermission();
      console.log("Permission result:", result);

      if (result === "granted") {
        const registration = await notification.registerServiceWorker();
        if (registration) {
          const subscription = await notification.getSubscription(registration);
          await notification.saveSubscription(subscription);
          await notification.sendTestNotification();
          alert("✅ Notifications enabled!");
        }
      } else {
        alert("❌ Permission denied");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("Error: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="text-slate-400 hover:text-cyan-400 transition-colors disabled:opacity-50"
    >
      {loading ? (
        <Loader className="size-5 animate-spin" />
      ) : (
        <Bell className="size-5" />
      )}
    </button>
  );
};

export default NotificationToggle;