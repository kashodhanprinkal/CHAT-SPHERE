import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import CallLogMessage from "./CallLogMessage";
import MessageStatus from "./MessageStatus";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    unsubscribeFromMessages,
    subscribeToMessages,
    updateMessagesStatusByUser,
    updateMessageStatus,        // ✅ ADD THIS - missing function
    markMessagesAsRead,          // ✅ ADD THIS
    fetchMessageStatus,          // ✅ ADD THIS
    
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
  const socket = useAuthStore((state) => state.socket);

  // Merge and sort messages and call logs by timestamp
  const getAllChatItems = () => {
    const messagesWithType = messages.map(msg => ({ ...msg, type: 'message' }));
    const callsWithType = callLogs.map(call => ({ ...call, type: 'call' }));
    const allItems = [...messagesWithType, ...callsWithType];
    return allItems.sort((a, b) => new Date(a.createdAt || a.startedAt) - new Date(b.createdAt || b.startedAt));
  };

  // =========================
  // 📩 FETCH + SOCKET
  // =========================
  useEffect(() => {
    if (selectedUser?._id) {
      getMessagesByUserId(selectedUser._id);
      getCallLogsByUserId(selectedUser._id);
      fetchMessageStatus(selectedUser._id);

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
  // ✅ MARK MESSAGES AS READ WHEN OPENING CHAT
  // =========================
  useEffect(() => {
    if (socket && selectedUser) {
      // Mark messages as read when opening chat
      markMessagesAsRead(selectedUser._id);
    }
  }, [selectedUser, socket, markMessagesAsRead]);

  // =========================
  // ✅ SOCKET LISTENERS FOR STATUS
  // =========================
  useEffect(() => {
    if (!socket || !selectedUser) return;

    // Listen for messages being delivered
    socket.on('messages-delivered', ({ userId }) => {
      if (userId === selectedUser._id) {
        updateMessagesStatusByUser(selectedUser._id, 'delivered');
      }
    });

    // Listen for messages being read
    socket.on('messages-read', ({ userId, fromUser }) => {
      if (userId === selectedUser._id || fromUser === selectedUser._id) {
        updateMessagesStatusByUser(selectedUser._id, 'read');
      }
    });

    // Listen for individual message status updates
    socket.on('message-status-updated', ({ messageId, status, deliveredAt, readAt }) => {
      if (updateMessageStatus) {
        updateMessageStatus(messageId, status, deliveredAt, readAt);
      }
    });

    return () => {
      socket.off('messages-delivered');
      socket.off('messages-read');
      socket.off('message-status-updated');
    };
  }, [socket, selectedUser, updateMessagesStatusByUser, updateMessageStatus]);

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

      {/* Header */}
      <ChatHeader />

      {/* Messages & Call Logs */}
      <div className="flex-1 px-6 overflow-y-auto py-8">

        {(chatItems.length > 0 && !isLoading) ? (

          <div className="max-w-3xl mx-auto space-y-6">

            {chatItems.map((item, index) => (
              item.type === 'message' ? (
                // Message display
                <div
                  key={item._id || index}
                  className={`chat ${item.senderId === authUser?._id ? "chat-end" : "chat-start"}`}
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
                      <p className="break-words">{item.text}</p>
                    )}

                    {/* Voice Message */}
                    {item.messageType === "voice" && item.voiceUrl && (
                      <div className="mt-2">
                        <audio controls className="w-56 rounded-lg">
                          <source src={item.voiceUrl} />
                        </audio>
                        {item.voiceDuration > 0 && (
                          <p className="text-xs opacity-70 mt-1">🎤 {item.voiceDuration}s</p>
                        )}
                      </div>
                    )}

                    {/* Time + Status */}
                    <div className="flex items-center justify-end gap-1 mt-1">
                      <span className="text-xs opacity-70">
                        {new Date(item.createdAt).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <MessageStatus 
                        status={item.status} 
                        isOwn={item.senderId === authUser?._id} 
                      />
                    </div>
                  </div>
                </div>
              ) : (
                // Call log display
                <CallLogMessage 
                  key={item._id || index}
                  callLog={item}
                  isOwn={item.callerId === authUser?._id}
                />
              )
            ))}

            {/* Scroll anchor */}
            <div ref={messageEndRef} />

          </div>

        ) : isLoading ? (

          <MessagesLoadingSkeleton />

        ) : (

          <NoChatHistoryPlaceholder name={selectedUser?.fullName} />

        )}

      </div>

      {/* Typing Indicator */}
      {typingUser?.senderName && (
        <div className="px-6 pb-1">
          <p className="text-xs text-cyan-400 italic animate-pulse">
            {typingUser.senderName} is typing...
          </p>
        </div>
      )}

      {/* Message Input */}
      <MessageInput />

    </div>
  );
}

export default ChatContainer;