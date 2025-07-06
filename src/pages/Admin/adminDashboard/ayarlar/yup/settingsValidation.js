import * as yup from "yup";

// Türk telefon numarası için regex
const phoneRegex = /^(\+90|0)?[5][0-9]{9}$/;
const postalCodeRegex = /^[0-9]{5}$/;
const urlRegex = /^https?:\/\/.+/;

export const settingsValidationSchema = yup.object().shape({
  name: yup
    .string()
    .required("Mağaza adı zorunludur")
    .min(2, "Mağaza adı en az 2 karakter olmalıdır")
    .max(100, "Mağaza adı en fazla 100 karakter olabilir")
    .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, "Mağaza adı sadece harf içerebilir"),

  address: yup.object().shape({
    title: yup
      .string()
      .required("Adres başlığı zorunludur")
      .min(2, "Adres başlığı en az 2 karakter olmalıdır")
      .max(50, "Adres başlığı en fazla 50 karakter olabilir"),

    firstName: yup
      .string()
      .required("Ad zorunludur")
      .min(2, "Ad en az 2 karakter olmalıdır")
      .max(30, "Ad en fazla 30 karakter olabilir")
      .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, "Ad sadece harf içerebilir"),

    lastName: yup
      .string()
      .required("Soyad zorunludur")
      .min(2, "Soyad en az 2 karakter olmalıdır")
      .max(30, "Soyad en fazla 30 karakter olabilir")
      .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, "Soyad sadece harf içerebilir"),

    country: yup.object().shape({
      upperName: yup
        .string()
        .required("Ülke zorunludur")
        .min(2, "Ülke adı en az 2 karakter olmalıdır")
        .max(50, "Ülke adı en fazla 50 karakter olabilir")
        .matches(
          /^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/,
          "Ülke adı sadece harf içerebilir"
        ),
    }),

    city: yup
      .string()
      .required("Şehir zorunludur")
      .min(2, "Şehir adı en az 2 karakter olmalıdır")
      .max(50, "Şehir adı en fazla 50 karakter olabilir")
      .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, "Şehir adı sadece harf içerebilir"),

    addressLine1: yup
      .string()
      .required("Adres zorunludur")
      .min(10, "Adres en az 10 karakter olmalıdır")
      .max(200, "Adres en fazla 200 karakter olabilir"),

    postalCode: yup
      .string()
      .required("Posta kodu zorunludur")
      .matches(postalCodeRegex, "Geçerli bir posta kodu giriniz (5 haneli)"),

    phoneNo: yup
      .string()
      .required("Adres telefonu zorunludur")
      .matches(phoneRegex, "Geçerli bir telefon numarası giriniz"),
  }),

  phoneNo: yup
    .string()
    .required("Mağaza telefonu zorunludur")
    .matches(phoneRegex, "Geçerli bir telefon numarası giriniz"),

  email: yup
    .string()
    .required("E-posta adresi zorunludur")
    .email("Geçerli bir e-posta adresi giriniz")
    .max(100, "E-posta adresi en fazla 100 karakter olabilir"),

  minOrderAmount: yup
    .number()
    .typeError("Minimum sipariş tutarı sayı olmalıdır")
    .required("Minimum sipariş tutarı zorunludur")
    .min(0, "Minimum sipariş tutarı 0'dan küçük olamaz")
    .max(10000, "Minimum sipariş tutarı 10.000 TL'den fazla olamaz"),

  shippingFee: yup
    .number()
    .typeError("Kargo ücreti sayı olmalıdır")
    .required("Kargo ücreti zorunludur")
    .min(0, "Kargo ücreti 0'dan küçük olamaz")
    .max(1000, "Kargo ücreti 1.000 TL'den fazla olamaz"),

  emailPassword: yup
    .string()
    .nullable()
    .max(50, "E-posta şifresi en fazla 50 karakter olabilir"),

  instagram: yup
    .string()
    .nullable()
    .max(50, "Instagram kullanıcı adı en fazla 50 karakter olabilir")
    .matches(/^[a-zA-Z0-9._]+$/, "Geçerli bir Instagram kullanıcı adı giriniz"),

  instagramLink: yup
    .string()
    .nullable()
    .url("Geçerli bir URL giriniz")
    .matches(urlRegex, "Geçerli bir URL giriniz"),

  wpLink: yup
    .string()
    .nullable()
    .url("Geçerli bir URL giriniz")
    .matches(urlRegex, "Geçerli bir URL giriniz"),

  footerDescription: yup
    .string()
    .nullable()
    .max(500, "Footer açıklaması en fazla 500 karakter olabilir"),

  openCloseHours: yup
    .array()
    .of(
      yup.object().shape({
        day: yup.string().required(),
        hour: yup.string().required(),
        endHour: yup.string().required(),
      })
    )
    .nullable(),
});

// Input sanitization fonksiyonu
export const sanitizeInput = (value) => {
  if (typeof value === "string") {
    return value
      .replace(/[<>]/g, "") // < ve > karakterlerini kaldır
      .replace(/javascript:/gi, "") // javascript: protocol'ünü kaldır
      .replace(/on\w+=/gi, "") // event handler'ları kaldır
      .trim();
  }
  return value;
};

// Çalışma saatleri validasyonu
export const validateWorkingHours = (hours) => {
  if (!hours || !Array.isArray(hours)) return true;

  for (const hour of hours) {
    if (!hour.day || !hour.hour || !hour.endHour) {
      return false;
    }

    const startTime = new Date(`2000-01-01T${hour.hour}`);
    const endTime = new Date(`2000-01-01T${hour.endHour}`);

    if (startTime >= endTime) {
      return false;
    }
  }

  return true;
};
