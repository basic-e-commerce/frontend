import "./UrunDetaySkeleton.scss";

const UrunDetaySkeleton = () => {
  return (
    <div className="urun-detay-skeleton-wrapper container">
      {/* Ürün görseli ve fiyat detayı skeleton */}
      <div className="urun-detay-skeleton-gallery-price">
        <div className="urun-detay-skeleton-image" />
        <div className="urun-detay-skeleton-info">
          <div className="urun-detay-skeleton-title" />
          <div className="urun-detay-skeleton-price" />
          <div className="urun-detay-skeleton-button" />
        </div>
      </div>

      <div className="urun-detay-skeleton-container">
        <div className="urun-detay-skeleton-project-detail">
          <div className="urun-detay-skeleton-heading" />
          <div className="urun-detay-skeleton-description">
            <div className="urun-detay-skeleton-line" />
            <div className="urun-detay-skeleton-line" />
            <div className="urun-detay-skeleton-line urun-detay-skeleton-line-short" />
          </div>
        </div>
      </div>

      <div className="urun-detay-skeleton-other-products">
        <div className="urun-detay-skeleton-container">
          <div className="urun-detay-skeleton-baslik">
            <div className="urun-detay-skeleton-baslik-title" />
            <div className="urun-detay-skeleton-baslik-desc" />
          </div>
          <div className="urun-detay-skeleton-slider">
            {[...Array(4)].map((_, i) => (
              <div className="urun-detay-skeleton-slider-card" key={i} />
            ))}
          </div>
        </div>
      </div>

      <div className="urun-detay-skeleton-faq">
        <div className="urun-detay-skeleton-faq-heading" />
        <div className="urun-detay-skeleton-faq-list">
          {[...Array(3)].map((_, i) => (
            <div className="urun-detay-skeleton-faq-item" key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UrunDetaySkeleton;
