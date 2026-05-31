import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import CallLogMessage from "./CallLogMessage";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    unsubscribeFromMessages,
    subscribeToMessages,
    
    // Call logs
    callLogs,
    getCallLogsByUserId,
    isCallLogsLoading,
    subscribeToCallLogs,
    unsubscribeFromCallLogs,

    // Typing
    typingUser,
    subscribeToTyping,
    unsubscribeFromTyping,
  } = useChatStore();

  const { authUser } = useAuthStore();

  const messageEndRef = useRef(null);

  // Merge and sort messages and call logs by timestamp
  const getAllChatItems = () => {
    const messagesWithType = messages.map(msg => ({ ...msg, type: 'message' }));
    const callsWithType = callLogs.map(call => ({ ...call, type: 'call' }));
    
    const allItems = [...messagesWithType, ...callsWithType];
    return allItems.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  };

  // =========================
  // 📩 FETCH + SOCKET
  // =========================
  useEffect(() => {
    if (selectedUser?._id) {
      getMessagesByUserId(selectedUser._id);
      getCallLogsByUserId(selectedUser._id);

      subscribeToMessages();
      subscribeToTyping();
      subscribeToCallLogs();

      return () => {
        unsubscribeFromMessages();
        unsubscribeFromTyping();
        unsubscribeFromCallLogs();
      };
    }
  }, [selectedUser]);

  // =========================
  // 🔽 AUTO SCROLL
  // =========================
  useEffect(() => {
    if (messageEndRef.current) {
      messageEndRef.current.scrollIntoView({
        behavior: "smooth",
      });
    }
  }, [messages, callLogs]);

  const chatItems = getAllChatItems();
  const isLoading = isMessagesLoading || isCallLogsLoading;

  return (
    <div className="flex flex-col h-full">

      {/* ================= HEADER ================= */}
      <ChatHeader />

      {/* ================= MESSAGES & CALL LOGS ================= */}
      <div className="flex-1 px-6 overflow-y-auto py-8">

        {(chatItems.length > 0 && !isLoading) ? (

          <div className="max-w-3xl mx-auto space-y-6">

            {chatItems.map((item) => (
              item.type === 'message' ? (
                // Message display
                <div
                  key={item._id}
                  className={`chat ${
                    item.senderId === authUser?._id
                      ? "chat-end"
                      : "chat-start"
                  }`}
                >
                  <div
                    className={`chat-bubble relative ${
                      item.senderId === authUser?._id
                        ? "bg-cyan-600 text-white"
                        : "bg-slate-800 text-slate-200"
                    }`}
                  >
                    {/* Image */}
                    {item.image && (
                      <img
                        src={item.image}
                        alt="shared"
                        className="rounded-lg mb-2 max-w-xs object-cover"
                      />
                    )}

                    {/* Text */}
                    {item.text && (
                      <p className="break-words">
                        {item.text}
                      </p>
                    )}

                    {/* Voice Message */}
                    {item.messageType === "voice" &&
                      item.voiceUrl && (
                        <div className="mt-2">
                          <audio
                            controls
                            className="w-56 rounded-lg"
                          >
                            <source
                              src={item.voiceUrl}
                            />
                          </audio>
                          {item.voiceDuration > 0 && (
                            <p className="text-xs opacity-70 mt-1">
                              🎤 {item.voiceDuration}s
                            </p>
                          )}
                        </div>
                      )}

                    {/* Time */}
                    <span className="block text-xs opacity-70 mt-2">
                      {new Date(
                        item.createdAt
                      ).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </span>
                  </div>
                </div>
              ) : (
                // Call log display
                <CallLogMessage 
                  key={item._id}
                  callLog={item}
                  isOwn={item.senderId === authUser?._id}
                />
              )
            ))}

            {/* Scroll anchor */}
            <div ref={messageEndRef} />

          </div>

        ) : isLoading ? (

          <MessagesLoadingSkeleton />

        ) : (

          <NoChatHistoryPlaceholder
            name={selectedUser?.fullName}
          />

        )}

      </div>

      {/* ================= TYPING ================= */}
      {typingUser?.senderName && (
        <div className="px-6 pb-1">
          <p className="text-xs text-cyan-400 italic animate-pulse">
            {typingUser.senderName} is typing...
          </p>
        </div>
      )}

      {/* ================= INPUT ================= */}
      <MessageInput />

    </div>
  );
}

export default ChatContainer;