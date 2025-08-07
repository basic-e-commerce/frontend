import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config/baseApi";
import "./SiparisAlindi.scss";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { clearCart } from "../../redux/slices/sepetCartSlice";

const SiparisRed = () => {
  const [searchParams] = useSearchParams();
  const orderCode = searchParams.get("orderCode");
  const [orderDetails, setOrderDetails] = useState(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchOrder = async () => {
      setLoading(true);

      try {
        const response = await axios.get(
          `${BASE_URL}/api/v1/order/by-order-code?orderCode=${orderCode}`
        );

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

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  if (loading) return <p style={{ marginTop: "140px" }}>Yükleniyor...</p>;

  return (
    <div className="success-payment">
      <div className="container">
        {orderDetails ? (
          <div className="success-payment-content">
            <div className="topGroup">
              <CloseIcon className="iconnnRed" />
              <h2>Siparişiniz Reddedildi</h2>
            </div>

            <div className="order-table">
              <div className="row">
                <span className="label">Sipariş Kodu:</span>
                <span className="value">{orderDetails?.orderCode}</span>
              </div>
              <div className="row">
                <span className="label">Toplam Tutar:</span>
                <span className="value">{orderDetails?.customerPrice} ₺</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="success-payment-content">
            <div className="topGroup">
              <CloseIcon className="iconnnRed" />
              <h2>Siparişiniz Bulunamadı</h2>
            </div>

            <div className="order-table">
              <div className="row">
                <span className="label">Sipariş Kodu:</span>
                <span className="value">Bulunamadı</span>
              </div>
              <div className="row">
                <span className="label">Toplam Tutar:</span>
                <span className="value">Bulunamadı</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SiparisRed;
