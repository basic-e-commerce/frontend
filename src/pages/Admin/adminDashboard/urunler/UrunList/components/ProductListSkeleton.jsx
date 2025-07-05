import "./ProductListSkeleton.scss";

const ProductListSkeleton = () => {
  return (
    <div className="product-list-skeleton">
      <div className="skeleton-container">
        {/* Kategori seçici skeleton */}
        <div className="category-selector-skeleton">
          <div className="skeleton-title pulse"></div>
          <div className="skeleton-select pulse"></div>
        </div>

        {/* Ürün tablosu skeleton */}
        <div className="product-table-skeleton">
          {/* Tablo başlığı skeleton */}
          <div className="table-header-skeleton">
            <div className="header-row">
              <div className="skeleton-header-cell pulse"></div>
              <div className="skeleton-header-cell pulse"></div>
              <div className="skeleton-header-cell pulse"></div>
              <div className="skeleton-header-cell pulse"></div>
              <div className="skeleton-header-cell pulse"></div>
              <div className="skeleton-header-cell pulse"></div>
            </div>
          </div>

          {/* Tablo satırları skeleton */}
          <div className="table-body-skeleton">
            {[1, 2, 3, 4, 5].map((index) => (
              <div key={index} className="table-row-skeleton">
                <div className="skeleton-cell pulse">
                  <div className="skeleton-image pulse"></div>
                </div>
                <div className="skeleton-cell pulse">
                  <div className="skeleton-text pulse"></div>
                </div>
                <div className="skeleton-cell pulse">
                  <div className="skeleton-text pulse"></div>
                </div>
                <div className="skeleton-cell pulse">
                  <div className="skeleton-text pulse"></div>
                </div>
                <div className="skeleton-cell pulse">
                  <div className="skeleton-text pulse"></div>
                </div>
                <div className="skeleton-cell pulse">
                  <div className="skeleton-actions">
                    <div className="skeleton-button pulse"></div>
                    <div className="skeleton-button pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination skeleton */}
        <div className="pagination-skeleton">
          <div className="skeleton-pagination">
            <div className="skeleton-page pulse"></div>
            <div className="skeleton-page pulse"></div>
            <div className="skeleton-page pulse"></div>
            <div className="skeleton-page pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductListSkeleton;
