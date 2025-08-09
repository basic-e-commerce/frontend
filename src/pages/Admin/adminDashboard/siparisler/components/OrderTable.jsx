import VisibilityIcon from "@mui/icons-material/Visibility";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import DoNotDisturbOnIcon from "@mui/icons-material/DoNotDisturbOn";
import ClearIcon from "@mui/icons-material/Clear";
import CurrencyLiraIcon from "@mui/icons-material/CurrencyLira";
import BackHandIcon from "@mui/icons-material/BackHand";

const OrderTable = ({
  orders,
  onViewDetails,
  onViewCargo,
  onViewIade,
  selectedTab,
  onViewCancel,
  onViewOdeme,
}) => {
  return (
    <table className="custom-table">
      <thead>
        <tr>
          <th className="col-0">Sipaiş Kodu</th>
          <th className="col-0">Ad Soyad</th>
          <th className="col-0">Tutar</th>
          <th className="col-0">Taksit</th>
          <th className="col-2">Durum</th>
          <th className="col-1"></th>
        </tr>
      </thead>
      <tbody>
        {orders?.length > 0 ? (
          orders?.map((order) => (
            <tr key={order.id}>
              <td>{order.orderCode}</td>
              <td>
                {order.firstName} {order.lastName}
              </td>
              <td>{order.totalPrice} ₺</td>
              <td>{order.installment}</td>
              <td>
                {order?.orderStatusResponse?.refundOrderPackages[0]
                  ?.cargoStatus ||
                  order?.orderStatusResponse?.orderPackages[0]?.cargoStatus ||
                  order?.orderStatusResponse?.status}
              </td>
              <td className="actions">
                <button onClick={() => onViewDetails(order)}>
                  <VisibilityIcon className="icon" />
                </button>

                {selectedTab === "APPROVED" ? (
                  <button onClick={() => onViewCargo(order)}>
                    <BackHandIcon className="icon" />
                  </button>
                ) : (
                  ""
                )}

                {selectedTab === "APPROVED" ? (
                  <button onClick={() => onViewCargo(order)}>
                    <ShoppingBasketIcon className="icon" />
                  </button>
                ) : (
                  ""
                )}

                {selectedTab === "APPROVED" ||
                selectedTab === "PRE_TRANSIT" ||
                selectedTab === "TRANSIT" ? (
                  <button onClick={() => onViewCancel(order)}>
                    <ClearIcon className="icon" />
                  </button>
                ) : (
                  ""
                )}

                {selectedTab === "DELIVERED" ? (
                  <button onClick={() => onViewIade(order)}>
                    <DoNotDisturbOnIcon className="icon" />
                  </button>
                ) : (
                  ""
                )}

                {selectedTab === "RETURNED" || selectedTab === "CANCEL" ? (
                  <button onClick={() => onViewOdeme(order)}>
                    <CurrencyLiraIcon className="icon" />
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
