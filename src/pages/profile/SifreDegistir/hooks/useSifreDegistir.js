import { useState } from "react";
import api from "../../../../api/api";
import { BASE_URL } from "../../../../config/baseApi";
import {
  clearLoading,
  setLoading,
} from "../../../../redux/slices/loadingSlice";
import { useDispatch } from "react-redux";
import { showAlertWithTimeoutKullanici } from "../../../../redux/slices/alertKullaniciSlice";

const useSifreDegistir = () => {
  const dispatch = useDispatch();

  const handleSubmit = async (values, { resetForm }) => {
    dispatch(setLoading({ isLoading: true, message: "yukleniyor..." }));

    try {
      await api.put(`${BASE_URL}/api/v1/customer/update-password`, {
        oldPassword: values.oldPassword,
        password: values.newPassword,
        rePassword: values.reNewPassword,
      });

      resetForm();

      dispatch(
        showAlertWithTimeoutKullanici({
          message: "Şifre başarıyla değiştirildi",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        showAlertWithTimeoutKullanici({
          message:
            error.response?.data ||
            error.response?.data?.message ||
            error.message ||
            "Şifre değiştirilirken bir hata oluştu",
          status: "error",
        })
      );
    } finally {
      dispatch(clearLoading());
    }
  };

  return {
    handleSubmit,
  };
};

export default useSifreDegistir;
