import VisibilityIcon from "@mui/icons-material/Visibility";
import { useOrderStatus } from "../hooks";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";

const OrderTable = ({ orders, onViewDetails, onViewCargo }) => {
  const { translateOrderStatus } = useOrderStatus();

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
              <td>{translateOrderStatus(order.orderStatus)}</td>
              <td className="actions">
                <button onClick={() => onViewDetails(order)}>
                  <VisibilityIcon className="icon" />
                </button>
                <button onClick={() => onViewCargo(order)}>
                  <ShoppingBasketIcon className="icon" />
                </button>
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
