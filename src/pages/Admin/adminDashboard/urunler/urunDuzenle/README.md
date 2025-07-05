# Ürün Düzenleme Sayfası

Bu sayfa, mevcut ürünleri düzenlemek için kullanılır. Formik ve Yup kullanılarak güvenli ve kullanıcı dostu bir form yapısı oluşturulmuştur.

## Özellikler

- **Formik Entegrasyonu**: Form yönetimi için Formik kullanılır
- **Yup Validasyonu**: Güvenli veri girişi için Yup şeması kullanılır
- **Tehlikeli Karakter Koruması**: XSS saldırılarına karşı koruma
- **Resim Yükleme**: Kapak resmi ve ürün resimleri yükleme
- **Kategori Seçimi**: Çoklu kategori seçimi
- **Gerçek Zamanlı Validasyon**: Anlık hata gösterimi
- **Loading States**: Yükleme durumları yönetimi

## Dosya Yapısı

```
urunDuzenle/
├── UrunDuzenle.jsx          # Ana component
├── hooks/
│   ├── useUrunDuzenleForm.js # Form logic hook
│   └── index.js             # Hook exports
├── components/
│   ├── ImageUpload.jsx      # Resim yükleme componenti
│   ├── CategorySelector.jsx # Kategori seçici
│   ├── ProductFormFields.jsx # Form alanları
│   └── index.js            # Component exports
└── README.md               # Bu dosya
```

## Güvenlik Önlemleri

### Tehlikeli Karakter Koruması

```javascript
const dangerousCharRegex = /^[^<>;'"]*$/;
```

Bu regex ile aşağıdaki tehlikeli karakterler engellenir:

- `<` (HTML tag başlangıcı)
- `>` (HTML tag bitişi)
- `;` (JavaScript statement separator)
- `'` (Single quote)
- `"` (Double quote)

### Veri Tipi Validasyonu

- **Sayısal Alanlar**: `quantity`, `stockNotification`, `salePrice`, `comparePrice`, `buyingPrice`, `taxRate`
- **Metin Alanları**: `name`, `shortDescription`, `productDescription`
- **Seçim Alanları**: `published`, `disableOutOfStock`, `productType`

## Kullanım

```jsx
import UrunDuzenle from "./pages/Admin/adminDashboard/urunler/urunDuzenle/UrunDuzenle";

// Route tanımı
<Route
  path="/admins/urunler/:productLinkName/edit"
  element={<UrunDuzenle />}
/>;
```

## Hook Kullanımı

```jsx
const {
  inputRef,
  isLoading,
  images,
  coverImage,
  categoryIds,
  categories,
  handleImageUpload,
  handleRemoveImage,
  handleKapakImageChange,
  handleCategoryChange,
  initialValues,
  validationSchema,
  onSubmit,
} = useUrunDuzenleForm();
```

## Validasyon Kuralları

- **Ürün İsmi**: 2-100 karakter, tehlikeli karakter yok
- **Kısa Açıklama**: 10-200 karakter, tehlikeli karakter yok
- **Açıklama**: En az 20 karakter, tehlikeli karakter yok
- **Stok**: Pozitif tam sayı
- **Stok Alarmı**: Pozitif tam sayı
- **Fiyatlar**: Pozitif sayı (ondalıklı olabilir)
- **Vergi Oranı**: 0-100 arası sayı
- **Kategoriler**: En az bir kategori seçilmeli

## Hata Yönetimi

- API hataları için Redux alert sistemi kullanılır
- Form validasyon hataları Formik tarafından yönetilir
- Loading states ile kullanıcı deneyimi iyileştirilir
