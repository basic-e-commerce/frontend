import { configureStore } from "@reduxjs/toolkit";
import categorySlice from "./slices/categorySlice";
import productSlice from "./slices/productSlice";
import sepetCartSlice from "./slices/sepetCartSlice";
import authReducer from "./slices/authSlice";
import siparisSliceReducer from "./slices/siparisSlice";
import { setAccessTokenGetter, setDispatcher } from "../api/api";
import alertReducer from "./slices/alertSlice";
import alertKullaniciReducer from "./slices/alertKullaniciSlice";

export const store = configureStore({
  reducer: {
    categories: categorySlice,
    products: productSlice,
    sepet: sepetCartSlice,
    authSlice: authReducer,
    siparisSlice: siparisSliceReducer,
    alert: alertReducer,
    alertKullanici: alertKullaniciReducer,
  },
});

export default store;

setAccessTokenGetter(() => store.getState().authSlice.accessToken);
setDispatcher(store.dispatch);
