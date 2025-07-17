import "./FiyatActions.scss";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/slices/sepetCartSlice";
import api from "../../../api/api";
import { BASE_URL } from "../../../config/baseApi";
import { showAlertWithTimeoutKullanici } from "../../../redux/slices/alertKullaniciSlice";
import { clearLoading, setLoading } from "../../../redux/slices/loadingSlice";

const FiyatActions = ({ id, fiyat, indirimliFiyat, birim, quantity }) => {
  const { isLogin, isAuthChecked } = useSelector((state) => state.authSlice);
  const [sayi, setSayi] = useState(1);

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loading);

  const azalt = () => {
    if (sayi > 1) {
      setSayi(sayi - 1);
    }
  };

  const arttir = () => {
    if (sayi < quantity) {
      setSayi(sayi + 1);
    }
  };

  const handleSepeteEkle = async () => {
    if (!isAuthChecked || isLoading) return;
    dispatch(setLoading({ isLoading: true, message: "Ürün ekleniyor..." }));

    try {
      if (isLogin) {
        await api.put(`${BASE_URL}/api/v1/card`, {
          cardItems: [{ productId: id, quantity: sayi }],
        });
      } else {
        dispatch(addToCart({ productId: id, quantity: sayi }));
      }
      setTimeout(() => {
        dispatch(
          showAlertWithTimeoutKullanici({
            message: "Sepete Eklendi",
            status: "success",
          })
        );
      }, 400);
      setSayi(1);
    } catch (error) {
      setTimeout(() => {
        dispatch(
          showAlertWithTimeoutKullanici({
            message: error.response.data,
            status: "error",
          })
        );
      }, 400);
    } finally {
      setTimeout(() => {
        dispatch(clearLoading());
      }, 400);
    }
  };

  const yuzdeIndirim = Math.round(((fiyat - indirimliFiyat) / fiyat) * 100);

  return (
    <div className="fiyatAction">
      <div className="price">
        <span className="fiyat">{fiyat} TL</span>
        <span className="indirimliFiyat">{indirimliFiyat} TL</span>
        <span className="etiket">%{yuzdeIndirim} indirim</span>
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
          <button
            onClick={handleSepeteEkle}
            className={`btnSepet ${isLoading ? "disabledButton" : ""}`}
            disabled={isLoading}
          >
            {isLoading ? "Ekleniyor" : "Sepete Ekle"}
          </button>
        </div>

        {/*<div className="favButton">
          <button>
            <FavoriteBorderIcon className="icon" />
          </button>
        </div>*/}
      </div>
    </div>
  );
};

export default FiyatActions;
