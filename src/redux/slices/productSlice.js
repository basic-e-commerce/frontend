import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../utils/status";

import {
  deleteCoverImgProduct,
  fetchAdminProductDetail,
  fetchProductDetail,
  fetchProducts,
  fetchProductsByCategory,
  fetchProductsByCategoryAdmin,
  updateCoverImgProduct,
  updateImgsProduct,
  updateProductText,
} from "../../api/apiProduct";

const initialState = {
  products: [],
  adminProducts: [],
  productsStatus: STATUS.IDLE,
  productDetail: {},
  adminProductDetail: {},
  productDetailStatus: STATUS.IDLE,
  productDetailCover: "",
};

export const getProducts = createAsyncThunk("getProducts", async () => {
  return await fetchProducts();
});

export const getProductsCategory = createAsyncThunk(
  "getProductsCategory",
  async (categoryId) => {
    try {
      return await fetchProductsByCategoryAdmin(categoryId);
    } catch (error) {
      console.log(error);
    }
  }
);

export const getProductDetail = createAsyncThunk(
  "getProductDetail",
  async (linkName) => {
    return await fetchProductDetail(linkName);
  }
);

export const getProductDetailAdmin = createAsyncThunk(
  "getProductDetailAdmin",
  async (linkName, { rejectWithValue }) => {
    try {
      return await fetchAdminProductDetail(linkName);
    } catch (error) {
      return rejectWithValue(error.message || "Ürün detayı alınamadı");
    }
  }
);

export const updateProduct = createAsyncThunk(
  "update/product",
  async (
    { formData, initialKapakImages, initialImages },
    { rejectWithValue }
  ) => {
    try {
      await updateProductText(formData.id, {
        name: formData.name,
        salePrice: formData.salePrice,
        comparePrice: formData.comparePrice,
        buyingPrice: formData.buyingPrice,
        quantity: formData.quantity,
        shortDescription: formData.shortDescription,
        description: formData.productDescription,
        categoryIds: formData.categoryIds,
        productType: formData.productType,
        published: formData.published,
        disableOutOfStock: formData.disableOutOfStock,
      });

      if (formData.coverImage !== initialKapakImages) {
        if (!formData.coverImage) {
          await deleteCoverImgProduct(formData.id);
        } else if (formData.coverImage instanceof File) {
          const kapakData = new FormData();
          kapakData.append("image", formData.coverImage);
          kapakData.append("id", formData.id);
          await updateCoverImgProduct(kapakData);
        }
      }

      if (formData.images !== initialImages) {
        const addeds = formData.images?.filter((img) => img instanceof File);
        const removeds = initialImages?.filter(
          (img) => !formData.images.some((currImg) => currImg.id === img.id)
        );

        if (
          (addeds && addeds.length > 0) ||
          (removeds && removeds.length > 0)
        ) {
          const newFile = new FormData();
          addeds?.forEach((added) => newFile.append("newImages", added));
          removeds?.forEach((removed) =>
            newFile.append("deleteImages", removed.id)
          );

          await updateImgsProduct(formData.id, newFile);
        }
      }
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    sortingTheIncProduct(state) {
      state.products = [...state.products].sort(
        (a, b) => a.discountPrice - b.discountPrice
      );
    },
    sortingTheDecProduct(state) {
      state.products = [...state.products].sort(
        (a, b) => b.discountPrice - a.discountPrice
      );
    },
    productDetailCoverChange(state, action) {
      state.productDetailCover = action.payload;
    },
    resetTheProducts(state) {
      state.products = [];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state) => {
        state.productsStatus = STATUS.LOADING;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.productsStatus = STATUS.SUCCESS;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state) => {
        state.productsStatus = STATUS.FAIL;
      })

      .addCase(getProductsCategory.pending, (state) => {
        state.productsStatus = STATUS.LOADING;
      })
      .addCase(getProductsCategory.fulfilled, (state, action) => {
        state.productsStatus = STATUS.SUCCESS;
        state.products = action.payload;
      })
      .addCase(getProductsCategory.rejected, (state) => {
        state.productsStatus = STATUS.FAIL;
      })

      .addCase(getProductDetail.pending, (state) => {
        state.productDetailStatus = STATUS.LOADING;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.productDetailStatus = STATUS.SUCCESS;
        state.productDetailCover = action.payload.coverImage.url;
        state.productDetail = action.payload;
      })
      .addCase(getProductDetail.rejected, (state) => {
        state.productDetailStatus = STATUS.FAIL;
      })

      .addCase(getProductDetailAdmin.pending, (state) => {
        state.productDetailStatus = STATUS.LOADING;
      })
      .addCase(getProductDetailAdmin.fulfilled, (state, action) => {
        state.productDetailStatus = STATUS.SUCCESS;
        state.adminProductDetail = action.payload;
      })
      .addCase(getProductDetailAdmin.rejected, (state) => {
        state.productDetailStatus = STATUS.FAIL;
      });
  },
});

export const {
  sortingTheIncProduct,
  sortingTheDecProduct,
  productDetailCoverChange,
  resetTheProducts,
} = productSlice.actions;
export default productSlice.reducer;
