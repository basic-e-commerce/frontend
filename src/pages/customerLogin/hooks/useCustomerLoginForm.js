import { useDispatch, useSelector } from "react-redux";
import { handleApiError } from "../../../utils/errorHandler";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { customerLoginValidationSchema } from "../yup/customerLoginValidation";
import axios from "axios";
import { showAlertWithTimeoutKullanici } from "../../../redux/slices/alertKullaniciSlice";
import { BASE_URL } from "../../../config/baseApi";
import { clearLoading, setLoading } from "../../../redux/slices/loadingSlice";

export const useCustomerLoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      username: "",
      password: "",
      rePassword: "",
    },
    validationSchema: customerLoginValidationSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      dispatch(setLoading({ isLoading: true, message: "Ürün ekleniyor..." }));
      try {
        await axios.post(`${BASE_URL}/api/v1/customer`, values);
        setTimeout(() => {
          dispatch(
            showAlertWithTimeoutKullanici({
              message: "E-postanız'a Onay Linki Gönderilmiştir",
              status: "success",
            })
          );
        }, 400);
        navigate("/customerlogin");
      } catch (error) {
        const errorMessage = handleApiError(error);
        setErrors({ general: errorMessage });
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
        setSubmitting(false);
      }
    },
  });

  return formik;
};
