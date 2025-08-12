import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import axios from "axios";
import { showAlertWithTimeoutKullanici } from "../../../redux/slices/alertKullaniciSlice";
import { BASE_URL } from "../../../config/baseApi";
import { clearLoading, setLoading } from "../../../redux/slices/loadingSlice";
import { customerLoginValidationSchema } from "../../customerLogin/yup/customerLoginValidation";

export const useSifreYenilemeValidation = (generateCode) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      password: "",
      rePassword: "",
    },
    validationSchema: customerLoginValidationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      dispatch(
        setLoading({
          isLoading: true,
          message: "Şifre yenileme işlemi yapılıyor...",
        })
      );
      try {
        await axios.put(`${BASE_URL}/api/v1/auth/verification-password`, {
          code: generateCode,
          password: values.password,
          rePassword: values.rePassword,
        });
        setTimeout(() => {
          dispatch(
            showAlertWithTimeoutKullanici({
              message: "Şifreniz başarıyla yenilendi",
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
