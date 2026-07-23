import React, { useEffect, useRef } from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import ChatHeader from "./ChatHeader";
import NoChatHistoryPlaceholder from "./NoChatHistoryPlaceholder";
import MessageInput from "./MessageInput";
import MessagesLoadingSkeleton from "./MessagesLoadingSkeleton";
import CallLogMessage from "./CallLogMessage";
import MessageStatus from "./MessageStatus";
import { formatMessageTime, getDateGroupLabel, isSameDay } from "../lib/time";

function ChatContainer() {
  const {
    selectedUser,
    getMessagesByUserId,
    messages,
    isMessagesLoading,
    unsubscribeFromMessages,
    subscribeToMessages,
    updateMessagesStatusByUser,
    updateMessageStatus,
    markMessagesAsRead,
    fetchMessageStatus,
    callLogs,
    getCallLogsByUserId,
    isCallLogsLoading,
    subscribeToCallLogs,
    unsubscribeFromCallLogs,
    typingUser,
    subscribeToTyping,
    unsubscribeFromTyping,
  } = useChatStore();

  const { authUser } = useAuthStore();
  const messageEndRef = useRef(null);
  const socket = useAuthStore((state) => state.socket);

  const getAllChatItems = () => {
    const messagesWithType = messages.map(msg => ({ ...msg, type: 'message' }));
    const callsWithType = callLogs.map(call => ({ ...call, type: 'call' }));
    const allItems = [...messagesWithType, ...callsWithType];
    return allItems.sort((a, b) => new Date(a.createdAt || a.startedAt) - new Date(b.createdAt || b.startedAt));
  };

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

  useEffect(() => {
    if (socket && selectedUser) {
      markMessagesAsRead(selectedUser._id);
    }
  }, [selectedUser, socket, markMessagesAsRead]);

  useEffect(() => {
    if (!socket || !selectedUser) return;

    socket.on('messages-delivered', ({ userId }) => {
      if (userId === selectedUser._id) {
        updateMessagesStatusByUser(selectedUser._id, 'delivered');
      }
    });

    socket.on('messages-read', ({ userId, fromUser }) => {
      if (userId === selectedUser._id || fromUser === selectedUser._id) {
        updateMessagesStatusByUser(selectedUser._id, 'read');
      }
    });

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
    <div className="flex flex-col h-full bg-black text-gray-100 transition-colors duration-200">
      {/* Header */}
      <ChatHeader />

      {/* Messages & Call Logs */}
      <div className="flex-1 px-4 sm:px-6 overflow-y-auto py-4 sm:py-8">
        {(chatItems.length > 0 && !isLoading) ? (
          <div className="max-w-4xl mx-auto space-y-4 sm:space-y-6">
            {chatItems.map((item, index) => {
              const itemDate = item.createdAt || item.startedAt;
              const prevDate = index > 0 ? (chatItems[index - 1]?.createdAt || chatItems[index - 1]?.startedAt) : null;
              const showDateGroup = index === 0 || !isSameDay(itemDate, prevDate);
              
              return (
                <React.Fragment key={item._id || index}>
                  {showDateGroup && itemDate && (
                    <div className="flex justify-center my-4 sm:my-6">
                      <span className="text-xs font-medium text-gray-400 bg-gray-800/80 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm border border-gray-700/50">
                        {getDateGroupLabel(itemDate)}
                      </span>
                    </div>
                  )}
                  
                  {item.type === 'message' ? (
                    <div
                      className={`chat ${item.senderId === authUser?._id ? "chat-end" : "chat-start"}`}
                    >
                      <div
                        className={`chat-bubble relative shadow-md transition-all duration-200 ${
                          item.senderId === authUser?._id
                            ? "bg-gray-700 text-white hover:shadow-gray-600/20"
                            : "bg-gray-800 text-gray-100 hover:shadow-gray-700/10"
                        }`}
                      >
                        {/* Image */}
                        {item.image && (
                          <img
                            src={item.image}
                            alt="shared"
                            className="rounded-lg mb-2 max-w-xs object-cover shadow-sm"
                          />
                        )}

                        {/* Text */}
                        {item.text && (
                          <p className="break-words leading-relaxed">{item.text}</p>
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
                        <div className="flex items-center justify-end gap-1.5 mt-1.5">
                          <span className={`text-[10px] sm:text-xs ${
                            item.senderId === authUser?._id 
                              ? "text-gray-300" 
                              : "text-gray-500"
                          }`}>
                            {formatMessageTime(item.createdAt)}
                          </span>
                          <MessageStatus 
                            status={item.status} 
                            isOwn={item.senderId === authUser?._id} 
                            createdAt={item.createdAt}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <CallLogMessage 
                      key={item._id || index}
                      callLog={item}
                      isOwn={item.callerId === authUser?._id}
                    />
                  )}
                </React.Fragment>
              );
            })}

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
        <div className="px-4 sm:px-6 pb-1.5">
          <p className="text-xs font-medium text-gray-300 italic animate-pulse flex items-center gap-2">
            <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
            <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <span className="inline-block w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
            <span className="ml-1">{typingUser.senderName} is typing...</span>
          </p>
        </div>
      )}

      {/* Message Input */}
      <MessageInput />
    </div>
  );
}

export default ChatContainer;