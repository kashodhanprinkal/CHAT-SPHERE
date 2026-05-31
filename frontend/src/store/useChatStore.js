import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api";

export const useChatStore = create((set, get) => ({
  allContacts: [],
  chats: [],
  messages: [],
  activeTab: "chats",
  selectedUser: null,
  isUsersLoading: false,
  isMessagesLoading: false,

  // ✅ Typing state
  typingUser: null,

  // ✅ Call logs state
  callLogs: [],
  isCallLogsLoading: false,

  // ✅ Sound
  isSoundEnabled:
    JSON.parse(localStorage.getItem("isSoundEnabled")) === true,

  // =========================
  // 🔊 TOGGLE SOUND
  // =========================
  toggleSound: () => {
    localStorage.setItem("isSoundEnabled", !get().isSoundEnabled);
    set({ isSoundEnabled: !get().isSoundEnabled });
  },

  // =========================
  // 🧭 UI STATE
  // =========================
  setActiveTab: (tab) => set({ activeTab: tab }),

  setSelectedUser: (selectedUser) => set({ selectedUser }),

  // =========================
  // 👥 GET CONTACTS
  // =========================
  getAllContacts: async () => {
    set({ isUsersLoading: true });

    try {
      const res = await axiosInstance.get("/messages/contacts");
      set({ allContacts: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch contacts");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // =========================
  // 💬 GET CHAT PARTNERS
  // =========================
  getMyChatPartners: async () => {
    set({ isUsersLoading: true });

    try {
      const res = await axiosInstance.get("/messages/chats");
      set({ chats: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to fetch chats");
    } finally {
      set({ isUsersLoading: false });
    }
  },

  // =========================
  // 📩 GET MESSAGES
  // =========================
  getMessagesByUserId: async (userId) => {
    set({ isMessagesLoading: true });

    try {
      const res = await axiosInstance.get(`/messages/${userId}`);
      set({ messages: res.data });
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    } finally {
      set({ isMessagesLoading: false });
    }
  },

  // =========================
  // 📤 SEND MESSAGE
  // =========================
  sendMessage: async (messageData) => {
    const { selectedUser, messages } = get();
    const { authUser } = useAuthStore.getState();

    const tempId = `temp-${Date.now()}`;

    // ✅ Optimistic UI
    const optimisticMessage = {
      _id: tempId,
      senderId: authUser._id,
      receiverId: selectedUser._id,
      text: messageData.text,
      image: messageData.image,
      createdAt: new Date().toISOString(),
      isOptimistic: true,
    };

    set({ messages: [...messages, optimisticMessage] });

    try {
      const res = await axiosInstance.post(`/messages/send/${selectedUser._id}`, messageData);

      // ✅ Replace optimistic message
      set({
        messages: get().messages.map((msg) => (msg._id === tempId ? res.data : msg)),
      });
    } catch (error) {
      // ❌ Remove failed optimistic message
      set({
        messages: get().messages.filter((msg) => msg._id !== tempId),
      });
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  },

  // =========================
  // 📞 CALL LOGS
  // =========================
  getCallLogsByUserId: async (userId) => {
    console.log("📞 Fetching call logs for user:", userId);
    set({ isCallLogsLoading: true });
    
    try {
      const res = await axiosInstance.get(`/calls/${userId}`);
      console.log("✅ Call logs fetched:", res.data);
      set({ callLogs: res.data });
    } catch (error) {
      console.error("Error fetching call logs:", error);
      set({ callLogs: [] });
    } finally {
      set({ isCallLogsLoading: false });
    }
  },

  // =========================
  // 🔔 REALTIME MESSAGE SUBSCRIBE
  // =========================
  subscribeToMessages: () => {
    const { selectedUser, isSoundEnabled } = get();
    if (!selectedUser) return;

    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    // ✅ Prevent duplicate listeners
    socket.off("newMessage");

    socket.on("newMessage", (newMessage) => {
      const isMessageFromSelectedUser = newMessage.senderId === selectedUser._id;

      if (!isMessageFromSelectedUser) return;

      const currentMessages = get().messages;

      set({ messages: [...currentMessages, newMessage] });

      // 🔊 Play sound
      if (isSoundEnabled) {
        const notificationSound = new Audio("/sounds/notification.mp3");
        notificationSound.currentTime = 0;
        notificationSound.play().catch((e) => {
          console.log("Audio play failed", e);
        });
      }
    });
  },

  // =========================
  // ❌ UNSUBSCRIBE MESSAGES
  // =========================
  unsubscribeFromMessages: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("newMessage");
  },

  // =========================
  // ✍️ SUBSCRIBE TYPING
  // =========================
  subscribeToTyping: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("typing");

    socket.on("typing", (data) => {
      console.log("Typing event:", data);
      set({ typingUser: { senderName: data?.senderName || "Someone" } });
      
      // auto clear after 2 sec
      setTimeout(() => {
        set({ typingUser: null });
      }, 2000);
    });
  },

  // =========================
  // ❌ UNSUBSCRIBE TYPING
  // =========================
  unsubscribeFromTyping: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("typing");
    set({ typingUser: null });
  },

  // =========================
  // 📞 SUBSCRIBE TO CALL LOGS
  // =========================
  subscribeToCallLogs: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;

    socket.off("new-call-log");

    socket.on("new-call-log", (callLog) => {
      console.log("📞 New call log received:", callLog);
      const { selectedUser } = get();
      
      // Only add if it's related to the selected user
      if (selectedUser && 
          (callLog.callerId === selectedUser._id || callLog.receiverId === selectedUser._id)) {
        set((state) => ({
          callLogs: [callLog, ...state.callLogs].slice(0, 50)
        }));
      }
    });
  },

  // =========================
  // ❌ UNSUBSCRIBE FROM CALL LOGS
  // =========================
  unsubscribeFromCallLogs: () => {
    const socket = useAuthStore.getState().socket;
    if (!socket) return;
    socket.off("new-call-log");
  },

  // =========================
  // 🧹 RESET
  // =========================
  reset: () => {
    set({
      messages: [],
      selectedUser: null,
      typingUser: null,
      callLogs: [],
      allContacts: [],
      chats: [],
    });
  },
}));