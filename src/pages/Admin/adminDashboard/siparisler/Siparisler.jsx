import { useState, useEffect } from "react";
import OrderTable from "./OrderTable";
import OrderDetailModal from "./OrderDetailModal";
import "./Siparisler.scss";

const Siparisler = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    fetch("{{domain}}/order/filter?page=0&size=10", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        sortBy: "createdAt",
        sortDirection: "asc",
        paymentStatus: "APPROVED",
      }),
    })
      .then((res) => res.json())
      .then((data) => setOrders(data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <div className="orders-page">
      <h1>Siparişler</h1>
      <OrderTable orders={orders} onViewDetails={setSelectedOrder} />
      {selectedOrder && (
        <OrderDetailModal
          order={selectedOrder}
          onClose={() => setSelectedOrder(null)}
        />
      )}
    </div>
  );
};

export default Siparisler;
