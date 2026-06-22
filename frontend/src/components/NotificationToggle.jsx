console.log("🔔 NotificationToggle component loaded!");
console.log("Notification.permission:", Notification.permission);

import React, { useState, useEffect } from "react";
import { Bell, BellRing, BellOff, Loader } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const NotificationToggle = () => {
  const [loading, setLoading] = useState(false);
  const [permission, setPermission] = useState("default");

  // ✅ Check permission on mount and when it changes
  useEffect(() => {
    const checkPermission = () => {
      if (!("Notification" in window)) {
        setPermission("unsupported");
        return;
      }
      setPermission(Notification.permission);
    };

    checkPermission();

    // ✅ Listen for permission changes (works in Chrome/Firefox)
    const handleChange = () => {
      setPermission(Notification.permission);
    };

    // Add event listener for permission change
    document.addEventListener("visibilitychange", handleChange);

    // Check permission every 2 seconds (fallback for some browsers)
    const interval = setInterval(() => {
      const current = Notification.permission;
      setPermission((prev) => {
        if (prev !== current) {
          console.log("Permission changed:", current);
          return current;
        }
        return prev;
      });
    }, 2000);

    return () => {
      document.removeEventListener("visibilitychange", handleChange);
      clearInterval(interval);
    };
  }, []);

  // ✅ Handle click
  const handleClick = async () => {
    console.log("🔔 Bell clicked!");
    console.log("Current permission:", permission);
    
    if (loading) return;
    setLoading(true);

    try {
      // If already granted, send test
      if (permission === "granted") {
        console.log("✅ Sending test notification...");
        await axiosInstance.post("/notifications/test");
        toast.success("🔔 Test notification sent!");
        setLoading(false);
        return;
      }

      // Request permission
      const result = await Notification.requestPermission();
      console.log("📢 Permission result:", result);
      setPermission(result);
      
      if (result === "granted") {
        toast.success("🔔 Notifications enabled!");
        
        // Register service worker
        try {
          const registration = await navigator.serviceWorker.register("/sw.js");
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY,
          });
          
          await axiosInstance.post("/notifications/subscribe", { subscription });
          console.log("✅ Subscription saved");
          
          await axiosInstance.post("/notifications/test");
          toast.success("🔔 Test notification sent!");
        } catch (swError) {
          console.error("Service worker error:", swError);
        }
      } else if (result === "denied") {
        toast.error("Notifications blocked");
      } else {
        toast.error("Permission not granted");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      toast.error(error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Render based on permission
  console.log("🔔 Rendering with permission:", permission);

  // Not supported
  if (permission === "unsupported") {
    return (
      <button className="text-slate-400 opacity-50 cursor-not-allowed" title="Not supported">
        <BellOff className="size-5" />
      </button>
    );
  }

  // Denied
  if (permission === "denied") {
    return (
      <button
        className="text-slate-400 opacity-50 cursor-not-allowed"
        title="Notifications blocked"
        onClick={() => toast.error("Enable in browser settings")}
      >
        <BellOff className="size-5" />
      </button>
    );
  }

  // ✅ Button
  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className="text-slate-400 hover:text-cyan-400 transition-colors disabled:opacity-50"
    >
      {loading ? (
        <Loader className="size-5 animate-spin" />
      ) : permission === "granted" ? (
        <BellRing className="size-5 text-cyan-400" />
      ) : (
        <Bell className="size-5" />
      )}
    </button>
  );
};

export default NotificationToggle;