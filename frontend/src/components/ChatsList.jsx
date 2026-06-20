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
    <div className="space-y-2">
      {chats.map((chat) => {
        // Get the other participant (not the current user)
        const otherParticipant = chat.participants?.find(
          (p) => p._id !== useAuthStore.getState().authUser?._id
        );

        return (
          <div
            key={chat._id}
            onClick={() => setSelectedUser(otherParticipant)}
            className="p-3 rounded-lg bg-white/5 hover:bg-white/10 transition-colors cursor-pointer"
          >
            <div className="flex justify-between items-start">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h4 className="text-slate-200 font-medium truncate">
                    {otherParticipant?.fullName || "Unknown"}
                  </h4>
                  {/* Online indicator */}
                  {onlineUsers?.includes(otherParticipant?._id) && (
                    <span className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0"></span>
                  )}
                </div>
                <p className="text-sm text-slate-400 truncate">
                  {chat.lastMessage?.text || "No messages yet"}
                </p>
              </div>
              <span className="text-xs text-slate-500 whitespace-nowrap ml-2 flex-shrink-0">
                {chat.lastMessage?.createdAt 
                  ? formatChatTime(chat.lastMessage.createdAt) 
                  : ""}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ChatsList;