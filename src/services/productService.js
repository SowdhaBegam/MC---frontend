import axios from "../api/axios"; // this already has baseURL + interceptor

export const addProductAPI = async (productData) => {
  try {
    const res = await axios.post("/products", productData);
    return res.data;
  } catch (err) {
    console.error("Add Product Error:", err);
    throw err;
  }
};
export const getProductsAPI = async () => {
  try {
    const res = await axios.get("/products");
    return res.data;
  } catch (err) {
    console.error("Get Products Error:", err);
    throw err;
  }
};

