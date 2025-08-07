import { Link } from "react-router-dom";
import "./TeamListCard.scss";

function TeamlisCard({ product }) {
  return (
    <div className="glide__slide">
      <Link to={`/urunler/${product.linkName}`} className="card">
        <div className="sliderImg">
          <img src={product.coverImage?.url || ""} alt="" />
        </div>

        <div className="cardSection">
          <div className="CardTop">
            <h4 className="title">{product.name}</h4>
            <p className="desc">{product.shortDescription}</p>
          </div>

          <div className="cardRight">
            <span className="salePrice">{product.salePrice}₺</span>
            <span className="comparePrice">{product.comparePrice}₺</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

export default TeamlisCard;
