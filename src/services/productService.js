import axios from "../api/axios"; // this already has baseURL + interceptor

export const addProductAPI = async (productData) => {
  try {
    const res = await axios.post("/products", productData);
    return res.data;
  } catch (err) {
    console.log("FULL ERROR →", err.response);   // 👈 ADD THIS
    console.log("ERROR DATA →", err.response?.data);
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
export const getCategoriesAPI = async () => {
  const res = await axios.get("/common/categories");
  return res.data;
};
export const getSubCategoriesAPI = async (categoryId) => {
  const res = await axios.get(`/common/categories/${categoryId}/subcategories`);
  return res.data;
};




