# UrunList Component

Bu component, admin panelinde ürünleri kategori bazında listelemek için kullanılır.

## 📁 Dosya Yapısı

```
UrunList/
├── UrunList.jsx                 # Ana component
├── UrunList.scss               # Ana component stilleri
├── README.md                   # Bu dosya
├── hooks/
│   ├── index.js               # Hook export'ları
│   └── useUrunList.js         # Custom hook - component logic'i
└── components/
    ├── index.js               # Component export'ları
    ├── CategorySelector.jsx   # Kategori seçici component
    ├── CategorySelector.scss  # Kategori seçici stilleri
    ├── ProductTable.jsx       # Ürün tablosu component
    ├── ProductTable.scss      # Ürün tablosu stilleri
    ├── ProductTableRow.jsx    # Ürün satırı component
    ├── ProductTableRow.scss   # Ürün satırı stilleri
    ├── NoProductsMessage.jsx  # Ürün bulunamadı mesajı
    └── NoProductsMessage.scss # Ürün bulunamadı mesajı stilleri
```

## 🎯 Özellikler

- **Kategori Bazlı Filtreleme**: Ürünleri kategoriye göre filtreleme
- **Sayfalama**: Ürünleri sayfalama ile gösterme
- **Responsive Tasarım**: Mobil uyumlu tablo tasarımı
- **Ürün Detayları**: Ürün adı, fiyat, stok, rating bilgileri
- **Aksiyon Butonları**: Görüntüleme ve düzenleme butonları

## 🔧 Kullanım

```jsx
import UrunList from "./UrunList";

function AdminPanel() {
  return (
    <div>
      <h1>Ürün Yönetimi</h1>
      <UrunList />
    </div>
  );
}
```

## 🏗️ Component Yapısı

### 1. UrunList (Ana Component)

- Component'in ana wrapper'ı
- Custom hook kullanarak state yönetimi
- Alt componentleri organize eder

### 2. useUrunList (Custom Hook)

- Redux state yönetimi
- API çağrıları
- Local state yönetimi
- Event handler'lar

### 3. CategorySelector

- Kategori seçim dropdown'u
- Props: `categories`, `selectedCategoryId`, `onCategoryChange`

### 4. ProductTable

- Ürün tablosunun ana yapısı
- Props: `currentItems`

### 5. ProductTableRow

- Tek bir ürün satırı
- Props: `item`

### 6. NoProductsMessage

- Ürün bulunamadığında gösterilen mesaj

## 📊 Redux State

```javascript
// products slice
{
  products: [], // Ürün listesi
  productsStatus: 'idle' | 'loading' | 'succeeded' | 'failed'
}

// categories slice
{
  categories: [] // Kategori listesi
}
```

## 🎨 Stil Özellikleri

- **Modern Tasarım**: Temiz ve profesyonel görünüm
- **Hover Efektleri**: Kullanıcı etkileşimi için hover efektleri
- **Responsive**: Mobil cihazlarda uyumlu görünüm
- **Consistent Spacing**: Tutarlı boşluklar ve padding'ler

## 🔄 Data Flow

1. Component mount olduğunda kategoriler yüklenir
2. Kullanıcı kategori seçer
3. Seçilen kategoriye göre ürünler yüklenir
4. Ürünler tabloda gösterilir
5. Sayfalama ile ürünler bölünür

## 🚀 Gelecek Geliştirmeler

- [ ] Arama fonksiyonu
- [ ] Sıralama seçenekleri
- [ ] Toplu işlemler
- [ ] Filtreleme seçenekleri
- [ ] Export fonksiyonu

## 📝 Notlar

- Component Redux store'a bağımlıdır
- Material-UI icon'ları kullanır
- React Router ile navigasyon sağlar
- SCSS modüler yapıda organize edilmiştir
