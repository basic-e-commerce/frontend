import { useEffect, useState } from "react";
import "./MrGlide.scss";
import Glide from "@glidejs/glide";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import { productDetailCoverChange } from "../../../redux/slices/productSlice";
import { useDispatch } from "react-redux";

const MrGlide = ({ images }) => {
  const dispatch = useDispatch();
  const [activeIndex, setActiveIndex] = useState(0);

  const handleImageClick = (image, index) => {
    setActiveIndex(index);
    dispatch(productDetailCoverChange(image.filename));
  };

  useEffect(() => {
    new Glide(".glideResim", {
      type: "slider",
      startAt: 0,
      perView: 4,
      breakpoints: {
        1024: {
          perView: 3,
        },
        768: { perView: 1 },
      },
    }).mount();
  }, []);

  return (
    <div className="glideResim">
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
          {images.map((image, index) => (
            <li
              key={index}
              className={`glide__slide ${
                index === activeIndex ? "active" : ""
              }`}
              onClick={() => handleImageClick(image, index)}
              style={{
                cursor: "pointer",
                border:
                  window.innerWidth < "768px" && index === activeIndex
                    ? "2px solid black"
                    : "none",
              }}
            >
              <img src={image.filename} alt={`slide-${index}`} />
            </li>
          ))}
        </ul>
      </div>

      <div className="glide__arrows" data-glide-el="controls">
        <button
          style={{
            border: "none",
            fontSize: "10px",
            backgroundColor: "none",
            top: "45%",
            borderRadius: "30%",
            height: "70px",
            color: "black",
            boxShadow: "none",
            textShadow: "none",
            left: "-50px",
          }}
          className="glide__arrow glide__arrow--left"
          data-glide-dir="<"
        >
          <ChevronLeftIcon
            sx={{
              fontSize: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </button>
        <button
          style={{
            border: "none",
            fontSize: "10px",
            backgroundColor: "none",
            borderRadius: "30%",
            top: "45%",
            height: "70px",
            color: "black",
            right: "-50px",
            boxShadow: "none",
            textShadow: "none",
          }}
          className="glide__arrow glide__arrow--right"
          data-glide-dir=">"
        >
          <ChevronRightIcon
            sx={{
              fontSize: "50px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          />
        </button>
      </div>

      <div className="glide__bullets" data-glide-el="controls[nav]">
        {images.map((item, index) => (
          <button
            key={`urunImgs${index}`}
            className="glide__bullet"
            data-glide-dir={`=${index}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default MrGlide;
