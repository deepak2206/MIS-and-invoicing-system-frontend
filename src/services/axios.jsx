// src/services/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://internshipproject-backend.onrender.com", // ✅ backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// 🔥 Add Interceptor to attach Authorization header
instance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // get token from local storage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`; // Attach token
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default instance;