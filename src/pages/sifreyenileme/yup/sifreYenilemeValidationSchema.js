import * as Yup from "yup";

// Tehlikeli karakterleri engelleyen regex
const forbiddenCharsRegex = /[<>"'`;\\]/;

export const sifreYenilemeValidationSchema = Yup.object({
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
});
