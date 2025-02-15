import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/product";

// Küçük ürünleri getir
export const fetchProducts = async () => {
  const response = await axios.get(`${API_URL}/small`);
  return response.data;
};

// Belirli kategoriye ait ürünleri getir
export const fetchProductsByCategory = async (categoryId) => {
  const response = await axios.get(
    `${API_URL}/category?categoryId=${categoryId}`
  );
  return response.data;
};

// Tek bir ürünün detayını getir
export const fetchProductDetail = async (id) => {
  const response = await axios.get(`${API_URL}/by-id?id=${id}`);
  return response.data;
};
