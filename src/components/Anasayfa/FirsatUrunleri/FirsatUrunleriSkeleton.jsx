import "./FirsatUrunleri.scss";

const FirsatUrunleriSkeleton = () => (
  <div className="firsatUrunleri">
    <div className="container">
      <div className="firsatContent">
        <div
          style={{
            width: 180,
            height: 28,
            background: "#ccc",
            borderRadius: 8,
            marginBottom: 16,
          }}
        />
        <ul className="ul">
          {[1, 2, 3, 4].map((_, i) => (
            <li key={i} style={{ listStyle: "none" }}>
              <div
                style={{
                  width: "100%",
                  height: 220,
                  background: "#e0e0e0",
                  borderRadius: 12,
                  marginBottom: 8,
                }}
              />
              <div
                style={{
                  width: "60%",
                  height: 18,
                  background: "#ccc",
                  borderRadius: 6,
                  margin: "0 auto",
                }}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

export default FirsatUrunleriSkeleton;
