import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { productSchema } from "../../../../../../yup/product";
import {
  getProductDetailAdmin,
  updateProduct,
} from "../../../../../../redux/slices/productSlice";
import { showAlertWithTimeout } from "../../../../../../redux/slices/alertSlice";
import { getCategories } from "../../../../../../redux/slices/categorySlice";
import {
  setLoading,
  clearLoading,
} from "../../../../../../redux/slices/loadingSlice";

export const useUrunDuzenleForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const inputRef = useRef(null);
  const { productLinkName } = useParams();
  const [initialImages, setInitialImages] = useState([]);
  const [initialCoverImage, setInitialCoverImage] = useState(null);
  const [images, setImages] = useState([]);
  const [coverImage, setCoverImage] = useState(null);

  const { categories, loadingCategoriesStatus } = useSelector(
    (state) => state.categories
  );
  const { productDetailStatus, adminProductDetail } = useSelector(
    (state) => state.products
  );

  const initialValues = {
    id: null,
    name: "",
    shortDescription: "",
    productDescription: "",
    quantity: "",
    stockNotification: "",
    salePrice: "",
    comparePrice: "",
    buyingPrice: "",
    taxRate: "",
    productType: "",
    published: "true",
    disableOutOfStock: "true",
  };

  // Ürün detaylarını getir
  useEffect(() => {
    const fetchData = async () => {
      dispatch(
        setLoading({ isLoading: true, message: "Ürün bilgileri yükleniyor..." })
      );
      if (!productLinkName) return;

      try {
        await dispatch(getProductDetailAdmin(productLinkName)).unwrap();
        dispatch(clearLoading());
      } catch (error) {
        dispatch(clearLoading());
        dispatch(
          showAlertWithTimeout({
            message: error.response?.data || "Bir hata oluştu",
            status: "error",
          })
        );
      }
    };

    fetchData();
    dispatch(getCategories());
  }, [productLinkName, dispatch]);

  // Form verilerini ürün detaylarından doldur
  useEffect(() => {
    if (adminProductDetail) {
      setInitialImages(adminProductDetail.productImages || []);
      setInitialCoverImage(adminProductDetail.coverImage?.url || "");
      setImages(adminProductDetail.productImages || []);
      setCoverImage(adminProductDetail.coverImage?.url || "");
    }
  }, [adminProductDetail]);

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

  const onSubmit = async (values, { setSubmitting }) => {
    dispatch(setLoading({ isLoading: true, message: "Ürün düzenleniyor..." }));
    window.scrollTo(0, 0);

    try {
      const formDataToSend = {
        ...values,
        images,
        coverImage,
      };

      const response = await dispatch(
        updateProduct({
          formData: formDataToSend,
          initialKapakImages: initialCoverImage,
          initialImages,
        })
      ).unwrap();

      await dispatch(getProductDetailAdmin(response.linkName)).unwrap();
      navigate(`/admins/urunler/${response.linkName}`);

      dispatch(
        showAlertWithTimeout({
          message: "Ürün başarıyla düzenlendi.",
          status: "success",
        })
      );
    } catch (err) {
      dispatch(
        showAlertWithTimeout({
          message: err.response?.data?.message || "Bir hata oluştu",
          status: "error",
        })
      );
      console.error("Ürün düzenleme hatası:", err);
    } finally {
      dispatch(clearLoading());
      setSubmitting(false);
    }
  };

  const getFormikInitialValues = () => {
    if (!adminProductDetail) return initialValues;

    return {
      id: adminProductDetail.id,
      name: adminProductDetail.productName || "",
      shortDescription: adminProductDetail.shortDescription || "",
      productDescription: adminProductDetail.productDescription || "",
      quantity: adminProductDetail.quantity?.toString() || "",
      stockNotification: adminProductDetail.stockNotification?.toString() || "",
      salePrice: adminProductDetail.salePrice?.toString() || "",
      comparePrice: adminProductDetail.comparePrice?.toString() || "",
      buyingPrice: adminProductDetail.buyingPrice?.toString() || "",
      taxRate: adminProductDetail.taxRate?.toString() || "",
      productType: adminProductDetail.productType || "",
      published: adminProductDetail.published?.toString() || "true",
      disableOutOfStock:
        adminProductDetail.disableOutOfStock?.toString() || "true",
      categoryIds:
        adminProductDetail.categories?.map((category) => category.id) || [],
      images: adminProductDetail.productImages || [],
      coverImage: adminProductDetail.coverImage?.url || "",
    };
  };

  return {
    inputRef,
    isLoading: productDetailStatus === "LOADING" || loadingCategoriesStatus,
    images,
    coverImage,
    categories,
    adminProductDetail,
    handleImageUpload,
    handleRemoveImage,
    handleKapakImageChange,
    initialValues: getFormikInitialValues(),
    validationSchema: productSchema,
    onSubmit,
  };
};
