import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./SiparisAlindi.scss";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const EpostaOnaylandi = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(4);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/");
    }, 4000);

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
            <CheckCircleOutlineIcon className="iconnn" />
            <h2>E-postanız Onaylandı</h2>
          </div>

          <p className="thanks-text">Teşekkür ederiz!</p>
          <span style={{ fontSize: "0.8rem", textAlign: "center" }}>
            {countdown} saniye sonra ana sayfaya yönlendirileceksiniz.
          </span>
        </div>
      </div>
    </div>
  );
};

export default EpostaOnaylandi;
