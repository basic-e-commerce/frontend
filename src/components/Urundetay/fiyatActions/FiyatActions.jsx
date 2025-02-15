import "./FiyatActions.scss";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../../redux/slices/sepetCartSlice";

const FiyatActions = ({ id, fiyat, indirimliFiyat, birim }) => {
  const [sayi, setSayi] = useState(1);
  const dispatch = useDispatch();

  const azalt = () => {
    if (sayi > 1) {
      setSayi(sayi - 1);
    }
  };

  const arttir = () => {
    setSayi(sayi + 1);
  };

  const handleSepeteEkle = () => {
    dispatch(
      addToCart({
        id,
        quantity: sayi,
      })
    );
  };

  return (
    <div className="fiyatAction">
      <div className="price">
        <span className="fiyat">{fiyat} TL</span>
        <span className="indirimliFiyat">{indirimliFiyat} TL</span>
      </div>

      <div className="buttons">
        <div className="sayac">
          <HorizontalRuleIcon
            className="icon"
            onClick={() => {
              azalt();
            }}
          />
          <span style={{ fontWeight: "bold" }} className="sayi">
            {sayi}
          </span>
          <span className="birim">{birim}</span>
          <AddIcon
            className="icon"
            onClick={() => {
              arttir();
            }}
          />
        </div>
        <div className="sepeteEkle">
          <button onClick={handleSepeteEkle} className="btnSepet">
            Sepete Ekle
          </button>
        </div>
        <div className="favButton">
          <button>
            <FavoriteBorderIcon className="icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default FiyatActions;
