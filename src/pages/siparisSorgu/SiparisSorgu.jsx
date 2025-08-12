import { useState } from "react";
import { BASE_URL } from "../../config/baseApi";
import "./SiparisSorgu.scss";
import { useDispatch, useSelector } from "react-redux";
import { showAlertWithTimeoutKullanici } from "../../redux/slices/alertKullaniciSlice";
import { clearLoading, setLoading } from "../../redux/slices/loadingSlice";
import axios from "axios";
import ModalMusteri from "./ModalMusteri";

const SiparisSorgu = () => {
  const [email, setEmail] = useState("");
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loading);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!email.trim()) {
      dispatch(
        showAlertWithTimeoutKullanici({
          message: "Lütfen e-posta adresinizi giriniz.",
          status: "error",
        })
      );
      return;
    }

    dispatch(
      setLoading({
        isLoading: true,
        message: "Siparişler aranıyor...",
      })
    );

    try {
      const ordersResponse = await axios.get(
        `${BASE_URL}/api/v1/order/username?username=${email}`
      );
      dispatch(
        showAlertWithTimeoutKullanici({
          message: "Siparişler getirildi",
          status: "success",
        })
      );
      setOrders(ordersResponse.data);
    } catch (error) {
      dispatch(
        showAlertWithTimeoutKullanici({
          message: error.response?.data?.message || "Bilinmeyen hata oluştu",
          status: "error",
        })
      );
    } finally {
      dispatch(clearLoading());
    }
  };

  const handleOrderDetail = (order) => {
    setSelectedOrder(order);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };

  return (
    <div className="siparis-sorgu">
      <div className="siparis-sorgu__container container">
        <h1 className="siparis-sorgu__title">Sipariş Sorgula</h1>
        <p className="siparis-sorgu__description">
          E-posta adresinizi girerek siparişlerinizi görüntüleyebilirsiniz.
        </p>

        {/* E-posta Giriş Formu */}
        <form onSubmit={handleSearch} className="siparis-sorgu__form">
          <div className="form-group">
            <label htmlFor="email" className="form-group__label">
              E-posta Adresi
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="ornek@email.com"
              className="form-group__input"
              required
            />
          </div>
          <div className="form-actions">
            <button
              type="submit"
              className="btn btn--primary"
              disabled={isLoading}
            >
              {isLoading ? "Aranıyor..." : "Siparişleri Ara"}
            </button>
          </div>
        </form>

        {/* Siparişler Tablosu */}
        {orders.length > 0 && (
          <div className="siparis-musteri-container">
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
                  {orders.map((order) => (
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
                          onClick={() => handleOrderDetail(order)}
                        >
                          Detay
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Sipariş Detay Modalı */}
      {selectedOrder && showModal && (
        <ModalMusteri
          handleCloseModal={handleCloseModal}
          selectedOrder={selectedOrder}
        />
      )}
    </div>
  );
};

export default SiparisSorgu;
