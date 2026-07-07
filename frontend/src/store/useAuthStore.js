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
    } catch (error) {
      toast.error("Logout failed");
      console.log(error);
    }
  },

  // ✅ FIXED: Update profile - always include all fields
  updateProfile: async (data) => {
    try {
      const currentUser = get().authUser;
      
      // Send ALL fields to satisfy backend requirement
      const payload = {
        fullName: data.fullName || currentUser?.fullName || "",
        bio: data.bio || currentUser?.bio || "",
        profilePic: currentUser?.profilePic || null
      };
      
      const res = await axiosInstance.put("/auth/update-profile", payload);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
      return res.data;
    } catch (error) {
      console.log("error in update profile");
      toast.error(error.response?.data?.message || "Profile update failed");
      throw error;
    }
  },

  // ✅ FIXED: Update profile picture - always include all fields
  updateProfilePic: async (file) => {
    try {
      if (!file) {
        toast.error("No file selected");
        return;
      }

      // Convert file to base64
      const base64Image = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string' && reader.result.startsWith('data:image/')) {
            resolve(reader.result);
          } else {
            reject(new Error('Invalid image format'));
          }
        };
        reader.onerror = () => reject(new Error('Failed to read file'));
        reader.readAsDataURL(file);
      });

      const currentUser = get().authUser;
      
      // Send ALL fields to satisfy backend requirement
      const res = await axiosInstance.put("/auth/update-profile", {
        profilePic: base64Image,
        fullName: currentUser?.fullName || "",
        bio: currentUser?.bio || ""
      });

      set({ authUser: res.data });
      toast.success("Profile picture updated!");
      return res.data;

    } catch (error) {
      console.error("❌ Profile pic upload error:", error);
      toast.error(error.response?.data?.message || "Failed to update profile picture");
      throw error;
    }
  },

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

  deleteAccount: async () => {
    if (!window.confirm("Are you sure? This cannot be undone!")) return;
    
    try {
      await axiosInstance.delete("/auth/delete-account");
      set({ authUser: null });
      toast.success("Account deleted");
      get().disconnectSocket();
      window.location.href = "/login";
    } catch (error) {
      toast.error("Failed to delete account");
      throw error;
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
}));