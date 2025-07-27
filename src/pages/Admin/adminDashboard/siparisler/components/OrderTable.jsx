import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

const OrderTable = ({ orders, onViewDetails, onViewCargo, selectedTab }) => {
  console.log(selectedTab);

  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th className="col-0">Sipaiş Kodu</th>
          <th className="col-0">Ad Soyad</th>
          <th className="col-0">Tutar</th>
          <th className="col-0">Taksit</th>
          <th className="col-2">Durum</th>
          <th className="col-0"></th>
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
              <td>
                {order?.orderStatusResponse?.orderPackages[0]?.cargoStatus ||
                  order?.orderStatusResponse?.status}
              </td>
              <td className="actions">
                <button onClick={() => onViewDetails(order)}>
                  <VisibilityIcon className="icon" />
                </button>

                {selectedTab === "APPROVED" ? (
                  <button onClick={() => onViewCargo(order)}>
                    <ShoppingBasketIcon className="icon" />
                  </button>
                ) : (
                  ""
                )}
              </td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="6">Sipariş bulunamadı.</td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default OrderTable;
