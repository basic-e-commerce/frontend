// store/checkoutSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: {
    title: "",
    name: "",
    addressLine1: "",
    phone: "",
    postalCode: "",
    city: "",
  },
  billingAddress: {
    title: "",
    name: "",
    addressLine1: "",
    phone: "",
    postalCode: "",
    city: "",
  },
  billingSame: true,
  invoiceType: "bireysel",
  corporateInfo: {
    taxOffice: "",
    taxNumber: "",
    companyName: "",
  },
  paymentInfo: {
    cardNumber: "",
    expiry: "",
    cvc: "",
  },
};

const siparisSlice = createSlice({
  name: "siparisSlice",
  initialState,
  reducers: {
    updateAddress: (state, action) => {
      state.address = action.payload;
    },
    updateBillingAddress: (state, action) => {
      state.billingAddress = action.payload;
    },
    setBillingSame: (state, action) => {
      state.billingSame = action.payload;
    },
    setInvoiceType: (state, action) => {
      state.invoiceType = action.payload;
    },
    updateCorporateInfo: (state, action) => {
      state.corporateInfo = action.payload;
    },
    updatePaymentInfo: (state, action) => {
      state.paymentInfo = action.payload;
    },
    resetCheckout: () => initialState,
  },
});

export const {
  updateAddress,
  updateBillingAddress,
  setBillingSame,
  setInvoiceType,
  updateCorporateInfo,
  updatePaymentInfo,
  resetCheckout,
} = siparisSlice.actions;

export default siparisSlice.reducer;
