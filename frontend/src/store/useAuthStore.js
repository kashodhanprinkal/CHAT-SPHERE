import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  authUser: null,
  isCheckingAuth: true,
  isSigningUp: false,
  isloggingIn: false,
  

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });
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
    } catch (error) {
      const message =
        error.response?.data?.message || "Signup failed";

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

      toast.success("logged in successfully!");
    } catch (error) {
      const message =
        error.response?.data?.message || "Signup failed";

      toast.error(message);
    } finally {
      set({ isloggingIn: false });
    }
  },

logout: async () => {
  try {
    const res = await axiosInstance.post("/auth/logout");

    set({ authUser: null });

    toast.success("Logged out successfully");
  } catch (error) {
    toast.error("Logout failed");
    console.log(error);
  }
},

updateProfile: async(data)=>{
try {
  const res= await axiosInstance.put("/auth/update-profile",data)
  set ({authUser:res.data})
  toast.success("profile updated successfully")
} catch (error) {
  console.log("error in update profile")
  toast.error(error.response.data.message)
}
}


}));