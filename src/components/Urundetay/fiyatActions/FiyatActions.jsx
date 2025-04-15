import "./FiyatActions.scss";
import HorizontalRuleIcon from "@mui/icons-material/HorizontalRule";
import AddIcon from "@mui/icons-material/Add";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../redux/slices/sepetCartSlice";
import axios from "axios";
import { Co2Sharp } from "@mui/icons-material";

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
        const response = await axios.post("url", { id: id, quantity: sayi });

        if (response.status === 200) {
          setShowPopup({
            visb: true,
            massage: "Sepete Eklendi",
            status: "success",
          });
          setSayi(1);
        }
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
          className="popup"
        >
          <p>{showPopup.massage}</p>
        </div>
      )}
    </div>
  );
};

export default FiyatActions;
