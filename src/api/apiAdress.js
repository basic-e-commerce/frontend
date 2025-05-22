import { BASE_URL } from "../config/baseApi";
import api from "./api";

const API_URL = `${BASE_URL}/api/v1`;

export const getAdress = async () => {
  const response = await api.get(`${API_URL}/customer/address`);
  return response.data;
};

export const addAdress = async (item) => {
  const response = await api.post(`${API_URL}/customer/address`, item);
  return response.data;
};

export const deleteAdress = async (id) => {
  const response = await api.delete(
    `${API_URL}/customer/address?addressId=${id}`
  );
  return response.data;
};

export const updateAdress = async (updateForm, id) => {
  const response = await api.put(
    `${API_URL}/customer/address?addressId=${id}`,
    updateForm
  );
  return response.data;
};
