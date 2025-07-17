import "./Urunler.scss";
import PropTypes from "prop-types";

const SkeletonBox = ({ style = {}, className = "" }) => (
  <div
    className={`skeleton-box${className ? ` ${className}` : ""}`}
    style={style}
  />
);

SkeletonBox.propTypes = {
  style: PropTypes.object,
  className: PropTypes.string,
};

const UrunlerSkeleton = () => {
  return (
    <div className="projeler">
      {/* CategoryName Skeleton */}
      <div
        className="categoryName"
        style={{ position: "relative", height: 250, marginBottom: 32 }}
      >
        <SkeletonBox
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            top: 0,
            left: 0,
          }}
        />
        <div
          className="container"
          style={{ position: "relative", zIndex: 2, height: "100%" }}
        >
          <div
            className="bannerText"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              height: "100%",
            }}
          >
            <SkeletonBox style={{ width: 220, height: 36, borderRadius: 8 }} />
          </div>
        </div>
        <div
          className="background"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "#000",
            opacity: 0.2,
          }}
        />
      </div>

      <div className="container">
        <div className="contentProjeler">
          {/* Sidebar Skeleton */}
          <aside className="sidebar">
            <div className="categories">
              <div className="title">
                <SkeletonBox
                  style={{
                    width: 120,
                    height: 24,
                    borderRadius: 6,
                    marginBottom: 8,
                  }}
                />
                <SkeletonBox
                  style={{ width: "100%", height: 2, borderRadius: 1 }}
                />
              </div>
              <div className="listCategories">
                <ul style={{ margin: 0, padding: 0 }}>
                  {[...Array(7)].map((_, i) => (
                    <li key={i} style={{ marginBottom: 8 }}>
                      <SkeletonBox
                        style={{ width: "90%", height: 20, borderRadius: 5 }}
                      />
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </aside>

          {/* Main Content Skeleton */}
          <div className="contentProjelerRight">
            {/* List Skeleton */}
            <div className="projeList">
              <div className="title">
                <div className="titleContent">
                  <SkeletonBox
                    style={{ width: 120, height: 24, borderRadius: 6 }}
                  />
                </div>
                <SkeletonBox
                  style={{
                    width: "100%",
                    height: 2,
                    borderRadius: 1,
                    margin: "8px 0",
                  }}
                />
              </div>
              <div
                className="list"
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: "3rem 3rem",
                }}
              >
                {[...Array(9)].map((_, i) => (
                  <SkeletonBox
                    key={i}
                    style={{ width: "100%", height: 180, borderRadius: 12 }}
                  />
                ))}
              </div>
            </div>
            {/* Pagination Skeleton */}
            <div
              className="paginate"
              style={{
                display: "flex",
                justifyContent: "center",
                marginTop: 32,
              }}
            >
              {[...Array(5)].map((_, i) => (
                <SkeletonBox
                  key={i}
                  style={{
                    width: 35,
                    height: 35,
                    borderRadius: "50%",
                    margin: "0 8px",
                  }}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Skeleton CSS */}
      <style>{`
        .skeleton-box {
          background: linear-gradient(90deg, #ececec 25%, #f5f5f5 37%, #ececec 63%);
          background-size: 400% 100%;
          animation: skeleton-loading 1.4s ease infinite;
        }
        @keyframes skeleton-loading {
          0% { background-position: 100% 50%; }
          100% { background-position: 0 50%; }
        }
      `}</style>
    </div>
  );
};

export default UrunlerSkeleton;
