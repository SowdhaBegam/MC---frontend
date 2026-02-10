import axios from "axios";
import { getToken } from "../utils/authStorage";

const instance = axios.create({
  baseURL: "https://mc-platform-mo0oz7znm-sangeetha-lakshmis-projects.vercel.app/api",
});

instance.interceptors.request.use((config) => {
  const token = getToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const acceptOrder = (id) =>
  instance.put(`shop/orders/${id}/accept`);

export const markReady = (id) =>
  instance.put(`shop/orders/${id}/ready`);

export const completeOrder = (id) =>
  instance.put(`shop/orders/${id}/completed`);

export default instance;
