import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../utils/Status";

import {
  fetchProductDetail,
  fetchProducts,
  fetchProductsByCategory,
} from "../../api/apiProduct";

const initialState = {
  products: [],
  productsStatus: STATUS.IDLE,
  productDetail: {}, // Array veya Küme
  productDetailStatus: STATUS.IDLE,
  productDetailCover: "",
};

export const getProducts = createAsyncThunk("getProducts", async () => {
  return await fetchProducts();
});

export const getProductsCategory = createAsyncThunk(
  "getProductsCategory",
  async (id) => {
    return await fetchProductsByCategory(id);
  }
);

export const getProductDetail = createAsyncThunk(
  "getProductDetail",
  async (id) => {
    return await fetchProductDetail(id);
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
      .addCase(getProductDetail.pending, (state) => {
        state.productDetailStatus = STATUS.LOADING;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.productDetailStatus = STATUS.SUCCESS;
        state.productDetailCover = action.payload.coverImage;
        state.productDetail = action.payload;
      })
      .addCase(getProductDetail.rejected, (state) => {
        state.productDetailStatus = STATUS.FAIL;
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
      });
  },
});

export const {
  sortingTheIncProduct,
  sortingTheDecProduct,
  productDetailCoverChange,
} = productSlice.actions;
export default productSlice.reducer;
