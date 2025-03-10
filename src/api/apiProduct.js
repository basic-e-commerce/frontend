import axios from "axios";
import { BASE_URL } from "../config/baseApi";

const API_URL = `${BASE_URL}/api/v1/product`;

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
