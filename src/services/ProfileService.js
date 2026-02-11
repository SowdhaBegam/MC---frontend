import api from "../api/axios";


// ✅ GET vendor profile
export const getVendorProfile = async () => {
  const res = await api.get("/api/vendor/profile");
  return res.data.data; // backend: { success, data }
};

// ✅ UPDATE vendor profile
export const updateVendorProfile = async (data) => {
  try {
    const res = await api.put("/api/vendor/profile", data);
    return res.data;
  } catch (err) {
    console.log("🔥 BACKEND ERROR:", err.response?.data);
    console.log("🔥 STATUS:", err.response?.status);
    throw err;
  }
};
