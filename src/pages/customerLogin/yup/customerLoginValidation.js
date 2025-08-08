import * as Yup from "yup";

// Tehlikeli karakterleri engelleyen regex
const forbiddenCharsRegex = /[<>"'`;\\]/;

export const customerLoginValidationSchema = Yup.object({
  firstName: Yup.string()
    .required("Ad zorunludur")
    .min(2, "Ad en az 2 karakter olmalı")
    .max(30, "Ad en fazla 30 karakter olmalı")
    .matches(
      /^[a-zA-ZçÇğĞıİöÖşŞüÜ\s-]+$/,
      "Ad sadece harf ve boşluk içerebilir"
    )
    .test(
      "forbidden-chars",
      "Ad alanında tehlikeli karakterler kullanılamaz",
      (value) => !forbiddenCharsRegex.test(value || "")
    ),
  lastName: Yup.string()
    .required("Soyad zorunludur")
    .min(2, "Soyad en az 2 karakter olmalı")
    .max(30, "Soyad en fazla 30 karakter olmalı")
    .matches(
      /^[a-zA-ZçÇğĞıİöÖşŞüÜ\s-]+$/,
      "Soyad sadece harf ve boşluk içerebilir"
    )
    .test(
      "forbidden-chars",
      "Soyad alanında tehlikeli karakterler kullanılamaz",
      (value) => !forbiddenCharsRegex.test(value || "")
    ),
  username: Yup.string()
    .required("E-posta zorunludur")
    .email("Geçerli bir e-posta giriniz")
    .max(50, "E-posta en fazla 50 karakter olmalı")
    .test(
      "forbidden-chars",
      "E-posta alanında tehlikeli karakterler kullanılamaz",
      (value) => !forbiddenCharsRegex.test(value || "")
    ),
  password: Yup.string()
    .required("Şifre zorunludur")
    .min(6, "Şifre en az 6 karakter olmalı")
    .max(50, "Şifre en fazla 50 karakter olmalı")
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d!@#$%^&*()_+\-=\]{};':"\\|,.<>/?]+$/,
      "Şifre en az bir harf ve bir rakam içermeli"
    )
    .test(
      "forbidden-chars",
      "Şifre alanında tehlikeli karakterler kullanılamaz",
      (value) => !forbiddenCharsRegex.test(value || "")
    ),
  rePassword: Yup.string()
    .required("Şifre tekrarı zorunludur")
    .oneOf([Yup.ref("password"), null], "Şifreler eşleşmiyor"),
  privacyPolicy: Yup.boolean()
    .oneOf([true], "Sözleşmeleri kabul etmelisiniz")
    .required("Sözleşmeleri kabul etmelisiniz"),
});
