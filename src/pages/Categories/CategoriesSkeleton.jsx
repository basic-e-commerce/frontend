import "./Categories.scss";

const CategoriesSkeleton = () => {
  return (
    <div className="categoriesPage">
      <div className="container">
        <div
          style={{
            width: 220,
            height: 32,
            background: "#ccc",
            borderRadius: 8,
            margin: "0 auto 16px auto",
          }}
        />
        <div className="categoryCardsContent">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((_, i) => (
            <div
              key={i}
              style={{
                width: "100%",
                aspectRatio: "5/4",
                borderRadius: 20,
                background: "#e0e0e0",
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  zIndex: 10,
                  color: "#fff",
                  width: "60%",
                  height: 24,
                  background: "#ccc",
                  borderRadius: 6,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  background: "rgba(0,0,0,0.15)",
                  borderRadius: 20,
                }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoriesSkeleton;
