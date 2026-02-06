import axios from "axios";

const API = axios.create({
  baseURL: "https://mc-platform-3zu9n1qmr-sangeetha-lakshmis-projects.vercel.app/api",
});

export const addProductAPI = async (productData) => {
  try {
    const res = await API.post("/products", productData);
    return res.data;
  } catch (err) {
    console.error("Add Product Error:", err);
    throw err;
  }
};
