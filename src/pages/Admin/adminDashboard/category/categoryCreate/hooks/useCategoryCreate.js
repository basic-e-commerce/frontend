import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useFormik } from "formik";
import { getCategories } from "../../../../../../redux/slices/categorySlice";
import { createCategory } from "../../../../../../api/apiCategory";
import { showAlertWithTimeout } from "../../../../../../redux/slices/alertSlice";
import { handleApiError } from "../../../../../../utils/errorHandler";
import {
  categoryValidationSchema,
  initialValues,
} from "../yup/categoryValidation";
import {
  clearLoading,
  setLoading,
} from "../../../../../../redux/slices/loadingSlice";

export const useCategoryCreate = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { isLoading } = useSelector((state) => state.loading);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const formik = useFormik({
    initialValues,
    validationSchema: categoryValidationSchema,
    validateOnMount: true,
    validateOnChange: true,
    validateOnBlur: true,
    onSubmit: async (values, { resetForm }) => {
      dispatch(
        setLoading({
          isLoading: true,
          message: "Kategori oluşturuluyor...",
        })
      );

      const formDataToSend = new FormData();
      formDataToSend.append("name", values.name);
      formDataToSend.append("description", values.description);
      formDataToSend.append("parentCategoryId", values.parentCategoryId || "0");

      if (values.coverImage && typeof values.coverImage !== "string") {
        formDataToSend.append("image", values.coverImage);
      }

      try {
        await createCategory(formDataToSend);
        resetForm();
        setTimeout(() => {
          dispatch(
            showAlertWithTimeout({
              message: "Kategori başarıyla oluşturuldu",
              status: "success",
            })
          );
        }, 400);
      } catch (error) {
        dispatch(
          showAlertWithTimeout({
            message: handleApiError(error),
            status: "error",
          })
        );
      } finally {
        dispatch(clearLoading());
      }
    },
  });

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    formik.setFieldValue("coverImage", file);
  };

  return {
    isLoading,
    formik,
    categories,
    handleImageChange,
  };
};
