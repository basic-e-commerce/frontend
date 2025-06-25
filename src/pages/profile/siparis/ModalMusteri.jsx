const ModalMusteri = ({ handleCloseModal, selectedOrder }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="btn-close" onClick={handleCloseModal}>
          ×
        </button>

        {/* Bilgi Tablosu */}
        <table className="info-table">
          <tbody>
            <tr>
              <td>
                <strong>Sipariş Kodu:</strong>
              </td>
              <td>{selectedOrder.orderCode}</td>
            </tr>
            <tr>
              <td>
                <strong>Toplam:</strong>
              </td>
              <td>{selectedOrder.totalPrice}₺</td>
            </tr>
            <tr>
              <td>
                <strong>Adres:</strong>
              </td>
              <td>
                {selectedOrder.address.addressLine1},{" "}
                {selectedOrder.address.city}
              </td>
            </tr>
          </tbody>
        </table>

        {/* Ürün Tablosu */}
        <table className="product-table">
          <thead>
            <tr>
              <th>Görsel</th>
              <th>Ürün Adı</th>
              <th>Adet</th>
            </tr>
          </thead>
          <tbody>
            {selectedOrder.orderItemResponseDtos.map((item, index) => (
              <tr key={index}>
                <td>
                  <img src={item.coverImage} alt={item.productName} />
                </td>
                <td>{item.productName}</td>
                <td>{item.quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModalMusteri;
