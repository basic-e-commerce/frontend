import axios from "axios";
import { BASE_URL } from "../config/baseApi";
import api from "./api";

const API_URL = `${BASE_URL}/api/v1/category`;

export const fetchCategories = async () => {
  const response = await axios.get(`${API_URL}/parent`);
  return response.data;
};

export const fetchCategoryByLinkName = async (linkName) => {
  const response = await axios.get(
    `${API_URL}/by-link-name?linkName=${linkName}`
  );
  return response.data;
};

export const createCategory = async (item) => {
  const response = await api.post(`${API_URL}`, item, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateCategoryText = async (item) => {
  const response = await api.put(`${API_URL}`, item);
  return response.data;
};

export const deleteCategory = async (id) => {
  const response = await api.delete(`${API_URL}?id=${id}`);
  return response.data;
};

export const updateCategoryImage = async (id, image) => {
  const response = await api.put(`${API_URL}/image?id=${id}`, image, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
  return response.data;
};

export const deleteCoverImgCategory = async (id) => {
  const response = await api.put(`${API_URL}/image?id=${id}`);
  return response.data;
};
