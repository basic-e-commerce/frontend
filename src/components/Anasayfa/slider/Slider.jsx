import Glide from "@glidejs/glide";
import { useEffect } from "react";
import "./Slider.scss";

const Slider = () => {
  useEffect(() => {
    const glide = new Glide(".glide", {
      type: "carousel",
      startAt: 0,
      perView: 1,
      focusAt: "center",
      // autoplay: 4000,
    });

    glide.mount();
  }, []);

  return (
    <div className="glide">
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
          <li className="glide__slide">
            <img
              src={"/images/pexels-abhishek-mahajan-2249012-3928854.jpg"}
              alt="Slide 1"
            />
            <div className="container">
              <div className="bannerText">
                <div className="title">
                  <h1>Peynir Harmanı</h1>
                </div>
                <div className="button">
                  <button>Satın Al</button>
                </div>
              </div>
            </div>
            <div className="background"></div>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Slider;
