import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setLogin } from "../../../../redux/slices/authSlice";
import api from "../../../../api/api";
import { handleApiError } from "../../../../utils/errorHandler";
import {
  clearLoading,
  setLoading,
} from "../../../../redux/slices/loadingSlice";
import { showAlertWithTimeoutKullanici } from "../../../../redux/slices/alertKullaniciSlice";

export const useAdminLoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = async (values, { setSubmitting, setErrors }) => {
    dispatch(setLoading({ isLoading: true, message: "Giriş Yapılıyor" }));
    try {
      const response = await api.post("/api/v1/auth/a-login", {
        username: values.username,
        password: values.password,
      });
      setTimeout(() => {
        dispatch(
          showAlertWithTimeoutKullanici({
            message: "Giriş Başarılı",
            status: "success",
          })
        );
      }, 400);
      dispatch(setLogin(response.data));
      navigate("/admins/kategoriler");
    } catch (error) {
      const errorMessage = handleApiError(error);
      setErrors({ submit: errorMessage });
      setTimeout(() => {
        dispatch(
          showAlertWithTimeoutKullanici({
            message: error.response?.data || error.message,
            status: "error",
          })
        );
      }, 400);
    } finally {
      dispatch(clearLoading());
      setSubmitting(false);
    }
  };

  return { handleSubmit };
};
