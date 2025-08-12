# CustomerLogin Modüler Yapı

Bu klasör, müşteri giriş (login) sayfasının modüler ve güvenli bir şekilde yönetilmesi için yeniden yapılandırılmıştır.

## Klasör Yapısı

```
customerLogin/
  ├── components/
  │     └── CustomerLoginForm.jsx   # Sadece formun UI ve Formik ile bağlantısı
  ├── hooks/
  │     └── useCustomerLoginForm.js # Formun state, handler ve API logic'i, validasyon
  ├── CustomerLogin.jsx             # Sayfa componenti, sade ve yönlendirici
  ├── CustomerLogin.scss            # Stil dosyası
  └── README.md                     # Bu dosya
```

## Kullanım ve Akış

- **CustomerLogin.jsx**: Sadece sayfa iskeletini ve yönlendirmeleri içerir. State ve logic içermez. Formik ve Yup ile validasyon ve login işlemleri için custom hook'u (`useCustomerLoginForm`) kullanır.
- **components/CustomerLoginForm.jsx**: Formun UI'ını ve Formik ile bağlantısını içerir. Hataları ve inputları Formik üzerinden yönetir.
- **hooks/useCustomerLoginForm.js**: Tüm form state'leri, submit handler, API çağrısı ve Yup ile validasyon şemasını içerir. Formik hook'u burada tanımlanır ve kullanıma hazır şekilde döner.

## Formik & Yup Validasyonu

- Formik ile form state ve submit işlemleri yönetilir.
- Yup ile aşağıdaki validasyonlar yapılır:
  - Ad ve Soyad: Zorunlu, minimum 2 karakter
  - E-posta: Zorunlu, geçerli e-posta formatı
  - Şifre: Zorunlu, minimum 6 karakter
  - Şifre Tekrar: Zorunlu, şifre ile aynı olmalı
- API'den dönen hatalar da formik.errors.general ile kullanıcıya gösterilir.

## Güvenlik

- Yup ile tip ve zorunluluk kontrolleri yapılır.
- Form inputları otomatik olarak HTML injection ve XSS'e karşı korumalıdır.
- API hataları kullanıcıya güvenli şekilde gösterilir.

## Kullanım

CustomerLogin.jsx doğrudan route olarak kullanılabilir. Form ve logic otomatik olarak bağlanır.

```jsx
import CustomerLogin from "./customerLogin/CustomerLogin";
// ...
<Route path="/login" element={<CustomerLogin />} />;
```
