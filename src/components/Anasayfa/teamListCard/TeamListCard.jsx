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
        <div className="img">
          <img src={proje.coverImage} alt="" />
        </div>

        <div className="cardSection">
          <div className="CardTop">
            <h4 className="title">{proje.title} / Adet</h4>
            <p className="price">
              <span className="eskiFiyat">{proje.eskiFiyat}</span> /{" "}
              <span className="yeniFiyat">{proje.yeniFiyat}</span>
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
            <Link to={`/projeler/${proje.id}`} className="btn-card">
              Ekle
            </Link>
          </div>
        </div>
      </div>
    </li>
  );
}

export default TeamlisCard;
