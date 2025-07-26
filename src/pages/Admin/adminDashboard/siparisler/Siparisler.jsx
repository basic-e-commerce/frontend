import { useSelector } from "react-redux";
import { useOrders } from "./hooks";
import {
  OrderTable,
  Tabs,
  OrderDetailModal,
  OrdersSkeleton,
} from "./components";
import "./Siparisler.scss";
import OrderDetailModalCargo from "./components/OrderDetailModalCargo";

const Siparisler = () => {
  const { isLoading } = useSelector((state) => state.loading);
  const {
    orders,
    selectedOrder,
    tabs,
    selectedTab,
    setSelectedOrder,
    selectedOrderByCargo,
    setSelectedOrderByCargo,
    setSelectedTab,
    setIsSubmit,
  } = useOrders();

  if (isLoading) {
    return <OrdersSkeleton />;
  }

  return (
    <div className="orders-page">
      <div className="">
        <Tabs
          tabs={tabs}
          selectedTab={selectedTab}
          setSelectedTab={setSelectedTab}
        />
        <OrderTable
          orders={orders}
          onViewCargo={setSelectedOrderByCargo}
          onViewDetails={setSelectedOrder}
        />
        {selectedOrder && (
          <OrderDetailModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        )}

        {selectedOrderByCargo && (
          <OrderDetailModalCargo
            setIsSubmit={setIsSubmit}
            order={selectedOrderByCargo}
            onClose={() => setSelectedOrderByCargo(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Siparisler;
