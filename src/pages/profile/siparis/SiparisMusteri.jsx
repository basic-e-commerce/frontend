import "./SiparisMusteri.scss";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../config/baseApi";
import api from "../../../api/api";
import axios from "axios";

const SiparisMusteri = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchBilgiler = async () => {
      try {
        const response = await axios.get(`${BASE_URL}/api/v1/order/user`);
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchBilgiler();
  }, []);

  const handleDetailClick = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  return (
    <div className="siparisBilgileri">
      <div className="title">
        <h3>Sipariş Bilgileriniz</h3>
      </div>

      <hr />

      <div className="order-page">
        <table className="order-table">
          <thead>
            <tr>
              <th>Sipariş Kodu</th>
              <th>Toplam Fiyat</th>
              <th>Durum</th>
              <th>Detay</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.orderCode}</td>
                <td>{order.totalPrice}₺</td>
                <td>{order.orderStatus}</td>
                <td>
                  <button
                    className="btn-detail"
                    onClick={() => handleDetailClick(order)}
                  >
                    Detay
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {showModal && selectedOrder && (
          <div className="modal-overlay">
            <div className="modal-content">
              <h3>Sipariş Detayları</h3>
              <p>
                <strong>Sipariş Kodu:</strong> {selectedOrder.orderCode}
              </p>
              <p>
                <strong>Toplam:</strong> {selectedOrder.totalPrice}₺
              </p>
              <p>
                <strong>Adres:</strong> {selectedOrder.address.addressLine1},{" "}
                {selectedOrder.address.city}
              </p>

              <div className="product-list">
                {selectedOrder.orderItemResponseDtos.map((item, index) => (
                  <div key={index} className="product-item">
                    <img src={item.coverImage} alt={item.productName} />
                    <span>
                      {item.productName} (x{item.quantity})
                    </span>
                  </div>
                ))}
              </div>

              <button className="btn-close" onClick={handleCloseModal}>
                Kapat
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SiparisMusteri;
