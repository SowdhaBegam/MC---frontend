import API from "../api/axios";

// No token needed here — interceptor already adds it

export const getPendingShops = () =>
  API.get("/api/admin/pending");

export const approveShop = (id) =>
  API.put(`/api/admin/approve/${id}`);

export const declineShop = (id) =>
  API.put(`/api/admin/decline/${id}`);

export const getApprovedShops = () =>
  API.get("/api/admin/vendors/approved");
