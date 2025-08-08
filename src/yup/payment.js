import * as Yup from "yup";

export const paymentSchema = Yup.object().shape({
  fullName: Yup.string()
    .required("Ad Soyad gereklidir")
    .min(3, "En az 3 karakter olmalı")
    .max(50, "En fazla 50 karakter olabilir"),
  cardNumber: Yup.string()
    .required("Kart numarası zorunludur")
    .matches(/^[0-9]{16}$/, "Geçerli bir kart numarası giriniz"),
  expiryMonth: Yup.string()
    .required("Ay zorunludur")
    .matches(/^(0[1-9]|1[0-2])$/, "Geçerli bir ay giriniz (01 - 12)"),
  expiryYear: Yup.string()
    .required("Yıl zorunludur")
    .matches(/^20[2-9][0-9]$/, "Geçerli bir yıl giriniz (ör. 2038)"),
  cvv: Yup.string()
    .required("CVV zorunludur")
    .matches(/^[0-9]{3}$/, "3 haneli CVV giriniz"),
  installment: Yup.string().required("Taksit seçimi zorunludur"),
  distanceSalesContract: Yup.boolean()
    .oneOf([true], "Mesafeli satış sözleşmelerini onaylamanız gereklidir")
    .required("Mesafeli satış sözleşmelerini onaylamanız gereklidir"),
  kvkkConsent: Yup.boolean()
    .oneOf([true], "KVKK Aydınlatma Metni'ni onaylamanız gereklidir")
    .required("KVKK Aydınlatma Metni'ni onaylamanız gereklidir"),
});
