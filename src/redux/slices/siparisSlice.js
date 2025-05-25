// store/checkoutSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  address: {
    title: "",
    addressLine1: "",
    phoneNo: "",
    postalCode: "",
    city: "",
    countryId: 1,
  },

  billingAddress: {
    title: "",
    addressLine1: "",
    phoneNo: "",
    postalCode: "",
    city: "",
    countryId: 1,
  },

  billingSame: true,
  invoiceType: "bireysel",
  farkliAdres: false,

  corporateInfo: {
    taxOffice: "",
    taxNumber: "",
    companyName: "",
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
    updateFarkliAdres: (state, action) => {
      state.farkliAdres = action.payload;
    },
    resetAdress: (state) => {
      state.address = initialState.address;
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
  resetCheckout,
  resetAdress,
  updateFarkliAdres,
} = siparisSlice.actions;

export default siparisSlice.reducer;
