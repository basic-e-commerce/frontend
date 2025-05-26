const OrderDetailModal = ({ order, onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
        <h2>Sipariş Detayı</h2>
        <p>
          <strong>Sipariş Kodu:</strong> {order.orderCode}
        </p>
        <p>
          <strong>Ad Soyad:</strong> {order.firstName} {order.lastName}
        </p>
        <p>
          <strong>Telefon:</strong> {order.address.phoneNo}
        </p>
        <p>
          <strong>Adres:</strong> {order.address.addressLine1},{" "}
          {order.address.city}
        </p>
        <h3>Ürünler:</h3>
        <ul>
          {order.orderItemResponseDtos.map((item, index) => (
            <li key={index}>
              <img src={item.coverImage} alt={item.productName} />
              {item.productName} - {item.quantity} adet
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default OrderDetailModal;
