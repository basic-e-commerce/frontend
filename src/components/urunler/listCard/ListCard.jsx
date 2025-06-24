import { Link } from "react-router-dom";
import "./ListCard.scss";

const ListCard = ({ product }) => {
  return (
    <Link to={`/urunler/${product.linkName}`} className="projeCard">
      <div className="img">
        <img src={product?.coverImage?.url} alt="" />
      </div>
      <div className="detayCard">
        <div className="desc">
          <div className="titleCard">
            <h4>{product.name}</h4>
          </div>

          <div className="text">
            <p>{product.shortDescription}</p>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ListCard;
