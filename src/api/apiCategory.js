import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/category";

// Ana kategorileri getir
export const fetchCategories = async () => {
  const response = await axios.get(`${API_URL}/parent`);
  return response.data;
};

// Alt Kategorileri Getir
export const fetchSubCategories = async () => {
  const response = await axios.get(`${API_URL}/sub-categories`);
  return response.data;
};
