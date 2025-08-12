import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SiparisAlindi.scss";

import CloseIcon from "@mui/icons-material/Close";

const EpostaRed = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 5000);

    const countdownTimer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(countdownTimer);
          return 1;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      clearTimeout(timer);
      clearInterval(countdownTimer);
    };
  }, [navigate]);

  return (
    <div className="success-payment">
      <div className="container">
        <div className="success-payment-content">
          <div className="topGroup">
            <CloseIcon className="iconnnRed" />
            <h2>E-postanız onaylanamadı</h2>
          </div>

          <p className="thanks-text-red">İletişime Geçin Lütfen!</p>
          <span style={{ fontSize: "0.8rem", textAlign: "center" }}>
            {countdown} saniye sonra ana sayfaya yönlendirileceksiniz.
          </span>
        </div>
      </div>
    </div>
  );
};

export default EpostaRed;
