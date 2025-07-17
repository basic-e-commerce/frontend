import "./DoubleProduct.scss";

const DoubleProductSkeleton = () => (
  <div className="container">
    <div className="product-cards">
      {[1, 2].map((_, i) => (
        <div
          key={i}
          style={{
            background: "#f0f0f0",
            borderRadius: 10,
            padding: 20,
            display: "flex",
            alignItems: "center",
            width: "48%",
            marginBottom: 16,
          }}
        >
          <div
            style={{
              width: 200,
              height: 150,
              background: "#e0e0e0",
              borderRadius: 10,
              marginRight: 32,
            }}
          />
          <div>
            <div
              style={{
                width: 120,
                height: 24,
                background: "#ccc",
                borderRadius: 6,
                marginBottom: 12,
              }}
            />
            <div
              style={{
                width: 180,
                height: 16,
                background: "#ddd",
                borderRadius: 6,
                marginBottom: 16,
              }}
            />
            <div
              style={{
                width: 100,
                height: 32,
                background: "#bbb",
                borderRadius: 20,
              }}
            />
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default DoubleProductSkeleton;
