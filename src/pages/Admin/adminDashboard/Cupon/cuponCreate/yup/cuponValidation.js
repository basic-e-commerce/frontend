import * as Yup from "yup";

// Tehlikeli karakterler ve SQL anahtar kelimeleri için regex
const forbiddenPattern =
  /('|"|`|;|--|#|\(|\)|,|\.|=|!=|<>|>|<|>=|<=|\+|-|\*|\/|%|\bAND\b|\bOR\b|\bNOT\b|\bLIKE\b|\bIN\b|\bIS NULL\b|\bIS NOT NULL\b)/;

export const cuponValidationnSchema = Yup.object().shape({
  code: Yup.string()
    .required("Kupon kodu zorunludur")
    .min(3, "En az 3 karakter olmalı")
    .max(32, "En fazla 32 karakter olmalı")
    .test(
      "no-sql-injection",
      "Geçersiz karakter veya kelime içeriyor",
      (value) => (value ? !forbiddenPattern.test(value) : true)
    ),
  description: Yup.string()
    .required("Açıklama zorunludur")
    .min(5, "En az 5 karakter olmalı")
    .max(256, "En fazla 256 karakter olmalı")
    .test(
      "no-sql-injection",
      "Geçersiz karakter veya kelime içeriyor",
      (value) => (value ? !forbiddenPattern.test(value) : true)
    ),
  discountValue: Yup.number()
    .required("İndirim değeri zorunludur")
    .typeError("Sayı olmalı")
    .min(1, "En az 1 olmalı")
    .max(100000, "Çok yüksek değer"),
  discountType: Yup.string().required("İndirim tipi zorunludur"),
  tatalUsageLimit: Yup.number()
    .required("Toplam kullanım limiti zorunludur")
    .typeError("Sayı olmalı")
    .min(1, "En az 1 olmalı"),
  minOrderAmountLimit: Yup.number()
    .required("Minimum sipariş tutarı zorunludur")
    .typeError("Sayı olmalı")
    .min(0, "Negatif olamaz"),
  maxOrderAmountLimit: Yup.number()
    .required("Maksimum sipariş tutarı zorunludur")
    .typeError("Sayı olmalı")
    .min(0, "Negatif olamaz"),
  startDate: Yup.date()
    .required("Başlangıç tarihi zorunludur")
    .typeError("Geçerli bir tarih girin"),
  endDate: Yup.date()
    .required("Bitiş tarihi zorunludur")
    .typeError("Geçerli bir tarih girin")
    .min(Yup.ref("startDate"), "Bitiş tarihi başlangıçtan sonra olmalı"),
  isProductAssigned: Yup.boolean().required("Zorunlu alan"),
  isCustomerAssigned: Yup.boolean().required("Zorunlu alan"),
  isActive: Yup.boolean().required("Zorunlu alan"),
});

export const initialValues = {
  code: "",
  description: "",
  discountValue: 0,
  discountType: "PERCENTAGE",
  tatalUsageLimit: "",
  minOrderAmountLimit: "",
  maxOrderAmountLimit: "",
  startDate: "",
  endDate: "",
  productIds: [],
  customerIds: [],
  isProductAssigned: false,
  isCustomerAssigned: false,
  isActive: true,
};
