import React, { useState, useEffect } from "react";
import { Bell, BellRing, BellOff, Loader } from "lucide-react";
import * as notification from "../lib/notification";
import toast from "react-hot-toast";

const NotificationToggle = () => {
  const [loading, setLoading] = useState(false);
  const [permission, setPermission] = useState("default");
  const [supported, setSupported] = useState(true);

  // ✅ Check support and permission on mount
  useEffect(() => {
    const checkSupport = () => {
      const support = notification.isNotificationSupported();
      setSupported(support);
      if (support) {
        setPermission(notification.getPermission());
      }
    };
    checkSupport();
  }, []);

  // ✅ Handle click
  const handleClick = async () => {
    console.log("🔔 Bell clicked!");
    
    if (loading) return;
    setLoading(true);

    try {
      // Check if already granted
      if (notification.isGranted()) {
        console.log("✅ Permission already granted");
        await notification.sendTestNotification();
        toast.success("🔔 Test notification sent!");
        setLoading(false);
        return;
      }

      // Request permission
      console.log("📢 Requesting permission...");
      const result = await notification.requestPermission();
      console.log("📢 Permission result:", result);
      setPermission(result);

      if (result === "granted") {
        console.log("📢 Registering service worker...");
        const registration = await notification.registerServiceWorker();
        
        if (registration) {
          console.log("📢 Creating subscription...");
          const subscription = await notification.getSubscription(registration);
          console.log("📢 Subscription:", subscription);
          
          console.log("📢 Saving to server...");
          await notification.saveSubscription(subscription);
          
          console.log("📢 Sending test notification...");
          await notification.sendTestNotification();
          
          toast.success("🔔 Notifications enabled!");
        } else {
          toast.error("Failed to register service worker");
        }
      } else if (result === "denied") {
        toast.error("Notifications blocked. Please enable in browser settings.");
      } else {
        toast.error("Notifications permission denied");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      toast.error(error.message || "Failed to enable notifications");
    } finally {
      setLoading(false);
    }
  };

  // ❌ Not supported
  if (!supported) {
    return (
      <button
        className="text-slate-400 opacity-50 cursor-not-allowed"
        title="Notifications not supported in this browser"
      >
        <BellOff className="size-5" />
      </button>
    );
  }

  // ❌ Permission denied
  if (permission === "denied") {
    return (
      <button
        className="text-slate-400 opacity-50 cursor-not-allowed"
        title="Notifications blocked. Enable in browser settings."
        onClick={() => {
          toast.error("Please enable notifications in browser settings");
        }}
      >
        <BellOff className="size-5" />
      </button>
    );
  }

  // ✅ Render button
  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="text-slate-400 hover:text-cyan-400 transition-colors disabled:opacity-50 disabled:cursor-wait"
      title={notification.isGranted() ? "Send test notification" : "Enable notifications"}
    >
      {loading ? (
        <Loader className="size-5 animate-spin" />
      ) : notification.isGranted() ? (
        <BellRing className="size-5 text-cyan-400" />
      ) : (
        <Bell className="size-5" />
      )}
    </button>
  );
};

export default NotificationToggle;