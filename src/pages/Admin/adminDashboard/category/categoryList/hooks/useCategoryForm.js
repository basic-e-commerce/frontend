import { useState, useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import {
  updateCategory,
  removeCategory,
  getCategories,
} from "../../../../../../redux/slices/categorySlice";
import { handleApiError } from "../../../../../../utils/errorHandler";
import { showAlertWithTimeout } from "../../../../../../redux/slices/alertSlice";
import {
  categoryValidationSchema,
  initialValues,
} from "../yup/categoryValidation";

export const useCategoryForm = () => {
  const dispatch = useDispatch();
  const { categories, selectedCategory } = useSelector(
    (state) => state.categories
  );

  const [showPopupCategory, setShowPopupCategory] = useState(false);
  const [initialKapakImages, setInitialKapakImages] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Formik form yapısı
  const formik = useFormik({
    initialValues,
    validationSchema: categoryValidationSchema,
    onSubmit: async (values) => {
      setIsLoading(true);
      try {
        await dispatch(
          updateCategory({ formData: values, initialKapakImages })
        ).unwrap();
        dispatch(
          showAlertWithTimeout({
            message: "Kategori başarıyla güncellendi",
            status: "success",
          })
        );
      } catch (error) {
        dispatch(
          showAlertWithTimeout({
            message: handleApiError(error),
            status: "error",
          })
        );
      } finally {
        setIsLoading(false);
      }
    },
  });

  // Kategorileri yükle
  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  // Seçili kategori değiştiğinde formu güncelle
  useEffect(() => {
    if (selectedCategory) {
      formik.setValues({
        id: selectedCategory?.id,
        name: selectedCategory?.categoryName || "",
        description: selectedCategory?.categoryDescription || "",
        coverImage: selectedCategory?.coverImage?.url || "",
      });
      setInitialKapakImages(selectedCategory?.coverImage?.url || "");
    }
  }, [selectedCategory]);

  // Resim değişikliği handler'ı
  const handleKapakImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      formik.setFieldValue("coverImage", file);
    }
    event.target.value = "";
  };

  // Kategori silme handler'ı
  const handleConfirmDeleteCategory = async (e) => {
    e.preventDefault();
    try {
      await dispatch(removeCategory(formik.values.id)).unwrap();
      setShowPopupCategory(false);
      dispatch(
        showAlertWithTimeout({
          message: "Kategori başarıyla silindi",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        showAlertWithTimeout({
          message: handleApiError(error),
          status: "error",
        })
      );
    }
  };

  // Popup açma handler'ı
  const handleOpenDeletePopup = () => {
    setShowPopupCategory(true);
  };

  // Popup kapatma handler'ı
  const handleCloseDeletePopup = () => {
    setShowPopupCategory(false);
  };

  // Resim render etme
  const renderedImage = useMemo(() => {
    if (typeof formik.values.coverImage === "string")
      return formik.values.coverImage;
    if (formik.values.coverImage instanceof File)
      return URL.createObjectURL(formik.values.coverImage);
    return null;
  }, [formik.values.coverImage]);

  // Form değişiklik kontrolü
  const isFormChanged = useMemo(() => {
    if (!selectedCategory) return false;

    return (
      selectedCategory.categoryName !== formik.values.name ||
      selectedCategory.categoryDescription !== formik.values.description ||
      formik.values.coverImage instanceof File
    );
  }, [selectedCategory, formik.values]);

  return {
    // State
    showPopupCategory,
    categories,
    selectedCategory,
    renderedImage,
    isFormChanged,
    isLoading,

    // Formik
    formik,

    // Handlers
    handleKapakImageChange,
    handleConfirmDeleteCategory,
    handleOpenDeletePopup,
    handleCloseDeletePopup,
  };
};
