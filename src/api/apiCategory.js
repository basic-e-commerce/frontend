import axios from "axios";

const API_URL = "https://litysofttest1.site/api/v1/category";

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
