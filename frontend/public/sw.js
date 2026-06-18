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
  let data = {};

  try {
    data = event.data.json();
  } catch (error) {
    data = {
      title: "📩 New notification",
      body: "You have a new message",
      icon: "/favicon.ico",
    };
  }

  const options = {
    body: data.body || "New message",
    icon: data.icon || "/favicon.ico",
    badge: "/favicon.ico",
    vibrate: data.vibrate || [100, 50, 100],
    data: data.data || {},
    requireInteraction: data.requireInteraction || false,
    actions: [
      { action: "open", title: "Open Chat" },
    ],
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
      // If there's already a window open, focus it
      for (const client of clientList) {
        if (client.url.includes("/") && "focus" in client) {
          return client.focus();
        }
      }
      // Otherwise open a new window
      if (clients.openWindow) {
        return clients.openWindow(url);
      }
    })
  );
});