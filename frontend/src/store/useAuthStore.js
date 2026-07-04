import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development" ? "http://localhost:3000" : "/";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isloggingIn: false,
  socket: null,
  onlineUsers: [],

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
      get().connectSocket();
    } catch (error) {
      console.log("error in authcheck:", error);
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (data) => {
    set({ isSigningUp: true });

    try {
      const res = await axiosInstance.post("/auth/signup", data);
      set({ authUser: res.data });
      toast.success("Account created successfully!");
      get().connectSocket();
      // ✅ No redirect here - handled in component
    } catch (error) {
      const message = error.response?.data?.message || "Signup failed";
      toast.error(message);
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (data) => {
    set({ isloggingIn: true });

    try {
      const res = await axiosInstance.post("/auth/login", data);
      set({ authUser: res.data });
      toast.success("Logged in successfully!");
      get().connectSocket();
      // ✅ No redirect here - handled in component
    } catch (error) {
      const message = error.response?.data?.message || "Login failed";
      toast.error(message);
    } finally {
      set({ isloggingIn: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      set({ authUser: null });
      toast.success("Logged out successfully");
      get().disconnectSocket();
      // ✅ No redirect here - handled in component
    } catch (error) {
      toast.error("Logout failed");
      console.log(error);
    }
  },

  updateProfile: async (data) => {
    try {
      const res = await axiosInstance.put("/auth/update-profile", data);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (error) {
      console.log("error in update profile");
      toast.error(error.response?.data?.message || "Profile update failed");
    }
  },

  connectSocket: () => {
    const { authUser, socket } = get();

    if (!authUser || socket?.connected) return;

    const newSocket = io(BASE_URL, {
      withCredentials: true,
    });

    set({ socket: newSocket });

    newSocket.on("getOnlineUsers", (userIds) => {
      set({ onlineUsers: userIds });
    });
  },

  disconnectSocket: () => {
    const socket = get().socket;

    if (socket?.connected) {
      socket.off();
      socket.disconnect();
    }
  },
// 👤 PROFILE METHODS

// Update name & bio
updateProfile: async (data) => {
  try {
    const res = await axiosInstance.put("/auth/update-profile", data);
    set({ authUser: res.data });
    toast.success("Profile updated successfully");
    return res.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to update profile");
    throw error;
  }
},

// Update profile picture
updateProfilePic: async (file) => {
  try {
    const formData = new FormData();
    formData.append("profilePic", file);
    
    const res = await axiosInstance.put("/auth/update-profile-pic", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    
    set({ authUser: res.data });
    toast.success("Profile picture updated");
    return res.data;
  } catch (error) {
    toast.error("Failed to update profile picture");
    throw error;
  }
},

// Change password
changePassword: async (passwordData) => {
  try {
    const res = await axiosInstance.put("/auth/change-password", passwordData);
    toast.success("Password changed successfully");
    return res.data;
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to change password");
    throw error;
  }
},

// Delete account
deleteAccount: async () => {
  if (!window.confirm("Are you sure? This cannot be undone!")) return;
  
  try {
    await axiosInstance.delete("/auth/delete-account");
    set({ authUser: null });
    toast.success("Account deleted");
    window.location.href = "/login";
  } catch (error) {
    toast.error("Failed to delete account");
    throw error;
  }
},
}));