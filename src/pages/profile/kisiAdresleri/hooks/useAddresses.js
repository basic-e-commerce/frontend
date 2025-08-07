import { useState, useEffect } from "react";
import {
  getAdress,
  addAdress,
  updateAdress,
  deleteAdress,
} from "../../../../api/apiAdress";
import { useDispatch } from "react-redux";
import {
  clearLoading,
  setLoading,
} from "../../../../redux/slices/loadingSlice";

export const useAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const dispatch = useDispatch();

  const fetchAddresses = async () => {
    dispatch(setLoading({ isLoading: true, message: "yukleniyor..." }));
    try {
      const response = await getAdress();
      setAddresses(response);
    } catch (error) {
      console.error("Adresler alınırken hata oluştu:", error);
    } finally {
      setLoading(false);
      dispatch(clearLoading());
    }
  };

  const addAddress = async (addressData) => {
    try {
      await addAdress(addressData);
      await fetchAddresses();
    } catch (error) {
      console.log("Adres ekleme hatası:", error);
      throw error;
    }
  };

  const updateAddress = async (addressData, id) => {
    try {
      await updateAdress(addressData, id);
      await fetchAddresses();
    } catch (error) {
      console.log("Adres güncelleme hatası:", error);
      throw error;
    }
  };

  const deleteAddress = async (id) => {
    try {
      await deleteAdress(id);
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
    updateAddress,
    deleteAddress,
  };
};
