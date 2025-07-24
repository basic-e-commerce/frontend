// store/checkoutSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedAdresId: null,
  address: {
    firstName: "",
    lastName: "",
    username: "",
    countryName: "TURKIYE",
    countryIso: "TR",
    city: "",
    cityCode: "",
    district: "",
    districtId: "",
    addressLine1: "",
    postalCode: "",
    phoneNo: "",
    geliverId: "",
  },

  invoiceAddress: {
    firstName: "",
    lastName: "",
    username: "",
    countryName: "TURKIYE",
    countryIso: "TR",
    city: "",
    cityCode: "",
    district: "",
    districtId: "",
    addressLine1: "",
    postalCode: "",
    phoneNo: "",
    geliverId: "",
  },

  billingSame: true,
  invoiceType: "INDIVIDUAL",
  diffAddress: false,

  corporateInvoice: {
    taxOffice: "",
    taxNumber: "",
    companyName: "",
  },

  code: "",
};

const siparisSlice = createSlice({
  name: "siparisSlice",
  initialState,
  reducers: {
    updataSelectedAdresId: (state, action) => {
      state.selectedAdresId = action.payload;
    },

    updateAddress: (state, action) => {
      state.address = action.payload;
    },
    updateBillingAddress: (state, action) => {
      state.invoiceAddress = action.payload;
    },
    setBillingSame: (state, action) => {
      state.billingSame = action.payload;
    },
    setInvoiceType: (state, action) => {
      state.invoiceType = action.payload;
    },
    updateCorporateInfo: (state, action) => {
      state.corporateInvoice = action.payload;
    },
    updateFarkliAdres: (state, action) => {
      state.diffAddress = action.payload;
    },
    resetAdress: (state) => {
      state.address = initialState.address;
    },
    resetCheckout: () => ({ ...initialState }),
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
  updataSelectedAdresId,
} = siparisSlice.actions;

export default siparisSlice.reducer;
