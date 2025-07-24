import * as Yup from "yup";

export const loginValidationSchema = Yup.object({
  username: Yup.string()
    .email("Geçerli bir e-posta adresi giriniz.")
    .matches(
      /^[^<>="`]+$/,
      "E-posta '<', '>', '=', \" ve '`' gibi tehlikeli karakterler içeremez."
    )
    .required("Kullanıcı adı zorunludur."),
  password: Yup.string()
    .min(6, "Şifre en az 6 karakter olmalıdır.")
    .matches(
      /^[a-zA-Z0-9!@#$%^&*()_+=\-\.]+$/,
      "Şifre sadece harf, rakam ve !@#$%^&*()_+=-., karakterlerini içerebilir; boşluk ve tehlikeli karakterler içeremez."
    )
    .required("Şifre zorunludur."),
});
