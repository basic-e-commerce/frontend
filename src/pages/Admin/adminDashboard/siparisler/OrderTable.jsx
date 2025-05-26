const OrderTable = ({ orders, onViewDetails }) => {
  return (
    <table className="order-table">
      <thead>
        <tr>
          <th>Sipariş Kodu</th>
          <th>Ad Soyad</th>
          <th>Tutar</th>
          <th>Taksit</th>
          <th>Durum</th>
          <th>Aksiyon</th>
        </tr>
      </thead>
      <tbody>
        {orders.map((order) => (
          <tr key={order.id}>
            <td>{order.orderCode}</td>
            <td>
              {order.firstName} {order.lastName}
            </td>
            <td>{order.totalPrice} ₺</td>
            <td>{order.installment}</td>
            <td>{order.orderStatus}</td>
            <td>
              <button onClick={() => onViewDetails(order)}>
                Ayrıntı Görüntüle
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default OrderTable;
