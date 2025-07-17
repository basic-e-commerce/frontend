import "./BestTeam.scss";

const BestTeamSkeleton = () => (
  <div className="bestTeam">
    <div className="container">
      <div className="content">
        <div className="left">
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
              width: 80,
              height: 16,
              background: "#ddd",
              borderRadius: 6,
            }}
          />
        </div>
        <div className="TeamlistCards">
          <div style={{ display: "flex", gap: 16 }}>
            {[1, 2, 3].map((_, i) => (
              <div
                key={i}
                style={{
                  width: 180,
                  height: 220,
                  background: "#e0e0e0",
                  borderRadius: 12,
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default BestTeamSkeleton;
