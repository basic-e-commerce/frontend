# Category Form Modüler Yapısı

Bu klasör, kategori düzenleme formunun modüler yapısını içerir. Kod, mantıksal işlevselliği ve UI bileşenlerini ayırarak daha sürdürülebilir ve test edilebilir hale getirilmiştir.

## Klasör Yapısı

```
categoryList/
├── components/           # UI Bileşenleri
│   ├── CategorySingleDown.jsx      # Kategori seçim dropdown'u
│   ├── ImageUploader.jsx           # Resim yükleme bileşeni
│   ├── FormFields.jsx              # Form alanları bileşeni
│   └── DeleteConfirmationModal.jsx # Silme onay modal'ı
├── hooks/               # Custom Hook'lar
│   └── useCategoryForm.js          # Ana form mantığı
├── yup/                 # Validation Şemaları
│   └── categoryValidation.js       # Yup validation kuralları
├── CategoryForm.jsx     # Ana form bileşeni
├── CategoryForm.scss    # Stil dosyası
└── README.md           # Bu dosya
```

## Bileşenler

### 1. CategoryForm.jsx (Ana Bileşen)

- Tüm alt bileşenleri birleştiren ana form bileşeni
- `useCategoryForm` hook'unu kullanarak form mantığını yönetir
- Sadece UI render etme sorumluluğu vardır

### 2. components/CategorySingleDown.jsx

- Kategori seçimi için dropdown bileşeni
- Ana kategoriler ve alt kategorileri hiyerarşik olarak gösterir
- Redux ile kategori seçimini yönetir

### 3. components/ImageUploader.jsx

- Resim yükleme işlevselliği
- Mevcut resim gösterimi ve yeni resim yükleme
- Formik validation entegrasyonu

### 4. components/FormFields.jsx

- Form alanları (kategori adı, açıklama)
- Formik validation mesajları
- Error state yönetimi

### 5. components/DeleteConfirmationModal.jsx

- Kategori silme onay modal'ı
- Popup state yönetimi

## Hook'lar

### useCategoryForm.js

Ana form mantığını içeren custom hook:

**State Yönetimi:**

- `showPopupCategory`: Modal görünürlük durumu
- `initialKapakImages`: Başlangıç resim URL'si
- `renderedImage`: Görüntülenecek resim
- `isFormChanged`: Form değişiklik kontrolü

**Formik Entegrasyonu:**

- Form state yönetimi
- Validation kuralları
- Submit işlemleri

**Handler Fonksiyonları:**

- `handleKapakImageChange`: Resim değişikliği
- `handleConfirmDeleteCategory`: Kategori silme
- `handleOpenDeletePopup`: Modal açma
- `handleCloseDeletePopup`: Modal kapatma

## Validation

### yup/categoryValidation.js

Yup kütüphanesi ile form doğrulama kuralları:

**Kategori Adı:**

- Zorunlu alan
- 2-50 karakter arası
- Sadece harf ve boşluk karakterleri
- Türkçe karakter desteği

**Açıklama:**

- Zorunlu alan
- 10-500 karakter arası

**Resim:**

- Opsiyonel alan
- Maksimum 5MB boyut
- Sadece resim dosya türleri (JPEG, PNG, WebP)

## Güvenlik Özellikleri

1. **Input Sanitization**: Türkçe karakter desteği ile güvenli karakter kontrolü
2. **File Validation**: Dosya boyutu ve türü kontrolü
3. **XSS Koruması**: Formik'in built-in XSS koruması
4. **Type Safety**: Yup validation ile tip güvenliği

## Kullanım

```jsx
import CategoryForm from "./CategoryForm";

// Component içinde kullanım
<CategoryForm />;
```

## Avantajlar

1. **Modülerlik**: Her bileşen tek bir sorumluluğa sahip
2. **Yeniden Kullanılabilirlik**: Bileşenler başka yerlerde kullanılabilir
3. **Test Edilebilirlik**: Hook'lar ve bileşenler ayrı ayrı test edilebilir
4. **Sürdürülebilirlik**: Kod daha organize ve anlaşılır
5. **Validation**: Güçlü form doğrulama sistemi
6. **Güvenlik**: Tehlikeli girişlere karşı koruma

## Bağımlılıklar

- `formik`: Form yönetimi
- `yup`: Form doğrulama
- `@mui/icons-material`: İkonlar
- `react-redux`: State yönetimi
- `react-router-dom`: Routing
