import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { showAlertWithTimeout } from "../../../../../../redux/slices/alertSlice";
import { cuponValidationnSchema, initialValues } from "../yup/cuponValidation";
import {
  clearLoading,
  setLoading,
} from "../../../../../../redux/slices/loadingSlice";
import { getProducts } from "../../../../../../redux/slices/productSlice";
import api from "../../../../../../api/api";
import { BASE_URL } from "../../../../../../config/baseApi";

export const useCategoryCreate = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const { isLoading } = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const formik = useFormik({
    initialValues,
    validationSchema: cuponValidationnSchema,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { resetForm }) => {
      dispatch(
        setLoading({
          isLoading: true,
          message: "Kupon oluşturuluyor...",
        })
      );

      const start = new Date(values.startDate);
      start.setHours(0, 0, 0);

      const end = new Date(values.endDate);
      end.setHours(23, 59, 59);

      const payload = {
        ...values,
        startDate: start.toISOString(),
        endDate: end.toISOString(),
      };

      try {
        await api.post(`${BASE_URL}/api/v1/coupon`, payload);
        resetForm();
        setTimeout(() => {
          dispatch(
            showAlertWithTimeout({
              message: "Kupon başarıyla oluşturuldu",
              status: "success",
            })
          );
        }, 400);
      } catch (error) {
        dispatch(
          showAlertWithTimeout({
            message: error.response.data || "Hata Oluştu",
            status: "error",
          })
        );
      } finally {
        dispatch(clearLoading());
      }
    },
  });

  return {
    isLoading,
    formik,
    products,
  };
};
