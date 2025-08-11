import "./SearchCard.scss";
import { Link } from "react-router-dom";

const SearchCard = ({ product, setIsSearchOpen, setSearchTerm }) => {
  return (
    <Link
      to={`/urunler/${product.linkName}`}
      onClick={() => {
        setIsSearchOpen(false);
        setSearchTerm("");
      }}
      className="searchCard"
    >
      <div className="sliderImg">
        <img src={product?.coverImage?.url} alt="img" />
      </div>

      <div className="cardSection">
        <div className="CardTop">
          <h4 className="title">{product?.name}</h4>
          <p className="desc">{product?.shortDescription}</p>
        </div>
      </div>
    </Link>
  );
};

export default SearchCard;
