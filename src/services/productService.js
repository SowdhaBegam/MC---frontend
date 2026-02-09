import axios from "../api/axios"; // this already has baseURL + interceptor

export const addProductAPI = async (productData) => {
  try {
    const res = await axios.post("/products", productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
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
export const updateProductAPI = async (id, data) => {
  const res = await axios.put(`/products/${id}`, data);
  return res.data;
};
export const deleteProductAPI = async (id) => {
  const res = await axios.delete(`/products/${id}`);
  return res.data;
};



