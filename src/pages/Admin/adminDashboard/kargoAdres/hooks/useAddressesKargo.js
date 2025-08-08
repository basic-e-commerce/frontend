import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  clearLoading,
  setLoading,
} from "../../../../../redux/slices/loadingSlice";
import api from "../../../../../api/api";
import { BASE_URL } from "../../../../../config/baseApi";

export const useAddressesKargo = () => {
  const [addresses, setAddresses] = useState([]);
  const dispatch = useDispatch();

  const fetchAddresses = async () => {
    dispatch(setLoading({ isLoading: true, message: "yukleniyor..." }));
    try {
      const response = await api.get(
        `${BASE_URL}/api/v1/merchant/list-sending-address`
      );
      setAddresses(response.data);
    } catch (error) {
      console.error("Adresler alınırken hata oluştu:", error);
    } finally {
      setLoading(false);
      dispatch(clearLoading());
    }
  };

  const addAddress = async (addressData) => {
    try {
      await api.post(
        `${BASE_URL}/api/v1/merchant/add-sending-address`,
        addressData
      );
      await fetchAddresses();
    } catch (error) {
      console.log("Adres ekleme hatası:", error);
      throw error;
    }
  };

  const deleteAddress = async (id) => {
    try {
      await api.post(
        `${BASE_URL}/api/v1/merchant/remove-sending-address?addressId=${id}`
      );
      await fetchAddresses();
    } catch (error) {
      console.log("Adres silme hatası:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchAddresses();
  }, []);

  return {
    addresses,
    fetchAddresses,
    addAddress,
    deleteAddress,
  };
};
