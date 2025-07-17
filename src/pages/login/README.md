# Login Modülü - Klasör Yapısı ve Kullanım

## Klasör Yapısı

```
login/
├── components/
│   └── LoginForm.jsx      # Sadece görsel ve Formik ile formun render edildiği component
├── hooks/
│   └── useLoginForm.js    # Tüm state, handler ve form logic burada
├── Login.jsx              # Sayfa componenti, yönlendirme ve genel layout
├── Login.scss             # Stil dosyası
```

## Kullanım

- **Login.jsx**: Sayfa componentidir. Yönlendirme ve genel layout burada bulunur. Form logic ve state içermez.
- **components/LoginForm.jsx**: Sadece formun görselini ve Formik ile formun render edilmesini sağlar. State ve handler içermez.
- **hooks/useLoginForm.js**: Tüm form state, handler, validasyon ve API işlemleri burada yönetilir. Formik ve Yup ile güvenli doğrulama yapılır.

### Formik & Yup

- Formik ile form state ve submit işlemleri yönetilir.
- Yup ile e-posta ve şifre için güvenli ve tipine uygun validasyon yapılır (ör: required, minLength, typeError).

### Güvenlik

- Yup ile tehlikeli girişlere karşı validasyon sağlanır.
- API hataları kullanıcıya güvenli şekilde gösterilir.

## Nasıl Kullanılır?

```jsx
import Login from "./login/Login";

// ...
<Route path="/login" element={<Login />} />;
```

Form ve state yönetimi için ekstra bir işleme gerek yoktur. Tüm logic hook içinde yönetilir.
