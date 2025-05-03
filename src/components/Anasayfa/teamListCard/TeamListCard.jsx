import { Link } from "react-router-dom";
import "./TeamListCard.scss";
import AddIcon from "@mui/icons-material/Add";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { useState } from "react";

function TeamlisCard({ product }) {
  const [sayi, setSayi] = useState(1);
  const azalt = () => {
    if (sayi > 1) {
      setSayi(sayi - 1);
    }
  };

  const arttir = () => {
    setSayi(sayi + 1);
  };

  return (
    <>
      {product && (
        <li className="glide__slide">
          <div className="card">
            <Link to={`/urunler/${product.productLinkName}`} className="img">
              <img src={product.coverImage.url} alt={product.productName} />
            </Link>

            <div className="cardSection">
              <div className="CardTop">
                <Link to={`/urunler/${product.id}`}>
                  <h4 className="title">{product.productName}</h4>
                </Link>

                <p className="price">
                  <span className="eskiFiyat">
                    {product.salePrice?.toFixed(2)} TL
                  </span>
                  <span className="yeniFiyat">
                    {product.comparePrice?.toFixed(2)} TL
                  </span>
                  <span className="">/ adet</span>
                </p>
              </div>
              <div className="CardBottom">
                <div className="sayac">
                  <HorizontalRuleIcon className="icon" onClick={azalt} />
                  <span className="sayi">{sayi}</span>
                  <AddIcon className="icon" onClick={arttir} />
                </div>
                <button className="btn-card">Ekle</button>
              </div>
            </div>
          </div>
        </li>
      )}
    </>
  );
}

export default TeamlisCard;
