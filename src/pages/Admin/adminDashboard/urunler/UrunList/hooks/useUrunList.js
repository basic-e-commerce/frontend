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
import { STATUS } from "../../../../../../utils/status";

export const useUrunList = () => {
  const dispatch = useDispatch();

  // Redux State
  const { products, productsStatus } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);

  // Local State
  const [currentItems, setCurrentItems] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  // Debug: Log products when they change
  useEffect(() => {
    console.log("Products updated:", products);
  }, [products]);

  // Initialize component
  useEffect(() => {
    dispatch(resetTheProducts());
    dispatch(getCategories());
  }, [dispatch]);

  // Fetch products when category changes
  useEffect(() => {
    console.log("Selected Category ID:", selectedCategoryId);
    if (selectedCategoryId) {
      console.log(
        "Dispatching getProductsCategory with ID:",
        selectedCategoryId
      );
      dispatch(
        setLoading({ isLoading: true, message: "Ürünler yükleniyor..." })
      );
      dispatch(getProductsCategory(selectedCategoryId));
    }
  }, [selectedCategoryId, dispatch]);

  // Clear loading when products status changes
  useEffect(() => {
    if (productsStatus === STATUS.SUCCESS || productsStatus === STATUS.ERROR) {
      dispatch(clearLoading());
    }
  }, [productsStatus, dispatch]);

  // Handle category selection
  const handleCategoryChange = (categoryId) => {
    // Eğer boş string gelirse null olarak ayarla
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
