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

  return (
    <div className="siparis-musteri-container">
      <div className="siparis-musteri-header">
        <h3>Sipariş Bilgileriniz</h3>
      </div>

      <hr className="siparis-musteri-divider" />

      <div className="siparis-musteri-content">
        <table className="siparis-musteri-table">
          <thead className="siparis-musteri-table-header">
            <tr className="siparis-musteri-table-row">
              <th className="siparis-musteri-table-cell siparis-musteri-col-order-code">
                Sipariş Kodu
              </th>
              <th className="siparis-musteri-table-cell siparis-musteri-col-price">
                Tutar
              </th>
              <th className="siparis-musteri-table-cell siparis-musteri-col-status">
                Durum
              </th>
              <th className="siparis-musteri-table-cell siparis-musteri-col-date">
                Tarih
              </th>
              <th className="siparis-musteri-table-cell siparis-musteri-col-actions"></th>
            </tr>
          </thead>
          <tbody className="siparis-musteri-table-body">
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order.id} className="siparis-musteri-table-row">
                  <td className="siparis-musteri-table-cell">
                    {order.orderCode}
                  </td>
                  <td className="siparis-musteri-table-cell">
                    {order.totalPrice}₺
                  </td>
                  <td className="siparis-musteri-table-cell">
                    {order?.orderStatusResponse?.refundOrderPackages[0]
                      ?.cargoStatus ||
                      order?.orderStatusResponse?.orderPackages[0]
                        ?.cargoStatus ||
                      order?.orderStatusResponse?.status}
                  </td>
                  <td className="siparis-musteri-table-cell">
                    {order?.createdAt?.split("T")?.[0]}
                  </td>
                  <td className="siparis-musteri-table-cell">
                    <button
                      className="siparis-musteri-detail-btn"
                      onClick={() => handleDetailClick(order)}
                    >
                      Detay
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="siparis-musteri-table-row">
                <td colSpan="5" className="siparis-musteri-no-orders">
                  Sipariş bulunamadı.
                </td>
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
