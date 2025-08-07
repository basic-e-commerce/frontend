import { useEffect, useState, useCallback } from "react";
import { useDispatch } from "react-redux";
import api from "../../../../api/api";
import { BASE_URL } from "../../../../config/baseApi";
import { showAlertWithTimeoutKullanici } from "../../../../redux/slices/alertKullaniciSlice";
import {
  clearLoading,
  setLoading,
} from "../../../../redux/slices/loadingSlice";

const useBilgiler = () => {
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    ad: "",
    soyad: "",
    email: "",
    telefon: "",
  });

  const fetchBilgiler = useCallback(async () => {
    dispatch(setLoading({ isLoading: true, message: "yukleniyor..." }));
    try {
      const response = await api.get(`${BASE_URL}/api/v1/customer/profile`);
      const data = response.data;
      setFormData({
        ad: data.name,
        soyad: data.lastName,
        email: data.username,
        telefon: data.phoneNumber,
      });
    } catch (error) {
      setTimeout(() => {
        dispatch(
          showAlertWithTimeoutKullanici({
            message: error.response.data,
            status: "error",
          })
        );
      }, 400);
    } finally {
      dispatch(clearLoading());
    }
  }, [dispatch]);

  const submitBilgiler = async (values) => {
    try {
      await api.put(`${BASE_URL}/api/v1/customer/profile`, {
        name: values.ad,
        lastName: values.soyad,
        phoneNumber: values.telefon,
      });

      fetchBilgiler();
      dispatch(
        showAlertWithTimeoutKullanici({
          message: "Bilgiler Güncellendi",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        showAlertWithTimeoutKullanici({
          message: error.message,
          status: "error",
        })
      );
    }
  };

  useEffect(() => {
    fetchBilgiler();
  }, [fetchBilgiler]);

  return {
    formData,
    setFormData,
    fetchBilgiler,
    submitBilgiler,
  };
};

export default useBilgiler;
