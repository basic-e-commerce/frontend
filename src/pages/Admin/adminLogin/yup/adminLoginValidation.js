import * as Yup from "yup";

const dangerousPattern = /[<>{}="'`;()\[\]\\]/;

export const adminLoginValidationSchema = Yup.object().shape({
  username: Yup.string()
    .email("Geçerli bir e-posta adresi giriniz.")
    .required("Kullanıcı adı zorunludur.")
    .min(5, "Kullanıcı adı en az 5 karakter olmalıdır.")
    .test(
      "no-dangerous-chars",
      "Geçersiz karakterler içeriyor.",
      (value) => !dangerousPattern.test(value || "")
    ),
  password: Yup.string()
    .required("Şifre zorunludur.")
    .min(6, "Şifre en az 6 karakter olmalıdır.")
    .test(
      "no-dangerous-chars",
      "Geçersiz karakterler içeriyor.",
      (value) => !dangerousPattern.test(value || "")
    ),
});
