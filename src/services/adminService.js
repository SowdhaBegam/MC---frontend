import API from "../api/axios";

// No token needed here — interceptor already adds it

export const getPendingShops = () =>
  API.get("/admin/pending");

export const approveShop = (id) =>
  API.put(`/admin/approve/${id}`);

export const declineShop = (id) =>
  API.put(`/admin/decline/${id}`);

export const getApprovedShops = () =>
  API.get("/admin/vendors/approved");
