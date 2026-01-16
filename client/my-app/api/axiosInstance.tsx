import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000",
  withCredentials: true,
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    if (token){
      config.headers.Authorization = `Bearer ${token}`;
      config.headers["Content-Type"]="application/json"
    };
  }
  return config;
});

export default api;
