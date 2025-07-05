import * as Yup from "yup";

// Tehlikeli karakterleri engelleyen regex (XSS koruması)
const dangerousCharRegex = /^[^<>;'"=]*$/;

export const productSchema = Yup.object().shape({
  name: Yup.string()
    .required("Ürün ismi gereklidir")
    .min(2, "En az 2 karakter olmalı")
    .max(100, "En fazla 100 karakter olabilir")
    .matches(dangerousCharRegex, "Geçersiz karakter içeriyor"),

  quantity: Yup.number()
    .typeError("Stok miktarı sayı olmalıdır")
    .required("Stok miktarı gereklidir")
    .min(0, "Stok miktarı 0'dan küçük olamaz")
    .integer("Stok miktarı tam sayı olmalıdır")
    .test("is-valid-number", "Geçerli bir sayı giriniz", (value) => {
      if (value === null || value === undefined || value === "") return false;
      return !isNaN(value) && isFinite(value);
    }),

  stockNotification: Yup.number()
    .typeError("Stok alarmı sayı olmalıdır")
    .required("Stok alarmı gereklidir")
    .min(0, "Stok alarmı 0'dan küçük olamaz")
    .integer("Stok alarmı tam sayı olmalıdır")
    .test("is-valid-number", "Geçerli bir sayı giriniz", (value) => {
      if (value === null || value === undefined || value === "") return false;
      return !isNaN(value) && isFinite(value);
    }),

  salePrice: Yup.number()
    .typeError("Fiyat sayı olmalıdır")
    .required("Fiyat gereklidir")
    .min(0, "Fiyat 0'dan küçük olamaz")
    .test("is-valid-number", "Geçerli bir sayı giriniz", (value) => {
      if (value === null || value === undefined || value === "") return false;
      return !isNaN(value) && isFinite(value);
    })
    .test("decimal", "Fiyat en fazla 2 ondalık basamak içerebilir", (value) => {
      if (!value) return true;
      return /^\d+(\.\d{1,2})?$/.test(value.toString());
    }),

  comparePrice: Yup.number()
    .typeError("Fiyat sayı olmalıdır")
    .required("Fiyat gereklidir")
    .min(0, "Fiyat 0'dan küçük olamaz")
    .test("is-valid-number", "Geçerli bir sayı giriniz", (value) => {
      if (value === null || value === undefined || value === "") return false;
      return !isNaN(value) && isFinite(value);
    })
    .test("decimal", "Fiyat en fazla 2 ondalık basamak içerebilir", (value) => {
      if (!value) return true;
      return /^\d+(\.\d{1,2})?$/.test(value.toString());
    }),

  buyingPrice: Yup.number()
    .typeError("Alış fiyatı sayı olmalıdır")
    .required("Alış fiyatı gereklidir")
    .min(0, "Alış fiyatı 0'dan küçük olamaz")
    .test("is-valid-number", "Geçerli bir sayı giriniz", (value) => {
      if (value === null || value === undefined || value === "") return false;
      return !isNaN(value) && isFinite(value);
    })
    .test(
      "decimal",
      "Alış fiyatı en fazla 2 ondalık basamak içerebilir",
      (value) => {
        if (!value) return true;
        return /^\d+(\.\d{1,2})?$/.test(value.toString());
      }
    ),

  taxRate: Yup.number()
    .typeError("Vergi oranı sayı olmalıdır")
    .required("Vergi oranı gereklidir")
    .min(0, "Vergi oranı 0'dan küçük olamaz")
    .max(100, "Vergi oranı 100'den büyük olamaz")
    .test("is-valid-number", "Geçerli bir sayı giriniz", (value) => {
      if (value === null || value === undefined || value === "") return false;
      return !isNaN(value) && isFinite(value);
    })
    .test(
      "decimal",
      "Vergi oranı en fazla 2 ondalık basamak içerebilir",
      (value) => {
        if (!value) return true;
        return /^\d+(\.\d{1,2})?$/.test(value.toString());
      }
    ),

  published: Yup.string()
    .required("Yayın durumu seçilmelidir")
    .oneOf(["true", "false"], "Geçerli bir yayın durumu seçiniz")
    .matches(dangerousCharRegex, "Geçersiz karakter içeriyor"),

  disableOutOfStock: Yup.string()
    .required("Stok tükenme durumu seçilmelidir")
    .oneOf(["true", "false"], "Geçerli bir stok tükenme durumu seçiniz")
    .matches(dangerousCharRegex, "Geçersiz karakter içeriyor"),

  productType: Yup.string()
    .required("Ürün tipi seçilmelidir")
    .oneOf(["SIMPLE"], "Geçerli bir ürün tipi seçiniz")
    .matches(dangerousCharRegex, "Geçersiz karakter içeriyor"),

  shortDescription: Yup.string()
    .required("Kısa açıklama gereklidir")
    .min(10, "En az 10 karakter olmalı")
    .max(200, "En fazla 200 karakter olabilir")
    .matches(dangerousCharRegex, "Geçersiz karakter içeriyor"),

  productDescription: Yup.string()
    .required("Ürün açıklaması gereklidir")
    .min(20, "En az 20 karakter olmalı")
    .max(2000, "En fazla 2000 karakter olabilir")
    .matches(dangerousCharRegex, "Geçersiz karakter içeriyor"),
});
