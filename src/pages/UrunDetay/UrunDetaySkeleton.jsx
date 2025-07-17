import "./UrunDetaySkeleton.scss";

const UrunDetaySkeleton = () => {
  return (
    <div className=" container skeleton">
      {/* Ürün görseli ve fiyat detayı skeleton */}
      <div className="gallery-price-detail-skeleton">
        <div className="image-skeleton shimmer" />
        <div className="info-skeleton">
          <div className="title-skeleton shimmer" />
          <div className="price-skeleton shimmer" />
          <div className="button-skeleton shimmer" />
        </div>
      </div>

      <div className="container">
        <div className="projectDetay">
          <div className="heading-skeleton shimmer" />
          <div className="desc-skeleton">
            <div className="line shimmer" />
            <div className="line shimmer" />
            <div className="line short shimmer" />
          </div>
        </div>
      </div>

      <div className="digerUrunler">
        <div className="container">
          <div className="baslik-skeleton">
            <div className="title shimmer" />
            <div className="desc shimmer" />
          </div>
          <div className="slider-skeleton">
            {[...Array(4)].map((_, i) => (
              <div className="slider-card-skeleton shimmer" key={i} />
            ))}
          </div>
        </div>
      </div>

      <div className="sik-sorulan-skeleton">
        <div className="heading shimmer" />
        <div className="faq-list">
          {[...Array(3)].map((_, i) => (
            <div className="faq-item shimmer" key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default UrunDetaySkeleton;
