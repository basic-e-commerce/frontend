import "./FullImg.scss";

const FullImgSkeleton = () => (
  <div className="fullImg" style={{ background: "darkgray" }}>
    <div className="container">
      <div className="fullImgContent">
        <div
          style={{
            width: 220,
            height: 32,
            background: "#ccc",
            borderRadius: 8,
            marginBottom: 16,
          }}
        />
        <div
          style={{
            width: 120,
            height: 32,
            background: "#ddd",
            borderRadius: 8,
          }}
        />
      </div>
    </div>
  </div>
);

export default FullImgSkeleton;
