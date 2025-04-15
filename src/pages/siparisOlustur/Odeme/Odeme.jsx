import "./Odeme.scss";
import Paper from "@mui/material/Paper";

import { useEffect, useState } from "react";
import SiparisOzeti from "../../../components/siparisOzeti/SiparisOzeti";
import { useDispatch, useSelector } from "react-redux";
import { fetchCartItems } from "../../../redux/slices/sepetCartSlice";

const Odeme = () => {
  const dispatch = useDispatch();
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [installment, setInstallment] = useState("1");

  const { status, baslangıcState, cartTotal } = useSelector(
    (state) => state.sepet
  );

  useEffect(() => {
    dispatch(fetchCartItems(baslangıcState));
  }, [baslangıcState, dispatch]);

  return (
    <div className="siparisOdemeSection">
      <Paper
        sx={{ boxShadow: 4, padding: "3.5rem 3rem", borderRadius: 1 }}
        className="formOdeme"
      >
        <div className="payment-form">
          <div className="cardOdeme card-animation">
            <div className="card-content">
              <h2 className="title">Ödeme Bilgileri</h2>
              <input
                type="text"
                placeholder="Kart Numarası"
                maxLength={16}
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
              <div className="input-group">
                <input
                  type="text"
                  placeholder="MM/YY"
                  maxLength={5}
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="CVV"
                  maxLength={3}
                  value={cvv}
                  onChange={(e) => setCvv(e.target.value)}
                />
              </div>
              <select
                value={installment}
                onChange={(e) => setInstallment(e.target.value)}
              >
                <option value="1">Tek Çekim</option>
                <option value="3">3 Taksit</option>
                <option value="6">6 Taksit</option>
                <option value="9">9 Taksit</option>
              </select>

              <div className="infoKomisyon">
                <img src="/images/odeme/cards.png" alt="" />
              </div>
            </div>
          </div>
        </div>
      </Paper>

      <SiparisOzeti cartTotal={cartTotal} />
    </div>
  );
};

export default Odeme;
