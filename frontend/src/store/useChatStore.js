import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { useAuthStore } from "./useAuthStore";

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

  setActiveTab: (tab) => set({ activeTab: tab }),
  setSelectedUser: (selectedUser) => set({ selectedUser }),

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

      set({
        allContacts: res.data,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch contacts"
      );
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

      set({
        chats: res.data,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Failed to fetch chats"
      );
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

      set({
        messages: res.data,
      });
    } catch (error) {
      toast.error(
        error.response?.data?.message || error.message
      );
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

    set({
      messages: [...messages, optimisticMessage],
    });

    try {
      const res = await axiosInstance.post(
        `/messages/send/${selectedUser._id}`,
        messageData
      );

      // ✅ Replace optimistic message
      set({
        messages: get().messages.map((msg) =>
          msg._id === tempId ? res.data : msg
        ),
      });
    } catch (error) {
      // ❌ Remove failed optimistic message
      set({
        messages: get().messages.filter(
          (msg) => msg._id !== tempId
        ),
      });

      toast.error(
        error.response?.data?.message ||
          "Something went wrong"
      );
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
      const isMessageFromSelectedUser =
        newMessage.senderId === selectedUser._id;

      if (!isMessageFromSelectedUser) return;

      const currentMessages = get().messages;

      set({
        messages: [...currentMessages, newMessage],
      });

      // 🔊 Play sound
      if (isSoundEnabled) {
        const notificationSound = new Audio(
          "/sounds/notification.mp3"
        );

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

    set({
      typingUser: {
        senderName: data?.senderName || "Someone",
      },
    });

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

  set({
    typingUser: null,
  });
},
}));