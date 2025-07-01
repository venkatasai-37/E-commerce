import axios from "axios";

const API_BASE = "http://localhost:5000/cart";

export const getCart = async () => {
  const res = await axios.get(`${API_BASE}`);
  return res.data;
};

export const addToCart = async (productId, quantity = 1) => {
  const res = await axios.post(`${API_BASE}/add`, { productId, quantity });
  return res.data;
};

export const removeFromCart = async (productId) => {
  const res = await axios.post(`${API_BASE}/remove`, { productId });
  return res.data;
};

export const clearCart = async () => {
  const res = await axios.post(`${API_BASE}/clear`);
  return res.data;
};
