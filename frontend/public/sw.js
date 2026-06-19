// ============================================================
// 🔔 SERVICE WORKER FOR PUSH NOTIFICATIONS
// ============================================================

self.addEventListener("install", (event) => {
  self.skipWaiting();
  console.log("✅ Service Worker installed");
});

self.addEventListener("activate", (event) => {
  event.waitUntil(clients.claim());
  console.log("✅ Service Worker activated");
});

// ============================================================
// 📨 HANDLE PUSH NOTIFICATIONS
// ============================================================
self.addEventListener("push", (event) => {
  // Don't do anything if no data
  if (!event.data) return;

  let data = {};

  try {
    data = event.data.json();
  } catch (error) {
    console.log("❌ Invalid push data:", error);
    return;
  }

  // ✅ Check if notification permission is granted
  if (self.Notification.permission !== "granted") {
    console.log("❌ Notification permission not granted");
    return;
  }

  const options = {
    body: data.body || "New message",
    icon: data.icon || "/favicon.ico",
    badge: "/favicon.ico",
    vibrate: data.vibrate || [100, 50, 100],
    data: data.data || {},
    requireInteraction: data.requireInteraction || false,
  };

  event.waitUntil(
    self.registration.showNotification(data.title || "ChatSphere", options)
  );
});

// ============================================================
// 👆 HANDLE NOTIFICATION CLICK
// ============================================================
self.addEventListener("notificationclick", (event) => {
  event.notification.close();

  const data = event.notification.data || {};
  const url = data.senderId ? `/?chat=${data.senderId}` : "/";

  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if (client.url.includes("/") && "focus" in client) {
          return client.focus();
        }
      }
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});