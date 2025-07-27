import * as Yup from "yup";

export const ayarlarValidation = Yup.object().shape({
  name: Yup.string().required("İsim gerekli"),
  firstName: Yup.string().required("Ad gerekli"),
  lastName: Yup.string().required("Soyad gerekli"),
  title: Yup.string().required("Ünvan gerekli"),
  countryName: Yup.string().required("Ülke adı gerekli"),
  cityCode: Yup.string().required("Şehir kodu gerekli"),
  districtId: Yup.string().required("İlçe ID gerekli"),
  addressLine1: Yup.string().required("Adres gerekli"),
  postalCode: Yup.string().required("Posta kodu gerekli"),
  phoneNo: Yup.string().required("Telefon numarası gerekli"),
  email: Yup.string().email("Geçersiz e-posta").required("E-posta gerekli"),
  minOrderAmount: Yup.number()
    .typeError("Sayı olmalı")
    .required("Minimum sipariş tutarı gerekli"),
  shippingFee: Yup.number()
    .typeError("Sayı olmalı")
    .required("Kargo ücreti gerekli"),
  emailPassword: Yup.string().required("E-posta şifresi gerekli"),
  instagram: Yup.string(),
  instagramLink: Yup.string().url("Geçersiz URL"),
  footerDescription: Yup.string(),
});

export const initialValues = {
  name: "",
  firstName: "",
  lastName: "",
  title: "",
  countryName: "",
  cityCode: "",
  districtId: "",
  addressLine1: "",
  postalCode: "",
  phoneNo: "",
  email: "",
  minOrderAmount: "",
  shippingFee: "",
  emailPassword: "",
  instagram: "",
  instagramLink: "",
  footerDescription: "",
  openCloseHours: [],
};
