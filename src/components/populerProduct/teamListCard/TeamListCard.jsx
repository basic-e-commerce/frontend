import { Link } from "react-router-dom";
import "./TeamListCard.scss";

function TeamlisCard({ product }) {
  return (
    <li className="glide__slide">
      <Link to={`projeler/${product.id}`} className="card">
        <div className="sliderImg">
          <img src={product.coverImage?.url || ""} alt="" />
        </div>

        <div className="cardSection">
          <div className="CardTop">
            <h4 className="title">{product.name}</h4>
            <p className="desc">{product.shortDescription}</p>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default TeamlisCard;
