import "./SiparisMusteri.scss";
import { useEffect, useState } from "react";
import { BASE_URL } from "../../../config/baseApi";
import api from "../../../api/api";
import ModalMusteri from "./ModalMusteri";

const SiparisMusteri = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchBilgiler = async () => {
      try {
        const response = await api.get(`${BASE_URL}/api/v1/order/user`);
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

  const translateOrderStatus = (status) => {
    switch (status) {
      case "PENDING":
        return "İşleniyor";
      case "APPROVED":
        return "Onaylandı";
      case "SHIPPED":
        return "Kargoya Verildi";
      case "DELIVERED":
        return "Teslim Edildi";
      case "CANCELLED":
        return "İptal Edildi";
      default:
        return "Bilinmiyor";
    }
  };

  return (
    <div className="siparisBilgileri">
      <div className="title">
        <h3>Sipariş Bilgileriniz</h3>
      </div>

      <hr />

      <div className="order-page">
        <table className="custom-table">
          <thead>
            <tr>
              <th className="col-2">Sipariş Kodu</th>
              <th className="col-1">Tutar</th>
              <th className="col-1">Durum</th>
              <th className="col-1"></th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id}>
                  <td>{order.orderCode}</td>
                  <td>{order.totalPrice}₺</td>
                  <td>{translateOrderStatus(order.orderStatus)}</td>
                  <td>
                    <button
                      className="btn-detail"
                      onClick={() => handleDetailClick(order)}
                    >
                      Ayrıntılar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4">Sipariş bulunamadı.</td>
              </tr>
            )}
          </tbody>
        </table>

        {showModal && selectedOrder && (
          <ModalMusteri
            handleCloseModal={handleCloseModal}
            selectedOrder={selectedOrder}
          />
        )}
      </div>
    </div>
  );
};

export default SiparisMusteri;
