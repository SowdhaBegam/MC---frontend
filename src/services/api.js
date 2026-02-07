import axios from "axios";
import { getToken } from "../utils/authStorage";

const api = axios.create({
  baseURL: "https://mc-platform-fjk0ii4pt-sangeetha-lakshmis-projects.vercel.app/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;