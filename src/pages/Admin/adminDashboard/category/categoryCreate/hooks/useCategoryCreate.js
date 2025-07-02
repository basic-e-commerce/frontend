import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getCategories } from "../../../../../../redux/slices/categorySlice";
import { createCategory } from "../../../../../../api/apiCategory";
import { showAlertWithTimeout } from "../../../../../../redux/slices/alertSlice";
import { handleApiError } from "../../../../../../utils/errorHandler";

export const useCategoryCreate = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  const [imgKapak, setImgKapak] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    parentCategoryId: "0",
  });

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("description", formData.description);
    formDataToSend.append("parentCategoryId", formData.parentCategoryId);
    formDataToSend.append("image", imgKapak);

    try {
      await createCategory(formDataToSend);
      setFormData({ name: "", description: "", parentCategoryId: "0" });
      setImgKapak(null);
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
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleKapakImageChange = (event) => {
    const file = event.target.files[0];
    setImgKapak(file);
  };

  const resetForm = () => {
    setFormData({ name: "", description: "", parentCategoryId: "0" });
    setImgKapak(null);
  };

  return {
    imgKapak,
    isLoading,
    formData,
    categories,
    handleSubmit,
    handleChange,
    handleKapakImageChange,
    resetForm,
  };
};
