import api from "../api/axios";


// ✅ GET vendor profile
export const getVendorProfile = async () => {
  const res = await api.get("/vendor/profile");
  return res.data.data; // backend: { success, data }
};

// ✅ UPDATE vendor profile
export const updateVendorProfile = async (payload) => {
  const res = await api.put("/vendor/profile", payload);
  return res.data;
};