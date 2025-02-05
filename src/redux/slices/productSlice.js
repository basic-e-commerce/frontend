import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { STATUS } from "../../utils/Status";
import axios from "axios";

const initialState = {
  products: [],
  productsStatus: STATUS.IDLE,
  productDetail: [], // Array veya Küme
  productDetailStatus: STATUS.IDLE,
};

export const getProducts = createAsyncThunk("getProducts", async () => {
  const response = await axios.get("https://fakestoreapi.com/products");
  const data = response.data;
  return data;
});

export const getProductsCategory = createAsyncThunk(
  "getProductsCategory",
  async (category) => {
    const response = await axios.get(
      `https://fakestoreapi.com/products/category/${category}`
    );
    const data = response.data;
    return data;
  }
);

export const getProductDetail = createAsyncThunk(
  "getProductDetail",
  async (id) => {
    const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
    const data = response.data;
    return data;
  }
);

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    sortingTheIncProduct(state) {
      state.products = [...state.products].sort((a, b) => a.price - b.price);
    },
    sortingTheDecProduct(state) {
      state.products = [...state.products].sort((a, b) => b.price - a.price);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProducts.pending, (state, action) => {
        state.productsStatus = STATUS.LOADING;
      })
      .addCase(getProducts.fulfilled, (state, action) => {
        state.productsStatus = STATUS.SUCCESS;
        state.products = action.payload;
      })
      .addCase(getProducts.rejected, (state, action) => {
        state.productsStatus = STATUS.FAIL;
      })
      .addCase(getProductDetail.pending, (state, action) => {
        state.productDetailStatus = STATUS.LOADING;
      })
      .addCase(getProductDetail.fulfilled, (state, action) => {
        state.productDetailStatus = STATUS.SUCCESS;
        state.productDetail = action.payload;
      })
      .addCase(getProductDetail.rejected, (state, action) => {
        state.productDetailStatus = STATUS.FAIL;
      })
      .addCase(getProductsCategory.pending, (state, action) => {
        state.productsStatus = STATUS.LOADING;
      })
      .addCase(getProductsCategory.fulfilled, (state, action) => {
        state.productsStatus = STATUS.SUCCESS;
        state.products = action.payload;
      })
      .addCase(getProductsCategory.rejected, (state, action) => {
        state.productsStatus = STATUS.FAIL;
      });
  },
});

export const { sortingTheIncProduct, sortingTheDecProduct } =
  productSlice.actions;
export default productSlice.reducer;
