import * as Yup from "yup";

export const paymentSchema = Yup.object().shape({
  cardNumber: Yup.string()
    .required("Kart numarası zorunludur")
    .matches(/^[0-9]{16}$/, "Geçerli bir kart numarası giriniz"),
  expiry: Yup.string()
    .required("Son kullanım tarihi zorunludur")
    .matches(
      /^(0[1-9]|1[0-2])\/?([0-9]{2})$/,
      "Geçerli bir tarih girin (MM/YY)"
    ),
  cvv: Yup.string()
    .required("CVV zorunludur")
    .matches(/^[0-9]{3}$/, "3 haneli CVV giriniz"),
  installment: Yup.string().required("Taksit seçimi zorunludur"),
});
