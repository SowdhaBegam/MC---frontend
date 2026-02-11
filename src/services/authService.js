import api from "../api/axios";

// REGISTER
export const vendorRegister = (data) => {
  return api.post("/api/vendor/register", data);
};

// LOGIN
export const vendorLogin = (data) => {
  return api.post("/api/auth/login", data);
};

// ADMIN LOGIN  ✅ ADD THIS
export const adminLogin = (data) => {
  return api.post("/api/auth/login", data);
};
