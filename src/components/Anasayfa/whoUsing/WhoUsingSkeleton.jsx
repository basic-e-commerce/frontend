import "./WhoUsing.scss";

const WhoUsingSkeleton = () => (
  <div className="whoUsing">
    <div className="container">
      <div className="content">
        <div className="acardion-template">
          <div style={{ display: "flex", gap: 16, height: 250 }}>
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                style={{
                  width: "30%",
                  height: "100%",
                  background: "#e0e0e0",
                  borderRadius: 30,
                }}
              />
            ))}
          </div>
        </div>
        <div className="left">
          <div
            style={{
              width: 160,
              height: 24,
              background: "#ccc",
              borderRadius: 8,
              marginBottom: 12,
            }}
          />
          <div
            style={{
              width: 120,
              height: 16,
              background: "#ddd",
              borderRadius: 8,
              marginBottom: 16,
            }}
          />
          <div
            style={{
              width: "100%",
              height: 48,
              background: "#eee",
              borderRadius: 8,
            }}
          />
        </div>
      </div>
    </div>
  </div>
);

export default WhoUsingSkeleton;
