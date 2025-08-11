import { useEffect, useState } from "react";
import api from "../../../../api/api";
import { BASE_URL } from "../../../../config/baseApi";
import "./User.scss";
import ModalMusteri from "./ModalMusteri";

const User = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [loadingOrders, setLoadingOrders] = useState(false);
  console.log(orders);

  useEffect(() => {
    const fetchUsers = async () => {
      const response = await api.post(`${BASE_URL}/api/v1/customer/list`, {
        sortBy: "createdAt",
        sortDirection: "desc",
        isEnable: true,
        startDate: "2024-01-01T00:00:00Z",
        endDate: "2039-08-31T23:59:59Z",
      });
      setUsers(response.data);
      setFilteredUsers(response.data);
    };
    fetchUsers();
  }, []);

  // Arama fonksiyonu
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredUsers(users);
    } else {
      const filtered = users.filter((user) =>
        `${user.firstName} ${user.lastName} ${user.username} ${user.phoneNumber}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
      setFilteredUsers(filtered);
    }
  }, [searchTerm, users]);

  const handleUserSelect = (user) => {
    setSelectedUser(user);
    fetchUserOrders(user.id);
  };

  const fetchUserOrders = async (userId) => {
    setLoadingOrders(true);
    try {
      const response = await api.get(
        `${BASE_URL}/api/v1/order/user-order?userId=${userId}`
      );
      setOrders(response.data);
    } catch (error) {
      console.error("Siparişler getirilemedi:", error);
      setOrders([]);
    } finally {
      setLoadingOrders(false);
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

  const handleCloseUser = () => {
    setSelectedUser(null);
    setOrders([]);
    setSelectedOrder(null);
  };

  return (
    <div className="user-management">
      {/* Kullanıcı Profil Bölümü */}
      <div className="user-profile-section">
        <div className="profile-card">
          <div className="profile-avatar">
            <div className="profile-avatar__placeholder">
              {selectedUser ? (
                <span>
                  {selectedUser.firstName?.charAt(0)}
                  {selectedUser.lastName?.charAt(0)}
                </span>
              ) : (
                <span>?</span>
              )}
            </div>
          </div>
          <div className="profile-info">
            <h3 className="profile-info__name">
              {selectedUser
                ? `${selectedUser.firstName} ${selectedUser.lastName}`
                : "Kullanıcı Seçilmedi"}
            </h3>
            <p className="profile-info__username">
              {selectedUser ? `@${selectedUser.username}` : "Kullanıcı adı"}
            </p>
            <p className="profile-info__date">
              {selectedUser
                ? `Kayıt: ${selectedUser.createAt?.split("T")?.[0]}`
                : "Kayıt tarihi"}
            </p>
          </div>
          {selectedUser && (
            <div className="profile-actions">
              <button
                className="profile-actions__close-btn"
                onClick={handleCloseUser}
                title="Kullanıcıyı Kapat"
              >
                ×
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Siparişler Tablosu - Sadece kullanıcı seçildiğinde göster */}
      {selectedUser && (
        <div className="orders-section">
          <h3 className="orders-section__title">
            {selectedUser.firstName} {selectedUser.lastName} - Siparişleri
          </h3>
          {loadingOrders ? (
            <div className="orders-section__loading">
              Siparişler yükleniyor...
            </div>
          ) : (
            <div className="orders-section__table">
              <table className="custom-table">
                <thead className="custom-table__header">
                  <tr>
                    <th className="custom-table__header-cell">Sipariş Kodu</th>
                    <th className="custom-table__header-cell">Tutar</th>
                    <th className="custom-table__header-cell">Durum</th>
                    <th className="custom-table__header-cell">Tarih</th>
                    <th className="custom-table__header-cell">İşlem</th>
                  </tr>
                </thead>
                <tbody>
                  {orders?.length > 0 ? (
                    orders?.map((order) => (
                      <tr key={order.id} className="custom-table__row">
                        <td className="custom-table__body-cell">
                          {order?.orderCode}
                        </td>
                        <td className="custom-table__body-cell">
                          {order?.totalPrice}₺
                        </td>
                        <td className="custom-table__body-cell">
                          {order?.orderStatusResponse?.refundOrderPackages[0]
                            ?.cargoStatus ||
                            order?.orderStatusResponse?.orderPackages[0]
                              ?.cargoStatus ||
                            order?.orderStatusResponse?.status}
                        </td>
                        <td className="custom-table__body-cell">
                          {order?.createdAt?.split("T")?.[0]}
                        </td>
                        <td className="custom-table__body-cell">
                          <button
                            className="btn-detail"
                            onClick={() => handleOrderDetail(order)}
                          >
                            Detay
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td className="custom-table__body-cell" colSpan="5">
                        Bu kullanıcının siparişi bulunamadı.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

      {/* Arama Alanı */}
      <div className="search-section">
        <div className="search-section__container">
          <input
            type="text"
            placeholder="Kullanıcı ara..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-section__input"
          />
        </div>
      </div>

      <div className="user-table-section">
        <table className="custom-table">
          <thead className="custom-table__header">
            <tr>
              <th className="custom-table__header-cell">Ad Soyad</th>
              <th className="custom-table__header-cell">Telefon</th>
              <th className="custom-table__header-cell">Kullanıcı Adı</th>
              <th className="custom-table__header-cell">Kayıt Tarihi</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers?.length > 0 ? (
              filteredUsers?.map((user) => (
                <tr
                  key={user.id}
                  className={`custom-table__row ${
                    selectedUser?.id === user.id
                      ? "custom-table__row--selected"
                      : ""
                  }`}
                  onClick={() => handleUserSelect(user)}
                >
                  <td className="custom-table__body-cell">
                    {user?.firstName} {user.lastName}
                  </td>
                  <td className="custom-table__body-cell">
                    {user?.phoneNumber}
                  </td>
                  <td className="custom-table__body-cell">{user?.username}</td>
                  <td className="custom-table__body-cell">
                    {user?.createAt?.split("T")?.[0]}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="custom-table__body-cell" colSpan="5">
                  {searchTerm
                    ? "Arama kriterlerine uygun kullanıcı bulunamadı."
                    : "Kullanıcı bulunamadı."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {selectedOrder && showModal && (
        <ModalMusteri
          handleCloseModal={handleCloseModal}
          selectedOrder={selectedOrder}
        />
      )}
    </div>
  );
};

export default User;
