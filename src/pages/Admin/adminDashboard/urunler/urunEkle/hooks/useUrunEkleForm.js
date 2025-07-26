import { useDispatch } from "react-redux";
import { useRef, useState } from "react";
import { createProduct } from "../../../../../../api/apiProduct";
import { showAlertWithTimeout } from "../../../../../../redux/slices/alertSlice";
import {
  setLoading,
  clearLoading,
} from "../../../../../../redux/slices/loadingSlice";
import { productSchema } from "../../../../../../yup/product";

// Tehlikeli karakterleri engelleyen regex
const dangerousCharRegex = /^[^<>;'"]*$/;

export const useUrunEkleForm = () => {
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const [images, setImages] = useState([]);
  const [coverImage, setCoverImage] = useState(null);
  const [categoryIds, setCategoryIds] = useState([]);

  const initialValues = {
    name: "",
    shortDescription: "",
    productDescription: "",
    quantity: "",
    salePrice: "",
    comparePrice: "",
    buyingPrice: "",
    taxRate: "",
    productType: "",
    published: "true",
    disableOutOfStock: "true",
    stockNotification: "",
  };

  // Tehlikeli karakterleri engelleyen regex ile validasyon şemasını genişlet
  const validationSchema = productSchema.shape({
    name: productSchema.fields.name.matches(
      dangerousCharRegex,
      "Geçersiz karakter içeriyor"
    ),
    shortDescription: productSchema.fields.shortDescription.matches(
      dangerousCharRegex,
      "Geçersiz karakter içeriyor"
    ),
    productDescription: productSchema.fields.productDescription.matches(
      dangerousCharRegex,
      "Geçersiz karakter içeriyor"
    ),
  });

  const handleImageUpload = (event) => {
    const files = Array.from(event.target.files);
    setImages((prev) => [...prev, ...files]);
  };

  const handleRemoveImage = (index) => {
    setImages((prev) => prev.filter((_, i) => i !== index));
  };

  const handleKapakImageChange = (event) => {
    const file = event.target.files[0];
    setCoverImage(file);
    event.target.value = "";
  };

  const handleCategoryChange = (updatedCategories) => {
    setCategoryIds(updatedCategories);
  };

  const onSubmit = async (values, { resetForm, setSubmitting }) => {
    dispatch(setLoading({ isLoading: true, message: "Ürün ekleniyor..." }));
    window.scrollTo(0, 0);

    const formDataToSend = new FormData();
    formDataToSend.append("name", values.name);
    formDataToSend.append("description", values.productDescription);
    formDataToSend.append("shortDescription", values.shortDescription);
    formDataToSend.append("quantity", values.quantity);
    formDataToSend.append("stockNotification", values.stockNotification);
    formDataToSend.append("salePrice", values.salePrice);
    formDataToSend.append("buyingPrice", values.buyingPrice);
    formDataToSend.append("taxRate", values.taxRate);
    formDataToSend.append("comparePrice", values.comparePrice);
    formDataToSend.append("published", values.published);
    formDataToSend.append("productType", values.productType);
    formDataToSend.append("disableOutOfStock", values.disableOutOfStock);
    categoryIds.forEach((id) => formDataToSend.append("categoryIds", id));
    images.forEach((image) => formDataToSend.append("productImages", image));
    if (coverImage) {
      formDataToSend.append("coverImage", coverImage);
    }

    try {
      await createProduct(formDataToSend);
      dispatch(
        showAlertWithTimeout({
          message: "Ürün başarıyla Eklendi",
          status: "success",
        })
      );
      resetForm();
      setImages([]);
      setCoverImage(null);
      setCategoryIds([]);
    } catch (error) {
      dispatch(
        showAlertWithTimeout({
          message: error.message,
          status: "error",
        })
      );
    } finally {
      dispatch(clearLoading());
      setSubmitting(false);
    }
  };

  return {
    inputRef,
    images,
    coverImage,
    categoryIds,
    setCategoryIds,
    handleImageUpload,
    handleRemoveImage,
    handleKapakImageChange,
    handleCategoryChange,
    initialValues,
    validationSchema,
    onSubmit,
  };
};
