# Siparisler Modülü

Bu modül, admin panelinde sipariş yönetimi için kullanılan component'leri ve hook'ları içerir.

## Klasör Yapısı

```
siparisler/
├── components/           # UI Component'leri
│   ├── OrderTable.jsx   # Sipariş tablosu
│   ├── Tabs.jsx         # Durum tabları
│   ├── OrderDetailModal.jsx # Sipariş detay modalı
│   ├── OrdersSkeleton.jsx   # Skeleton loading component'i
│   ├── OrdersSkeleton.scss  # Skeleton stilleri
│   └── index.js         # Component export'ları
├── hooks/               # Custom Hook'lar
│   ├── useOrders.js     # Ana sipariş state ve API logic'i
│   ├── useOrderStatus.js # Sipariş durumu çevirileri
│   ├── useTabLabels.js  # Tab etiketleri çevirileri
│   └── index.js         # Hook export'ları
├── Siparisler.jsx       # Ana component
├── Siparisler.scss      # Ana component stilleri
├── Tabs.scss           # Tab stilleri
└── README.md           # Bu dosya
```

## Kullanım

### Ana Component (Siparisler.jsx)

Ana component, tüm sipariş yönetimi işlevselliğini bir araya getirir:

```jsx
import Siparisler from "./Siparisler";

// Kullanım
<Siparisler />;
```

### Hook'lar

#### useOrders

Ana sipariş state yönetimi ve API çağrıları. Global loading slice'ını kullanır:

```jsx
import { useOrders } from "./hooks";

const {
  orders,
  selectedOrder,
  setSelectedOrder,
  tabs,
  selectedTab,
  setSelectedTab,
} = useOrders();
```

#### useOrderStatus

Sipariş durumu çevirileri:

```jsx
import { useOrderStatus } from "./hooks";

const { translateOrderStatus } = useOrderStatus();
// translateOrderStatus("PENDING") -> "İşleniyor"
```

#### useTabLabels

Tab etiketleri çevirileri:

```jsx
import { useTabLabels } from "./hooks";

const { getTabLabel } = useTabLabels();
// getTabLabel("PENDING") -> "İşlenenler"
```

### Component'ler

#### OrderTable

Sipariş listesini tablo formatında gösterir:

```jsx
import { OrderTable } from "./components";

<OrderTable orders={orders} onViewDetails={setSelectedOrder} />;
```

#### Tabs

Sipariş durumu filtreleme tabları:

```jsx
import { Tabs } from "./components";

<Tabs tabs={tabs} selectedTab={selectedTab} setSelectedTab={setSelectedTab} />;
```

#### OrderDetailModal

Sipariş detaylarını modal'da gösterir:

```jsx
import { OrderDetailModal } from "./components";

<OrderDetailModal
  order={selectedOrder}
  onClose={() => setSelectedOrder(null)}
/>;
```

#### OrdersSkeleton

Loading durumunda gösterilen skeleton component'i:

```jsx
import { OrdersSkeleton } from "./components";

<OrdersSkeleton />;
```

## Özellikler

- **Modüler Yapı**: Her component ve hook ayrı dosyalarda
- **Custom Hook'lar**: State yönetimi ve business logic ayrılmış
- **Global Loading**: Redux loading slice'ı kullanılıyor
- **Skeleton Loading**: Modern skeleton loading animasyonu
- **Çeviri Desteği**: Durum ve tab etiketleri Türkçe çevirileri
- **Responsive Tasarım**: Mobil uyumlu tablo ve modal
- **Error Handling**: Hata durumları için console log

## Loading Yönetimi

Bu modül global Redux loading slice'ını kullanır:

```jsx
// Loading başlatma
dispatch(setLoading({ isLoading: true, message: "Siparişler yükleniyor..." }));

// Loading bitirme
dispatch(clearLoading());
```

Loading durumunda `OrdersSkeleton` component'i gösterilir.

## Sipariş Durumları

- `PENDING` - İşleniyor
- `APPROVED` - Onaylandı
- `SHIPPED` - Kargoya Verildi
- `DELIVERED` - Teslim Edildi
- `CANCELLED` - İptal Edildi

## API Endpoint

Siparişler şu endpoint'ten çekilir:

```
POST /api/v1/order/filter?page=0&size=100
```

Request body:

```json
{
  "sortBy": "createdAt",
  "sortDirection": "asc",
  "paymentStatus": "PENDING"
}
```
