import "./DashboardSkeleton.scss";

const DashboardSkeleton = () => {
  return (
    <div className="dashboard-skeleton">
      <div className="container">
        <div className="dashboard-content">
          {/* Tarih seçici skeleton */}
          <div className="date-picker-skeleton">
            <div className="skeleton-date-input pulse"></div>
            <div className="skeleton-date-separator pulse"></div>
            <div className="skeleton-date-input pulse"></div>
          </div>

          {/* Info kartları skeleton */}
          <div className="info-cards-skeleton">
            {[1, 2, 3, 4].map((index) => (
              <div key={index} className="info-card-skeleton">
                <div className="skeleton-icon pulse"></div>
                <div className="skeleton-content">
                  <div className="skeleton-value pulse"></div>
                  <div className="skeleton-tag pulse"></div>
                </div>
              </div>
            ))}
          </div>

          {/* Özet kart skeleton */}
          <div className="summary-card-skeleton">
            <div className="skeleton-title pulse"></div>
            <div className="skeleton-chart pulse"></div>
          </div>

          {/* İki sütunlu kartlar skeleton */}
          <div className="two-column-skeleton">
            <div className="column-skeleton">
              <div className="skeleton-title pulse"></div>
              <div className="skeleton-list">
                {[1, 2, 3, 4, 5].map((index) => (
                  <div key={index} className="skeleton-list-item pulse"></div>
                ))}
              </div>
            </div>
            <div className="column-skeleton">
              <div className="skeleton-title pulse"></div>
              <div className="skeleton-list">
                {[1, 2, 3, 4, 5].map((index) => (
                  <div key={index} className="skeleton-list-item pulse"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Ziyaretçi grafiği skeleton */}
          <div className="visitor-chart-skeleton">
            <div className="skeleton-title pulse"></div>
            <div className="skeleton-chart-large pulse"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardSkeleton;
