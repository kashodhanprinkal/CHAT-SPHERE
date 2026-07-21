import axios from "axios";

// Development -> localhost
// Production -> Same domain (/api)
const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:3000/api"
    : "/api";

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

// Add JWT token to every request
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    console.log("📤", config.method?.toUpperCase(), config.url);

    return config;
  },
  (error) => Promise.reject(error)
);

// Log responses
axiosInstance.interceptors.response.use(
  (response) => {
    console.log("📥", response.status);
    return response;
  },
  (error) => {
    console.error("❌", error.response?.status, error.response?.data);
    return Promise.reject(error);
  }
);