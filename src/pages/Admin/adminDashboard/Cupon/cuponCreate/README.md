# CategoryCreate Component

Bu component, kategori oluşturma işlevselliğini sağlar ve modüler bir yapıya sahiptir.

## Yapı

```
categoryCreate/
├── CategoryCreate.jsx          # Ana component
├── CategoryCreate.scss         # Stil dosyası
├── README.md                   # Bu dosya
├── hooks/
│   ├── index.js               # Hook export'ları
│   └── useCategoryCreate.js   # Custom hook
└── components/
    ├── index.js               # Component export'ları
    ├── ImageUploader.jsx      # Resim yükleme component'i
    └── CategoryForm.jsx       # Form alanları component'i
```

## Bileşenler

### CategoryCreate.jsx

Ana component. Custom hook'u kullanarak state yönetimi yapar ve alt componentleri render eder.

### useCategoryCreate.js

Custom hook. Tüm state yönetimi ve API işlemlerini içerir:

- Form state'i
- Resim yükleme
- API çağrıları
- Error handling

### ImageUploader.jsx

Resim yükleme işlevselliği için ayrı component:

- Dosya seçimi
- Önizleme
- Drag & drop desteği

### CategoryForm.jsx

Form alanları için ayrı component:

- Kategori adı
- Üst kategori seçimi
- Açıklama
- Submit butonu

## Kullanım

```jsx
import CategoryCreate from "./CategoryCreate";

// Component otomatik olarak gerekli tüm işlevselliği sağlar
<CategoryCreate />;
```

## Özellikler

- ✅ Modüler yapı
- ✅ Custom hook ile state yönetimi
- ✅ Alt componentler ile sorumluluk ayrımı
- ✅ PropTypes ile tip kontrolü
- ✅ Error handling
- ✅ Loading states
- ✅ Form validation
