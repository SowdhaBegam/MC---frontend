export const saveToken = (token) => {
  localStorage.setItem("vendor_token", token);
};

export const getToken = () => {
  return localStorage.getItem("vendor_token");
};

export const removeToken = () => {
  localStorage.removeItem("vendor_token");
};
