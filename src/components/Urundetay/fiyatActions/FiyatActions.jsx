import "./FiyatActions.scss";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/slices/sepetCartSlice";
import axios from "axios";
import api from "../../../api/api";

const FiyatActions = ({ id, fiyat, indirimliFiyat, birim }) => {
  const { isLogin } = useSelector((state) => state.authSlice);
  const [sayi, setSayi] = useState(1);
  const [showPopup, setShowPopup] = useState({
    visb: false,
    massage: "",
    status: "",
  });
  const dispatch = useDispatch();

  const azalt = () => {
    if (sayi > 1) {
      setSayi(sayi - 1);
    }
  };

  const arttir = () => {
    setSayi(sayi + 1);
  };

  const handleSepeteEkle = async () => {
    if (isLogin) {
      try {
        await api.put("http://localhost:8083/api/v1/card", {
          cardItems: [
            {
              productId: id,
              quantity: sayi,
            },
          ],
        });

        setShowPopup({
          visb: true,
          massage: "Sepete Eklendi",
          status: "success",
        });

        setTimeout(() => {
          setShowPopup({ visb: false, massage: "", status: "" });
        }, 2000);
        setSayi(1);
      } catch (error) {
        setShowPopup({
          visb: true,
          massage: "İşlem Başarısız",
          status: "fail",
        });
        setTimeout(() => {
          setShowPopup({ visb: false, massage: "", status: "" });
        }, 2000);
        console.log(error);
      }
    } else {
      dispatch(
        addToCart({
          id,
          quantity: sayi,
        })
      );

      setShowPopup({
        visb: true,
        massage: "Sepete Eklendi !",
        status: "success",
      });
      setSayi(1);

      setTimeout(() => {
        setShowPopup({ visb: false, massage: "", status: "" });
      }, 2000);
    }
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

      {showPopup.visb && (
        <div
          style={
            showPopup.status === "success"
              ? { backgroundColor: "#4caf50" }
              : { backgroundColor: "darkred" }
          }
          className="popupSepetEkleme"
        >
          <p>{showPopup.massage}</p>
        </div>
      )}
    </div>
  );
};

export default FiyatActions;
