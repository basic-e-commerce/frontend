import * as Yup from "yup";

export const categoryValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required("Kategori adı zorunludur")
    .min(2, "Kategori adı en az 2 karakter olmalıdır")
    .max(50, "Kategori adı en fazla 50 karakter olmalıdır")
    .matches(/^[a-zA-ZğüşıöçĞÜŞİÖÇ\s]+$/, "Kategori adı sadece harf içerebilir")
    .test(
      "no-dangerous-chars",
      "Kategori adında tehlikeli karakterler bulunamaz",
      (value) => {
        if (!value) return true;
        // Tehlikeli karakterleri kontrol et
        const dangerousChars = /["'<>{}()[\]\\/&%$#@!*+=|;:]/;
        return !dangerousChars.test(value);
      }
    )
    .test("no-html-tags", "HTML etiketleri kullanılamaz", (value) => {
      if (!value) return true;
      // HTML etiketlerini kontrol et
      const htmlTags = /<[^>]*>/;
      return !htmlTags.test(value);
    })
    .test("no-script", "Script içeriği kullanılamaz", (value) => {
      if (!value) return true;
      // Script içeriğini kontrol et
      const scriptPattern = /script|javascript|on\w+\s*=|eval\(|alert\(/i;
      return !scriptPattern.test(value);
    })
    .trim(),

  description: Yup.string()
    .required("Açıklama zorunludur")
    .min(10, "Açıklama en az 10 karakter olmalıdır")
    .max(500, "Açıklama en fazla 500 karakter olmalıdır")
    .test(
      "no-dangerous-chars",
      "Açıklamada tehlikeli karakterler bulunamaz",
      (value) => {
        if (!value) return true;
        // Tehlikeli karakterleri kontrol et (açıklamada daha esnek)
        const dangerousChars = /["'<>{}()[\]\\/&%$#@!*+=|;:]/;
        return !dangerousChars.test(value);
      }
    )
    .test("no-html-tags", "HTML etiketleri kullanılamaz", (value) => {
      if (!value) return true;
      // HTML etiketlerini kontrol et
      const htmlTags = /<[^>]*>/;
      return !htmlTags.test(value);
    })
    .test("no-script", "Script içeriği kullanılamaz", (value) => {
      if (!value) return true;
      // Script içeriğini kontrol et
      const scriptPattern = /script|javascript|on\w+\s*=|eval\(|alert\(/i;
      return !scriptPattern.test(value);
    })
    .trim(),

  parentCategoryId: Yup.string().required("Üst kategori seçimi zorunludur"),

  coverImage: Yup.mixed()
    .nullable()
    .test("fileSize", "Dosya boyutu çok büyük", (value) => {
      if (!value) return true;
      if (typeof value === "string") return true; // Mevcut resim URL'si
      return value && value.size <= 5 * 1024 * 1024; // 5MB limit
    })
    .test("fileType", "Sadece resim dosyaları kabul edilir", (value) => {
      if (!value) return true;
      if (typeof value === "string") return true; // Mevcut resim URL'si
      return (
        value && ["image/jpeg", "image/png", "image/webp"].includes(value.type)
      );
    }),
});

export const initialValues = {
  id: "",
  name: "",
  description: "",
  parentCategoryId: "0",
  coverImage: "",
};
