import "./ProductSkeleton.scss";

const ProductSkeleton = () => {
  return (
    <div className="product-skeleton">
      <div className="skeleton-container">
        {/* Sol taraf - Kapak resmi skeleton */}
        <div className="left-skeleton">
          <div className="cover-image-skeleton">
            <div className="skeleton-image pulse"></div>
          </div>
        </div>

        {/* Sağ taraf - Form alanları skeleton */}
        <div className="right-skeleton">
          {/* Ürün resimleri skeleton */}
          <div className="product-images-skeleton">
            <div className="skeleton-title pulse"></div>
            <div className="images-grid">
              {[1, 2, 3, 4].map((index) => (
                <div key={index} className="skeleton-image-item pulse"></div>
              ))}
            </div>
          </div>

          {/* Form alanları skeleton */}
          <div className="form-fields-skeleton">
            {/* Kategori seçici skeleton */}
            <div className="skeleton-field">
              <div className="skeleton-label pulse"></div>
              <div className="skeleton-input pulse"></div>
            </div>

            {/* Ürün adı skeleton */}
            <div className="skeleton-field">
              <div className="skeleton-label pulse"></div>
              <div className="skeleton-input pulse"></div>
            </div>

            {/* Kısa açıklama skeleton */}
            <div className="skeleton-field">
              <div className="skeleton-label pulse"></div>
              <div className="skeleton-textarea pulse"></div>
            </div>

            {/* Ürün açıklaması skeleton */}
            <div className="skeleton-field">
              <div className="skeleton-label pulse"></div>
              <div className="skeleton-textarea pulse"></div>
            </div>

            {/* Fiyat alanları skeleton */}
            <div className="price-fields">
              <div className="skeleton-field">
                <div className="skeleton-label pulse"></div>
                <div className="skeleton-input pulse"></div>
              </div>
              <div className="skeleton-field">
                <div className="skeleton-label pulse"></div>
                <div className="skeleton-input pulse"></div>
              </div>
            </div>

            {/* Stok alanları skeleton */}
            <div className="stock-fields">
              <div className="skeleton-field">
                <div className="skeleton-label pulse"></div>
                <div className="skeleton-input pulse"></div>
              </div>
              <div className="skeleton-field">
                <div className="skeleton-label pulse"></div>
                <div className="skeleton-input pulse"></div>
              </div>
            </div>

            {/* Diğer alanlar skeleton */}
            <div className="skeleton-field">
              <div className="skeleton-label pulse"></div>
              <div className="skeleton-input pulse"></div>
            </div>

            <div className="skeleton-field">
              <div className="skeleton-label pulse"></div>
              <div className="skeleton-input pulse"></div>
            </div>

            {/* Checkbox alanları skeleton */}
            <div className="checkbox-fields">
              <div className="skeleton-checkbox">
                <div className="skeleton-checkbox-input pulse"></div>
                <div className="skeleton-checkbox-label pulse"></div>
              </div>
              <div className="skeleton-checkbox">
                <div className="skeleton-checkbox-input pulse"></div>
                <div className="skeleton-checkbox-label pulse"></div>
              </div>
            </div>

            {/* Submit butonu skeleton */}
            <div className="skeleton-button pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductSkeleton;
