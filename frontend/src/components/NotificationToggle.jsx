import React, { useState, useEffect } from "react";
import { Bell, BellOff, BellRing, Loader } from "lucide-react";
import {
  isNotificationSupported,
  isGranted,
  requestPermission,
  registerServiceWorker,
  getSubscription,
  saveSubscription,
  sendTestNotification,
} from "../lib/notification";
import toast from "react-hot-toast";

const NotificationToggle = () => {
  const [loading, setLoading] = useState(false);
  const [permission, setPermission] = useState("default");
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const checkSupport = async () => {
      const support = isNotificationSupported();
      setSupported(support);
      if (support) {
        setPermission(Notification.permission);
      }
    };
    checkSupport();
  }, []);

  const handleToggle = async () => {
    setLoading(true);

    try {
      if (!isGranted()) {
        const result = await requestPermission();
        setPermission(result);

        if (result === "granted") {
          const registration = await registerServiceWorker();
          if (registration) {
            const subscription = await getSubscription(registration);
            await saveSubscription(subscription);
            await sendTestNotification();
            toast.success("🔔 Notifications enabled!");
          }
        } else {
          toast.error("Notifications permission denied");
        }
      } else {
        await sendTestNotification();
        toast.success("🔔 Test notification sent!");
      }
    } catch (error) {
      toast.error("Failed to enable notifications");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  if (!supported) {
    return (
      <button className="text-slate-400 hover:text-slate-200 transition-colors" title="Notifications not supported">
        <BellOff className="size-5" />
      </button>
    );
  }

  if (permission === "denied") {
    return (
      <button
        className="text-slate-400 hover:text-slate-200 transition-colors cursor-not-allowed opacity-50"
        title="Notifications blocked - Enable in browser settings"
      >
        <BellOff className="size-5" />
      </button>
    );
  }

  return (
    <button
      onClick={handleToggle}
      disabled={loading}
      className={`text-slate-400 hover:text-cyan-400 transition-colors ${
        loading ? "opacity-50 cursor-wait" : ""
      }`}
      title={isGranted() ? "Send test notification" : "Enable notifications"}
    >
      {loading ? (
        <Loader className="size-5 animate-spin" />
      ) : isGranted() ? (
        <BellRing className="size-5 text-cyan-400" />
      ) : (
        <Bell className="size-5" />
      )}
    </button>
  );
};

export default NotificationToggle;