// validations/checkoutValidation.js
import * as Yup from "yup";

// Tehlikeli karakterleri engelleyen regex (harf, rakam, boşluk, bazı noktalama işaretleri)
const safeTextRegex = /^[a-zA-Z0-9ğüşöçıİĞÜŞÖÇ\s\.\,\-\/]+$/;
const postalCodeRegex = /^\d{5}$/;
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export const checkoutValidation = Yup.object().shape({
  // Ana akış
  diffAddress: Yup.boolean(),
  billingSame: Yup.boolean(),
  invoiceType: Yup.string().oneOf(["INDIVIDUAL", "CORPORATE"]).required(),

  // seçili adres ID kontrolü
  selectedAdresId: Yup.string().when("diffAddress", {
    is: false, // manuel adres seçili değilse
    then: (schema) => schema.required("Lütfen bir kayıtlı adres seçiniz"),
    otherwise: (schema) => schema.notRequired(),
  }),

  // Adres
  address: Yup.object().when("diffAddress", {
    is: true,
    then: (schema) =>
      schema.shape({
        title: Yup.string()
          .required("Başlık zorunlu")
          .matches(safeTextRegex, "Geçersiz karakter"),
        username: Yup.string()
          .required("E-posta zorunlu")
          .matches(emailRegex, "Geçerli bir e-posta giriniz"),
        firstName: Yup.string()
          .required("Ad zorunlu")
          .matches(safeTextRegex, "Geçersiz karakter"),
        lastName: Yup.string()
          .required("Soyad zorunlu")
          .matches(safeTextRegex, "Geçersiz karakter"),
        phoneNo: Yup.string()
          .required("Telefon alanı zorunludur")
          .test(
            "telefon-format",
            "Telefon numarası +90 ile başlamalı ve doğru telefon girilmelidir",
            function (value) {
              if (!value) return false;

              if (value.length === 13 && value.startsWith("+90")) {
                return true;
              }

              const phoneRegex = /^\+90\s?5\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
              return phoneRegex.test(value);
            }
          ),
        addressLine1: Yup.string()
          .required("Adres zorunlu")
          .matches(safeTextRegex, "Geçersiz karakter"),
        postalCode: Yup.string()
          .required("Posta kodu zorunlu")
          .matches(postalCodeRegex, "5 haneli posta kodu giriniz"),
        cityCode: Yup.string().required("Şehir seçiniz"),
        districtId: Yup.string().required("İlçe seçiniz"),
      }),
    otherwise: (schema) => schema.notRequired(),
  }),

  // Fatura adresi
  invoiceAddress: Yup.object().when("billingSame", {
    is: false,
    then: (schema) =>
      schema.shape({
        title: Yup.string()
          .required("Başlık zorunlu")
          .matches(safeTextRegex, "Geçersiz karakter"),
        username: Yup.string()
          .required("E-posta zorunlu")
          .matches(emailRegex, "Geçerli bir e-posta giriniz"),
        firstName: Yup.string()
          .required("Ad zorunlu")
          .matches(safeTextRegex, "Geçersiz karakter"),
        lastName: Yup.string()
          .required("Soyad zorunlu")
          .matches(safeTextRegex, "Geçersiz karakter"),
        phoneNo: Yup.string()
          .required("Telefon alanı zorunludur")
          .test(
            "telefon-format",
            "Telefon numarası +90 ile başlamalı ve doğru telefon girilmelidir",
            function (value) {
              if (!value) return false;

              if (value.length === 13 && value.startsWith("+90")) {
                return true;
              }

              const phoneRegex = /^\+90\s?5\d{2}\s?\d{3}\s?\d{2}\s?\d{2}$/;
              return phoneRegex.test(value);
            }
          ),
        addressLine1: Yup.string()
          .required("Adres zorunlu")
          .matches(safeTextRegex, "Geçersiz karakter"),
        postalCode: Yup.string()
          .required("Posta kodu zorunlu")
          .matches(postalCodeRegex, "5 haneli posta kodu giriniz"),
        cityCode: Yup.string().required("Şehir seçiniz"),
        districtId: Yup.string().required("İlçe seçiniz"),
      }),
    otherwise: (schema) => schema.notRequired(),
  }),

  // Kurumsal fatura bilgileri
  corporateInvoice: Yup.object().when("invoiceType", {
    is: "CORPORATE",
    then: (schema) =>
      schema.shape({
        taxOffice: Yup.string()
          .required("Vergi dairesi zorunlu")
          .matches(safeTextRegex, "Geçersiz karakter"),
        taxNumber: Yup.string()
          .required("Vergi numarası zorunlu")
          .matches(/^\d{10}$/, "10 haneli vergi numarası giriniz"),
        companyName: Yup.string()
          .required("Ticaret ünvanı zorunlu")
          .matches(safeTextRegex, "Geçersiz karakter"),
      }),
    otherwise: (schema) => schema.notRequired(),
  }),
});
