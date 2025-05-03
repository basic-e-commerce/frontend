import axios from "axios";
import { BASE_URL } from "../config/baseApi";

const API_URL = `${BASE_URL}/api/v1/product`;

// Küçük ürünleri getir
export const fetchProducts = async () => {
  const response = await axios.get(`${API_URL}`);
  return response.data;
};

// Belirli kategoriye ait ürünleri getir
export const fetchProductsByCategory = async (categoryLinkName) => {
  const response = await axios.get(
    `${API_URL}/categoryLinkName=${categoryLinkName}`
  );
  return response.data;
};

// Tek bir ürünün detayını getir
export const fetchProductDetail = async (linkName) => {
  const response = await axios.get(`${API_URL}/name/${linkName}`);
  return response.data;
};
