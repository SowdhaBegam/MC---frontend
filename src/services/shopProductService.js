import API from "../api/axios";   // ✅ same style as your project

// 🔵 GET ALL PRODUCTS (Shop / Public Side)
export const getAllProducts = async () => {
  try {
    const response = await API.get("/api/products");
    return response.data;
  } catch (error) {
    console.error(
      "Error fetching public products 👉",
      error.response?.data || error.message
    );
    throw error;
  }
};
