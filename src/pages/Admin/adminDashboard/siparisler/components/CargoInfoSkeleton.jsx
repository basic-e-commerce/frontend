import "./CargoInfoSkeleton.scss";

const CargoInfoSkeleton = () => {
  return (
    <div className="cargo-info-skeleton">
      {[...Array(3)].map((_, i) => (
        <div className="skeleton-item" key={i}>
          <div className="skeleton-label skeleton-animate" />
          <div className="skeleton-input skeleton-animate" />
        </div>
      ))}
    </div>
  );
};

export default CargoInfoSkeleton;
