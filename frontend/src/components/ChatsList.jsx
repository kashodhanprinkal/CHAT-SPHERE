import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UserLoadingSkeleton from "./UserLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";
import { formatChatTime } from "../lib/time"; 


function ChatsList() {
  const {
    getMyChatPartners,
    chats,
    isUserLoading,
    setSelectedUser,
  } = useChatStore();

  const { onlineUsers } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  // Show loading skeleton
  if (isUserLoading) return <UserLoadingSkeleton />;

  // Show empty state
  if (!chats || chats.length === 0) return <NoChatsFound />;

  return (
    <div className="flex justify-between items-start">
  <div className="flex-1 min-w-0">
    <h4 className="text-slate-200 font-medium truncate">
      {chat.participants?.[0]?.fullName || "Unknown"}
    </h4>
    <p className="text-sm text-slate-400 truncate">
      {chat.lastMessage?.text || "No messages yet"}
    </p>
  </div>
  <span className="text-xs text-slate-500 whitespace-nowrap ml-2">
    {chat.lastMessage?.createdAt ? formatChatTime(chat.lastMessage.createdAt) : ""}
  </span>
</div>
  );
}

export default ChatsList;