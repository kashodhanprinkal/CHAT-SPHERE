import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import UserLoadingSkeleton from "./UserLoadingSkeleton";
import NoChatsFound from "./NoChatsFound";
import { useAuthStore } from "../store/useAuthStore";

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
    <div className="space-y-3 p-4">
      {chats.map((chat) => (
        <div
          key={chat._id}
          className="bg-cyan-500/10 p-4 rounded-lg cursor-pointer hover:bg-cyan-500/20 transition-colors"
          onClick={() => setSelectedUser(chat)}
        >
         <div className="flex items-center gap-3">
  {/* Online / Offline status */}
  <div
    className={`avatar ${
      onlineUsers.includes(chat._id) ? "online" : "offline"
    }`}
  >
    <div className="w-12 rounded-full">
      <img
        src={chat.profilePic || "/avatar.png"}
        alt={chat.fullName}
      />
    </div>
  </div>

  <h4 className="text-slate-200 font-medium truncate">
    {chat.fullName}
  </h4>
</div>
        </div>
      ))}
    </div>
  );
}

export default ChatsList;