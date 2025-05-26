import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../config/baseApi";
import "./SiparisAlindi.scss";

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
    <div className="container">
      <div className="success-payment-container">
        <h1>🎉 Siparişiniz Onaylandı!</h1>
        <p>Sipariş Kodu: {orderDetails.orderCode}</p>
        <h2>Ürünler:</h2>
        <ul>
          {orderDetails.orderItemResponseDtos?.map((item) => (
            <li key={item.id}>
              {item.productName} - {item.quantity} adet
            </li>
          ))}
        </ul>
        <p>Toplam Tutar: {orderDetails.totalPrice}₺</p>
        <p>Teşekkür ederiz!</p>
      </div>
    </div>
  );
};

export default SiparisAlindi;
