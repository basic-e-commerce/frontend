import { useEffect } from "react";
import "./ProjelerGlide.scss";
import Glide from "@glidejs/glide";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import TeamlisCard from "../../Anasayfa/teamListCard/TeamListCard";
import ListCard from "../../urunler/listCard/ListCard";

const ProjelerGlide = ({ products, perView }) => {
  useEffect(() => {
    if (products.length > 0) {
      const glideDiger = new Glide(".glideDiger", {
        type: "carousel",
        gap: 20,
        perView: perView,
        breakpoints: {
          1024: {
            perView: 3,
          },

          768: {
            perView: 2,
          },
        },
      });

      glideDiger.mount();
    }
  }, [products]);

  return (
    <div className="glideDiger">
      <div className="glide__track" data-glide-el="track">
        <ul className="glide__slides">
          {products?.map((product, index) => (
            <ListCard key={index} product={product} />
          ))}
        </ul>
      </div>

      <div className="glide__arrows" data-glide-el="controls">
        <button
          style={{ right: "-60px" }}
          className="glide__arrow glide__arrow--right"
          data-glide-dir=">"
        >
          <ChevronRightIcon className="icon" />
        </button>
      </div>

      <div className="glide__bullets" data-glide-el="controls[nav]">
        {products?.map((item, index) => (
          <button
            key={`digerUrunler${index}`}
            className="glide__bullet"
            data-glide-dir={`=${index}`}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default ProjelerGlide;
