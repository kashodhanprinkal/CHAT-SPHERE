// ============================================================
// 🕐 TIME HELPER FUNCTIONS
// ============================================================

/**
 * Format message time (HH:MM AM/PM)
 */
export const formatMessageTime = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit",
  });
};

/**
 * Format full date (MMM DD, YYYY)
 */
export const formatFullDate = (date) => {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleDateString([], {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

/**
 * Get date group label (Today, Yesterday, etc.)
 */
export const getDateGroupLabel = (date) => {
  if (!date) return "";
  
  const d = new Date(date);
  const now = new Date();
  
  const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);
  
  const msgDate = new Date(d.getFullYear(), d.getMonth(), d.getDate());
  
  if (msgDate.getTime() === today.getTime()) {
    return "Today";
  } else if (msgDate.getTime() === yesterday.getTime()) {
    return "Yesterday";
  } else {
    return formatFullDate(date);
  }
};

/**
 * Check if two dates are on the same day
 */
export const isSameDay = (date1, date2) => {
  if (!date1 || !date2) return false;
  
  const d1 = new Date(date1);
  const d2 = new Date(date2);
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

/**
 * Get time ago string (2 min ago, 1 hour ago, etc.)
 */
export const getTimeAgo = (date) => {
  if (!date) return "";
  
  const now = new Date();
  const past = new Date(date);
  const diffMs = now - past;
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffWeek = Math.floor(diffDay / 7);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffSec < 5) return "just now";
  if (diffSec < 60) return `${diffSec}s ago`;
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHour < 24) return `${diffHour}h ago`;
  if (diffDay < 7) return `${diffDay}d ago`;
  if (diffWeek < 4) return `${diffWeek}w ago`;
  if (diffMonth < 12) return `${diffMonth}mo ago`;
  return `${diffYear}y ago`;
};

/**
 * Get last seen status
 */
export const getLastSeen = (date) => {
  if (!date) return "Offline";
  
  const diff = Date.now() - new Date(date).getTime();
  const minutes = Math.floor(diff / 60000);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  if (hours < 24) return `${hours}h ago`;
  if (days === 1) return "Yesterday";
  return `${days}d ago`;
};

/**
 * Format chat list last message time
 */
export const formatChatTime = (date) => {
  if (!date) return "";
  
  const d = new Date(date);
  const now = new Date();
  
  // If today, show time
  if (isSameDay(d, now)) {
    return formatMessageTime(date);
  }
  
  // If yesterday, show "Yesterday"
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  if (isSameDay(d, yesterday)) {
    return "Yesterday";
  }
  
  // If within 7 days, show day name
  const dayDiff = Math.floor((now - d) / (1000 * 60 * 60 * 24));
  if (dayDiff < 7) {
    return d.toLocaleDateString([], { weekday: "short" });
  }
  
  // Otherwise show date
  return formatFullDate(date);
};