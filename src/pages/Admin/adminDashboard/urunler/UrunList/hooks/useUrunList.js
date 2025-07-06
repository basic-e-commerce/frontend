import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsCategory,
  resetTheProducts,
} from "../../../../../../redux/slices/productSlice";
import { getCategories } from "../../../../../../redux/slices/categorySlice";
import {
  setLoading,
  clearLoading,
} from "../../../../../../redux/slices/loadingSlice";
import { showAlertWithTimeout } from "../../../../../../redux/slices/alertSlice";

export const useUrunList = () => {
  const dispatch = useDispatch();

  // Redux State
  const { products, productsStatus } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  // Local State
  const [currentItems, setCurrentItems] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Initialize component
  useEffect(() => {
    dispatch(resetTheProducts());
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    const ffetchProductsCategoryId = async () => {
      dispatch(
        setLoading({ isLoading: true, message: "Ürünler yükleniyor..." })
      );
      try {
        await dispatch(getProductsCategory(selectedCategoryId)).unwrap();
      } catch (error) {
        dispatch(
          showAlertWithTimeout({
            message: error.response?.data || "Bir hata oluştu",
            status: "error",
          })
        );
      } finally {
        dispatch(clearLoading());
      }
    };

    if (selectedCategoryId) {
      ffetchProductsCategoryId();
    }
  }, [selectedCategoryId, dispatch]);

  // Handle category selection
  const handleCategoryChange = (categoryId) => {
    setSelectedCategoryId(categoryId === "" ? null : categoryId);
  };

  return {
    products,
    categories,
    currentItems,
    setCurrentItems,
    selectedCategoryId,
    handleCategoryChange,
    productsStatus,
  };
};
