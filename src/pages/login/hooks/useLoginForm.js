import { useDispatch, useSelector } from "react-redux";
import { setLogin } from "../../../redux/slices/authSlice";
import { handleApiError } from "../../../utils/errorHandler";
import api from "../../../api/api";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { loginValidationSchema } from "../yup/loginValidation";
import { clearLoading, setLoading } from "../../../redux/slices/loadingSlice";
import { showAlertWithTimeoutKullanici } from "../../../redux/slices/alertKullaniciSlice";

export const useLoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLogin, role, isAuthChecked } = useSelector(
    (state) => state.authSlice
  );

  const validationSchema = loginValidationSchema;

  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    validationSchema,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      dispatch(setLoading({ isLoading: true, message: "Giriş Yapılıyor" }));
      try {
        const response = await api.post("/api/v1/auth/c-login", {
          username: values.username,
          password: values.password,
        });
        dispatch(setLogin(response.data));
        navigate("/");
        setTimeout(() => {
          dispatch(
            showAlertWithTimeoutKullanici({
              message: "Giriş Başarılı",
              status: "success",
            })
          );
        }, 400);
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

  return {
    formik,
    isLogin,
    role,
    isAuthChecked,
  };
};
