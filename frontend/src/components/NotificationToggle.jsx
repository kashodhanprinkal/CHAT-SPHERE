import React, { useState, useEffect } from "react";
import { Bell, BellRing, BellOff, Loader } from "lucide-react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const NotificationToggle = () => {
  const [loading, setLoading] = useState(false);
  const [permission, setPermission] = useState("default");
  const [isSubscribed, setIsSubscribed] = useState(false);

  // ✅ Check permission and subscription status
  useEffect(() => {
    const check = async () => {
      if ("Notification" in window) {
        const perm = Notification.permission;
        setPermission(perm);
        console.log("📢 Permission:", perm);
        
        // Check if subscribed
        if (perm === "granted") {
          try {
            const registration = await navigator.serviceWorker.ready;
            const subscription = await registration.pushManager.getSubscription();
            setIsSubscribed(!!subscription);
            console.log("📢 Subscribed:", !!subscription);
          } catch (err) {
            console.error("Error checking subscription:", err);
          }
        }
      }
    };
    check();

    const interval = setInterval(() => {
      if ("Notification" in window) {
        const current = Notification.permission;
        setPermission(prev => {
          if (prev !== current) {
            console.log("🔄 Permission changed to:", current);
            return current;
          }
          return prev;
        });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleToggle = async () => {
    console.log("🔔 Toggle clicked!");
    if (loading) return;
    setLoading(true);

    try {
      // ✅ If subscribed, unsubscribe (turn OFF)
      if (isSubscribed) {
        console.log("🔕 Turning OFF notifications...");
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.getSubscription();
        if (subscription) {
          await subscription.unsubscribe();
          setIsSubscribed(false);
          toast.success("🔕 Notifications turned off");
        }
        setLoading(false);
        return;
      }

      // ✅ If not subscribed, enable (turn ON)
      if (permission === "granted") {
        console.log("🔔 Turning ON notifications...");
        const registration = await navigator.serviceWorker.ready;
        const subscription = await registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY,
        });
        
        await axiosInstance.post("/notifications/subscribe", { subscription });
        setIsSubscribed(true);
        await axiosInstance.post("/notifications/test");
        toast.success("🔔 Notifications enabled!");
        setLoading(false);
        return;
      }

      // ✅ Request permission (first time)
      const result = await Notification.requestPermission();
      console.log("📢 Result:", result);
      setPermission(result);

      if (result === "granted") {
        toast.success("🔔 Notifications enabled!");
        
        try {
          const registration = await navigator.serviceWorker.register("/sw.js");
          const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: import.meta.env.VITE_VAPID_PUBLIC_KEY,
          });
          
          await axiosInstance.post("/notifications/subscribe", { subscription });
          setIsSubscribed(true);
          await axiosInstance.post("/notifications/test");
          toast.success("🔔 Test notification sent!");
        } catch (err) {
          console.error("SW Error:", err);
        }
      } else {
        toast.error(result === "denied" ? "Notifications blocked" : "Permission not granted");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Render based on permission and subscription
  if (permission === "denied") {
    return (
      <button className="text-slate-400 opacity-50 cursor-not-allowed" title="Notifications blocked">
        <BellOff className="size-5" />
      </button>
    );
  }

  if (permission === "unsupported" || !("Notification" in window)) {
    return (
      <button className="text-slate-400 opacity-50 cursor-not-allowed" title="Not supported">
        <BellOff className="size-5" />
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className="text-slate-400 hover:text-cyan-400 transition-colors disabled:opacity-50"
      title={isSubscribed ? "Turn off notifications" : "Turn on notifications"}
    >
      {loading ? (
        <Loader className="size-5 animate-spin" />
      ) : isSubscribed ? (
        <BellRing className="size-5 text-cyan-400" />
      ) : (
        <Bell className="size-5" />
      )}
    </button>
  );
};

export default NotificationToggle;