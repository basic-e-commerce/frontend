import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./slices/categorySlice";
import productSlice from "./slices/productSlice";
import sepetCartSlice from "./slices/sepetCartSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    categories: categorySlice,
    products: productSlice,
    sepet: sepetCartSlice,
    auth: authReducer,
  },
});
