import "./OrdersSkeleton.scss";

const OrdersSkeleton = () => {
  return (
    <div className="orders-skeleton">
      <div className="skeleton-container">
        {/* Tab skeleton */}
        <div className="tabs-skeleton">
          {[1, 2, 3, 4, 5].map((index) => (
            <div key={index} className="skeleton-tab pulse"></div>
          ))}
        </div>

        {/* Tablo skeleton */}
        <div className="table-skeleton">
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
            {[1, 2, 3, 4, 5, 6, 7, 8].map((index) => (
              <div key={index} className="table-row-skeleton">
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
                  <div className="skeleton-text pulse"></div>
                </div>
                <div className="skeleton-cell pulse">
                  <div className="skeleton-button pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrdersSkeleton;
