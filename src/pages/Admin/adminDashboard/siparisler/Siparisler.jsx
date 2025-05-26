import { useState, useEffect } from "react";
import OrderTable from "./OrderTable";
import OrderDetailModal from "./OrderDetailModal";
import "./Siparisler.scss";
import axios from "axios";
import { BASE_URL } from "../../../../config/baseApi";

const Siparisler = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchAdminOrder = async () => {
      try {
        const response = await axios.post(
          `${BASE_URL}/api/v1/order/filter?page=0&size=100`,
          {
            sortBy: "createdAt",
            sortDirection: "asc",
            paymentStatus: "APPROVED",
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAdminOrder();
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
