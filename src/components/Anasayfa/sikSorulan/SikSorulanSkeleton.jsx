import "./SikSorulan.scss";

const SikSorulanSkeleton = () => (
  <div className="container">
    <div className="sikcaSorulan">
      <div
        style={{
          width: 180,
          height: 28,
          background: "#ccc",
          borderRadius: 8,
          marginBottom: 24,
        }}
      />
      <div className="acardions">
        {[1, 2, 3].map((_, i) => (
          <div key={i} className="acardion" style={{ marginBottom: 8 }}>
            <div className="acardionSummary" style={{ background: "#f3f3f3" }}>
              <div
                style={{
                  width: "80%",
                  height: 18,
                  background: "#ddd",
                  borderRadius: 6,
                }}
              />
              <div
                style={{
                  width: 24,
                  height: 18,
                  background: "#eee",
                  borderRadius: 6,
                }}
              />
            </div>
            <div className="acardionDetails">
              <div
                style={{
                  width: "100%",
                  height: 32,
                  background: "#f0f0f0",
                  borderRadius: 6,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  </div>
);

export default SikSorulanSkeleton;
