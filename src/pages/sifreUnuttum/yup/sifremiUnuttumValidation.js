import * as Yup from "yup";

// Tehlikeli karakterleri engelleyen regex
const forbiddenCharsRegex = /[<>"'`;\\]/;

export const sifremiUnuttumValidation = Yup.object({
  username: Yup.string()
    .required("E-posta zorunludur")
    .email("Geçerli bir e-posta giriniz")
    .max(50, "E-posta en fazla 50 karakter olmalı")
    .test(
      "forbidden-chars",
      "E-posta alanında tehlikeli karakterler kullanılamaz",
      (value) => !forbiddenCharsRegex.test(value || "")
    ),
});
