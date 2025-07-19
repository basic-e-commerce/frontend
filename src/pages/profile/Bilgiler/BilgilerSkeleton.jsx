import "./BilgilerSkeleton.scss";

const BilgilerSkeleton = () => {
  return (
    <div className="kullaniciBilgileri skeletonnn">
      <div className="kullaniciInput">
        <div className="title">
          <div className="skeleton-title" />
        </div>
        <hr />
        <form className="bars">
          <label>
            <div className="skeleton-label" />
            <div className="skeleton-input" />
          </label>
          <label>
            <div className="skeleton-label" />
            <div className="skeleton-input" />
          </label>
          <label>
            <div className="skeleton-label" />
            <div className="skeleton-input" />
          </label>
          <label>
            <div className="skeleton-label" />
            <div className="skeleton-input" />
          </label>
          <div className="button">
            <div className="skeleton-button" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default BilgilerSkeleton;
