import { useSelector } from "react-redux";
import { useOrders } from "./hooks";
import {
  OrderTable,
  Tabs,
  OrderDetailModal,
  OrdersSkeleton,
} from "./components";
import "./Siparisler.scss";

const Siparisler = () => {
  const { isLoading } = useSelector((state) => state.loading);
  const {
    orders,
    selectedOrder,
    setSelectedOrder,
    tabs,
    selectedTab,
    setSelectedTab,
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
        <OrderTable orders={orders} onViewDetails={setSelectedOrder} />
        {selectedOrder && (
          <OrderDetailModal
            order={selectedOrder}
            onClose={() => setSelectedOrder(null)}
          />
        )}
      </div>
    </div>
  );
};

export default Siparisler;
