import api from "../api/axios"; // your axios instance

// 🔹 GET All Delivery Agents
export const getDeliveryAgents = async () => {
  const response = await api.get("/api/admin/deliveries");
  return response.data;
};

// 🔹 DELETE Delivery Agent
export const deleteDeliveryAgent = async (id) => {
  const response = await api.delete(`/api/admin/deliveries/${id}`);
  return response.data;
};

// 🔹 UPDATE Agent Profile (Edit)
export const updateDeliveryAgent = async (id, data) => {
  const response = await api.put(
    `/api/admin/deliveries/edit-profile-id/${id}`,
    data
  );
  return response.data;
};
