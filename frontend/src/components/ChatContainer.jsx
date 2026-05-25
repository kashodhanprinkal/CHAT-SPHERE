import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    unsubscribeFromMessages,
    subscribeToMessages,

    // ✅ Typing
    typingUser,
    subscribeToTyping,
    unsubscribeFromTyping,
  } = useChatStore();

  const { authUser } = useAuthStore();

  const messageEndRef = useRef(null);

  // =========================
  // 📩 FETCH + SOCKET
  // =========================
  useEffect(() => {
    if (selectedUser?._id) {
      getMessagesByUserId(selectedUser._id);

      subscribeToMessages();
      subscribeToTyping();

      return () => {
        unsubscribeFromMessages();
        unsubscribeFromTyping();
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
  }, [messages]);

  return (
    <div className="flex flex-col h-full">

      {/* ================= HEADER ================= */}
      <ChatHeader />

      {/* ================= MESSAGES ================= */}
      <div className="flex-1 px-6 overflow-y-auto py-8">

        {messages.length > 0 && !isMessagesLoading ? (

          <div className="max-w-3xl mx-auto space-y-6">

            {messages.map((msg) => (
              <div
                key={msg._id}
                className={`chat ${
                  msg.senderId === authUser?._id
                    ? "chat-end"
                    : "chat-start"
                }`}
              >

                <div
                  className={`chat-bubble relative ${
                    msg.senderId === authUser?._id
                      ? "bg-cyan-600 text-white"
                      : "bg-slate-800 text-slate-200"
                  }`}
                >

                  {/* ================= IMAGE ================= */}
                  {msg.image && (
                    <img
                      src={msg.image}
                      alt="shared"
                      className="rounded-lg mb-2 max-w-xs object-cover"
                    />
                  )}

                  {/* ================= TEXT ================= */}
                  {msg.text && (
                    <p className="break-words">
                      {msg.text}
                    </p>
                  )}

                  {/* ================= VOICE ================= */}
                  {msg.messageType === "voice" &&
                    msg.voiceUrl && (
                      <div className="mt-2">

                        <audio
                          controls
                          className="w-56 rounded-lg"
                        >
                          <source
                            src={msg.voiceUrl}
                          />
                        </audio>

                        {/* Duration */}
                        {msg.voiceDuration > 0 && (
                          <p className="text-xs opacity-70 mt-1">
                            🎤 {msg.voiceDuration}s
                          </p>
                        )}
                      </div>
                    )}

                  {/* ================= TIME ================= */}
                  <span className="block text-xs opacity-70 mt-2">
                    {new Date(
                      msg.createdAt
                    ).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>

                </div>
              </div>
            ))}

            {/* 🔽 Scroll anchor */}
            <div ref={messageEndRef} />

          </div>

        ) : isMessagesLoading ? (

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