import "./Slider.scss";

const SliderSkeleton = () => (
  <div className="glide">
    <div className="glide__track">
      <ul className="glide__slides">
        <li className="glide__slide">
          <div
            style={{
              width: "100%",
              height: "calc(100vh - 140px)",
              background: "#e0e0e0",
              position: "relative",
            }}
          />
          <div className="container">
            <div className="bannerText">
              <div className="title">
                <div
                  style={{
                    width: 200,
                    height: 40,
                    background: "#ccc",
                    borderRadius: 8,
                    marginBottom: 16,
                  }}
                />
              </div>
              <div className="button">
                <div
                  style={{
                    width: 120,
                    height: 32,
                    background: "#ddd",
                    borderRadius: 10,
                  }}
                />
              </div>
            </div>
          </div>
          <div className="background" />
        </li>
      </ul>
    </div>
  </div>
);

export default SliderSkeleton;
