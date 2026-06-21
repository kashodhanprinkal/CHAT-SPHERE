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

  const { onlineUsers, authUser } = useAuthStore();

  useEffect(() => {
    getMyChatPartners();
  }, [getMyChatPartners]);

  // Show loading skeleton
  if (isUserLoading) return <UserLoadingSkeleton />;

  // Show empty state
  if (!chats || chats.length === 0) return <NoChatsFound />;

  return (
    <div className="space-y-2 p-4">
      {chats.map((chat) => {
        // Get the other participant
        const otherParticipant = chat.participants?.find(
          (p) => p._id !== authUser?._id
        );

        const displayUser = otherParticipant || chat;

        // Get last message text
        const lastMessageText = chat.lastMessage?.text 
          || chat.lastMessage?.image 
            ? "📸 Image" 
            : chat.lastMessage?.voiceUrl 
              ? "🎤 Voice message" 
              : "No messages yet";

        return (
          <div
            key={chat._id}
            onClick={() => setSelectedUser(displayUser)}
            className="flex items-center justify-between p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <div className="flex items-center gap-3 flex-1 min-w-0">
              {/* Avatar with online status */}
              <div className={`avatar ${onlineUsers?.includes(displayUser._id) ? "online" : "offline"}`}>
                <div className="w-12 rounded-full">
                  <img
                    src={displayUser.profilePic || "/avatar.png"}
                    alt={displayUser.fullName}
                  />
                </div>
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-slate-200 font-medium truncate">
                    {displayUser.fullName || "Unknown"}
                  </h4>
                  {onlineUsers?.includes(displayUser._id) && (
                    <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                  )}
                </div>
                <p className="text-sm text-slate-400 truncate">
                  {lastMessageText}
                </p>
              </div>
            </div>

            {/* Last message time */}
            <span className="text-xs text-slate-500 whitespace-nowrap ml-2 flex-shrink-0">
              {chat.lastMessage?.createdAt 
                ? formatChatTime(chat.lastMessage.createdAt) 
                : ""}
            </span>
          </div>
        );
      })}
    </div>
  );
}

export default ChatsList;