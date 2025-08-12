import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { sifremiUnuttumValidation } from "../yup/sifremiUnuttumValidation";
import axios from "axios";
import { showAlertWithTimeoutKullanici } from "../../../redux/slices/alertKullaniciSlice";
import { BASE_URL } from "../../../config/baseApi";
import { clearLoading, setLoading } from "../../../redux/slices/loadingSlice";

export const useSifremiUnuttumForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
    },
    validationSchema: sifremiUnuttumValidation,
    onSubmit: async (values, { setSubmitting }) => {
      dispatch(
        setLoading({
          isLoading: true,
          message: "Şifre sıfırlama linki gönderiliyor...",
        })
      );
      try {
        await axios.put(
          `${BASE_URL}/api/v1/auth/reset-password?username=${values.username}`
        );
        setTimeout(() => {
          dispatch(
            showAlertWithTimeoutKullanici({
              message: "E-postanız'a Sıfırlama Linki Gönderilmiştir",
              status: "success",
            })
          );
        }, 400);
        navigate("/customerlogin");
      } catch (error) {
        setTimeout(() => {
          dispatch(
            showAlertWithTimeoutKullanici({
              message:
                error.response?.data?.message || "Bilinmeyen hata oluştu",
              status: "error",
            })
          );
        }, 400);
      } finally {
        dispatch(clearLoading());
        setSubmitting(false);
      }
    },
  });

  return formik;
};
