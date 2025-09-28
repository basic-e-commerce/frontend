import axios from "axios";
import { BASE_URL } from "../config/baseApi";
import api from "./api";

const API_URL = `${BASE_URL}/api/v1/product`;

// Küçük ürünleri getir

export const fetchProducts = async () => {
  const response = await axios.post(`${API_URL}/filter/small`, {
    categoryId: null,
    minPrice: 0.0,
    maxPrice: 99999999.0,
    sortBy: "comparePrice",
    sortDirection: "asc",
  });
  return response.data;
};

// Belirli kategoriye ait ürünleri getir
export const fetchProductsByCategoryAdmin = async (categoryId) => {
  const response = await api.post(`${API_URL}/filter?page=0&size=99999999`, {
    categoryId: categoryId,
    minPrice: 0.0,
    maxPrice: 590000000.0,
    sortBy: "comparePrice",
    sortDirection: "asc",
  });
  return response.data;
};

export const fetchProductsByCategory = async (categoryId) => {
  const response = await axios.post(`${API_URL}/filter/small`, {
    categoryId: categoryId,
    minPrice: 0.0,
    maxPrice: 99999999.0,
    sortBy: "comparePrice",
    sortDirection: "asc",
  });
  return response.data;
};

export const fetchProductsByCategoryLinkName = async (linkName, min, max) => {
  const response = await axios.post(
    `${API_URL}/filter/small/link-name?page=0&size=99999999`,
    {
      linkName: linkName,
      minPrice: min,
      maxPrice: max,
      sortBy: "comparePrice",
      sortDirection: "asc",
    }
  );
  return response.data;
};

// Tek bir ürünün detayını getir
export const fetchProductDetail = async (linkName) => {
  const response = await axios.get(`${API_URL}/name/${linkName}`);
  return response.data;
};

export const fetchAdminProductDetail = async (linkName) => {
  const response = await api.get(`${API_URL}/name/admin/${linkName}`);
  return response.data;
};

export const createProduct = async (formData) => {
  const response = await api.post(`${API_URL}/simple`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateProductText = async (id, formData) => {
  const response = await api.put(`${API_URL}?id=${id}`, formData);
  return response.data;
};

export const deleteCoverImgProduct = async (id) => {
  const response = await api.delete(`${API_URL}/cover-image?id=${id}`);
  return response.data;
};

export const updateCoverImgProduct = async (kapakData) => {
  const response = await api.put(`${API_URL}/cover-image`, kapakData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateImgsProduct = async (id, newFile) => {
  const response = await api.put(`${API_URL}/product-image?id=${id}`, newFile, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
