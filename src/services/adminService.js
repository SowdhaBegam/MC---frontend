import axios from "axios";

const API = "https://mc-platform-m62bw4ztc-sangeetha-lakshmis-projects.vercel.app/api";

export const getPendingShops = (token) =>
  axios.get(`${API}/admin/pending`, {
    headers: { Authorization: `Bearer ${token}` },
  });

export const approveShop = (id, token) =>
  axios.put(`${API}/admin/approve/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });

// Optional decline
export const declineShop = (id, token) =>
  axios.put(`${API}/admin/decline/${id}`, {}, {
    headers: { Authorization: `Bearer ${token}` },
  });
