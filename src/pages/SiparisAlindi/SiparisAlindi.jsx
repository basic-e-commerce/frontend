import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config/baseApi";
import "./SiparisAlindi.scss";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

const SiparisAlindi = () => {
  const [searchParams] = useSearchParams();
  const orderCode = searchParams.get("orderCode");
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/order/by-order-code?orderCode=${orderCode}`
        );
        console.log("Gelen veri:", response.data);
        setOrderDetails(response.data);
      } catch (error) {
        console.error("Sipariş detayı alınamadı:", error);
      } finally {
        setLoading(false);
      }
    };

    if (orderCode) {
      fetchOrder();
    }
  }, [orderCode]);

  if (loading) return <p>Yükleniyor...</p>;
  if (!orderDetails) return <p>Sipariş bulunamadı.</p>;

  return (
    <div className="success-payment">
      <div className="container">
        <div className="success-payment-content">
          <div className="topGroup">
            <CheckCircleOutlineIcon className="iconnn" />
            <h2>Siparişiniz Onaylandı</h2>
          </div>

          <div className="order-table">
            <div className="row">
              <span className="label">Sipariş Kodu:</span>
              <span className="value">{orderDetails.orderCode}</span>
            </div>
            <div className="row">
              <span className="label">Toplam Tutar:</span>
              <span className="value">{orderDetails.totalPrice} ₺</span>
            </div>
          </div>

          <p className="thanks-text">Teşekkür ederiz!</p>
        </div>
      </div>
    </div>
  );
};

export default SiparisAlindi;
