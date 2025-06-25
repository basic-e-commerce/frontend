const OrderTable = ({ orders, onViewDetails }) => {
  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th className="col-2">Sipaiş Kodu</th>
          <th className="col-1">Ad Soyad</th>
          <th className="col-1">Tutar</th>
          <th className="col-1">Taksit</th>
          <th className="col-1">Durum</th>
          <th className="col-1"></th>
        </tr>
      </thead>
      <tbody>
        {orders?.length > 0 ? (
          orders?.map((order) => (
            <tr key={order.id}>
              <td>{order.orderCode}</td>
              <td>
                {" "}
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
          ))
        ) : (
          <tr>
            <td colSpan="5">Sipariş bulunamadı.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default OrderTable;
