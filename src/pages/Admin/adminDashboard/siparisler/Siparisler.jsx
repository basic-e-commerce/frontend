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
import OrderDetailModalIade from "./components/OrderDetailModalIade";
import CancelOnayPopUp from "./components/CancelOnayPopUp";
import IadeOdemeOnayPopUp from "./components/IadeOdemeOnayPopUp";
import OrderDetailModalManualCargo from "./components/OrderDetailModalManualCargo";

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
    selectedIade,
    setSelectedIade,
    setSelectedTab,
    setIsSubmit,
    selectedCancel,
    setselectedCancel,
    selectedOdeme,
    setSelectedOdeme,
    selectedManualCargo,
    setSelectedManualCargo,
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
          selectedTab={selectedTab}
          onViewCargo={setSelectedOrderByCargo}
          onViewDetails={setSelectedOrder}
          onViewIade={setSelectedIade}
          onViewCancel={setselectedCancel}
          onViewOdeme={setSelectedOdeme}
          onViewManualCargo={setSelectedManualCargo}
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

        {selectedIade && (
          <OrderDetailModalIade
            setIsSubmit={setIsSubmit}
            order={selectedIade}
            onClose={() => setSelectedIade(null)}
          />
        )}

        {selectedCancel && (
          <CancelOnayPopUp
            order={selectedCancel}
            onClose={() => setselectedCancel(null)}
            setIsSubmit={setIsSubmit}
          />
        )}

        {selectedOdeme && (
          <IadeOdemeOnayPopUp
            order={selectedOdeme}
            onClose={() => setSelectedOdeme(null)}
            setIsSubmit={setIsSubmit}
          />
        )}

        {selectedManualCargo && (
          <OrderDetailModalManualCargo
            order={selectedManualCargo}
            onClose={() => setSelectedManualCargo(null)}
            setIsSubmit={setIsSubmit}
          />
        )}
      </div>
    </div>
  );
};

export default Siparisler;
