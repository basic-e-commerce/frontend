import axios from "axios";
import {API_URLS} from "../utils/config";

const API_URL = API_URLS.CATEGORY;

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
