# Admin Login Refactor

## Klasör Yapısı

```
adminLogin/
  ├── AdminLogin.jsx           # Sayfa bileşeni (container)
  ├── AdminLogin.scss          # Stil dosyası
  ├── components/
  │     └── AdminLoginForm.jsx # Formik ile formun sunum bileşeni
  ├── hooks/
  │     └── useAdminLoginForm.js # Form state ve handler mantığı
  └── yup/
        └── adminLoginValidation.js # Yup ile güvenli doğrulama şeması
```

## Kullanım

- **AdminLogin.jsx**: Sayfa bileşeni, sadece yönlendirme ve genel yapıyı içerir. Form mantığı ve UI ayrı dosyalara taşındı.
- **components/AdminLoginForm.jsx**: Formik ile oluşturulmuş, sadece sunum ve validasyon hatalarını gösteren saf bir bileşen.
- **hooks/useAdminLoginForm.js**: API çağrısı, loading state ve submit handler burada yönetilir. Formik'in `onSubmit` fonksiyonu olarak kullanılır.
- **yup/adminLoginValidation.js**: Yup ile oluşturulmuş, tehlikeli karakterlere karşı korumalı, detaylı validasyon şeması.

## Güvenlik ve Validasyon

- **Yup şeması** ile hem e-posta hem şifre alanında tehlikeli karakterler (örn. <, >, ', ", ;, [, ], vs.) regex ile engellenir.
- Zorunlu alanlar, minimum uzunluk ve tip kontrolleri yapılır.
- Formik ile submit öncesi tüm validasyonlar çalışır, hatalar kullanıcıya gösterilir.
- API'ye gönderilen veriler önceden filtrelenmiş olur.

## Nasıl Kullanılır?

```jsx
import AdminLogin from "./adminLogin/AdminLogin";

// ...
<Route path="/admins/login" element={<AdminLogin />} />;
```

## Ekstra

- Kodun mantıksal akışı orijinal yapıya sadık kalacak şekilde modülerleştirildi.
- Yeni bir form alanı eklemek için sadece Yup şemasını ve Formik alanını güncellemek yeterli.
- Tüm custom logic (state, handler, API call) hook dosyasına taşındı.
