import axios from "axios";

const API_URL = "http://localhost:8080/api/v1/category";

// Ana kategorileri getir
export const fetchCategories = async () => {
  const response = await axios.get(`${API_URL}/parent`);
  return response.data;
};

export const fetchSubCategories = async () => {
  const response = await axios.get(`${API_URL}/subcategory`);
  return response.data;
};
