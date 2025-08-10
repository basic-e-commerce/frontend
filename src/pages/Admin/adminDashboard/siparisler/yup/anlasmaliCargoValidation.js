import * as Yup from "yup";

export const anlasmaliCargoValidation = Yup.object().shape({
  length: Yup.number()
    .required("Uzunluk zorunludur")
    .typeError("Sayı olmalı")
    .min(1, "En az 1 olmalı"),
  height: Yup.number()
    .required("Yükseklik zorunludur")
    .typeError("Sayı olmalı")
    .min(1, "En az 1 olmalı"),
  width: Yup.number()
    .required("Genişlik zorunludur")
    .typeError("Sayı olmalı")
    .min(1, "En az 1 olmalı"),
  distanceUnit: Yup.string()
    .oneOf(["cm", "m", "mm"], "Geçersiz birim")
    .required("Birim zorunludur"),
  weight: Yup.number()
    .required("Ağırlık zorunludur")
    .typeError("Sayı olmalı")
    .min(1, "Ağırlık pozitif olmalı"),
  massUnit: Yup.string()
    .oneOf(["kg", "g", "mg"], "Geçersiz ağırlık birimi")
    .required("Ağırlık birimi zorunludur"),
  cargoCompany: Yup.string().required("Kargo şirketi zorunludur"),
});

export const initialValuesAnlasmali = {
  length: 0,
  height: 0,
  width: 0,
  distanceUnit: "cm",
  weight: 0,
  massUnit: "kg",
  cargoCompany: "",
};
