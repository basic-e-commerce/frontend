import { Link } from "react-router-dom";
import "./TeamListCard.scss";
import AddIcon from "@mui/icons-material/Add";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import { useState } from "react";

function TeamlisCard({ proje }) {
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
    <li className="glide__slide">
      <div className="card">
        <Link to={`/urunler/${proje.id}`} className="img">
          <img src={proje.coverImage} alt="" />
        </Link>

        <div className="cardSection">
          <div className="CardTop">
            <Link to={`/urunler/${proje.id}`}>
              <h4 className="title">{proje.title}</h4>
            </Link>

            <p className="price">
              <span className="eskiFiyat">{proje.eskiFiyat}</span>
              <span className="yeniFiyat">{proje.yeniFiyat}</span>
              <span className="">/ Adet</span>
            </p>
          </div>
          <div className="CardBottom">
            <div className="sayac">
              <HorizontalRuleIcon
                className="icon"
                onClick={() => {
                  azalt();
                }}
              />
              <span className="sayi">{sayi}</span>
              <AddIcon
                className="icon"
                onClick={() => {
                  arttir();
                }}
              />
            </div>
            <button className="btn-card">Ekle</button>
          </div>
        </div>
      </div>
    </li>
  );
}

export default TeamlisCard;
