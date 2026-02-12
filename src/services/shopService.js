// src/services/shopService.js
import api from "../api/axios";   // use centralized axios

// GET all registered shops (admin)
export const getRegisteredShops = async () => {
  try {
    const res = await api.get("/api/admin/shops");
    return res.data;
  } catch (err) {
    console.error("Fetch Shops Error 👉", err.response?.data || err.message);
    throw err;
  }
};
export const getCategoryCounts = async () => {
  try {
    const res = await api.get("/api/admin/category-count");
    return res.data;
  } catch (err) {
    console.error("Fetch Category Count Error 👉", err.response?.data || err.message);
    throw err;
  }
};