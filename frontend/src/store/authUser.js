import { create } from "zustand";
import axios from "axios";
import toast from "react-hot-toast";

export const useAuthStore = create((set) => ({
  user: null,
  isSigningUp: false,
  isCheckingAuth: true,
  isLoggingOut: false,
  signup: async (credentials) => {
    set({ isSigningUp: true });
    try {
      const response = await axios.post("/api/v1/auth/signup", credentials);
      set({ user: response.data.user, isSigningUp: false });
      toast.success("Account created succesfully!");
      return true;
    } catch (error) {
      console.log(error.response.data.message);
      toast.error(error.response.data.message || "Sign Up Failed!");
      set({ isSigningUp: false, user: null });
      return false;
    }
  },
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const response = await axios.post("/api/v1/auth/login", credentials);
      set({ user: response.data.user, isLoggingIn: false });
      toast.success("Logged in successfully!");
      
      return true;
    } catch (error) {
      set({ isLoggingIn: false, user: null });
      toast.error(error.response.data.message || "Login Failed!");
      return false;
    }
  },
  logout: async () => {
    set({ setIsLoggingOut: true });
    try {
      await axios.post("/api/v1/auth/logout");
      set({ user: null, isLoggingOut: false });
      toast.success("Logged out successfully!");
    } catch (error) {
      set({ isLoggingOut: false });
      toast.error(error.response.data.message || "Logout Failed!");
    }
  },
  authCheck: async () => {
    set({ isCheckingAuth: true });
    try {
      const response = await axios.get("/api/v1/auth/authCheck");
      set({ user: response.data.user, isCheckingAuth: false });
    } catch (error) {
      set({ isCheckingAuth: false, user: null });
      console.log(error.response.data.message);
      //toast.error( error.response.data.message || "Authentication Check Failed!");
    }
  },
}));