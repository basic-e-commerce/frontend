import { useState, useEffect } from "react";
import OrderTable from "./OrderTable";
import OrderDetailModal from "./OrderDetailModal";
import "./Siparisler.scss";
import axios from "axios";
import { BASE_URL } from "../../../../config/baseApi";
import Tabs from "./Tabs";
import { useDispatch } from "react-redux";
import api from "../../../../api/api";
import Loading from "../../../../components/Loading/Loading";

const Siparisler = () => {
  const [isLoading, setIsloading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const dispatch = useDispatch();
  const [IsSubmit, setIsSubmit] = useState(false);

  const tabs = ["PENDING", "APPROVED", "SHIPPED", "DELIVERED", "CANCELLED"];
  const [selectedTab, setSelectedTab] = useState("PENDING");

  useEffect(() => {
    const fetchAdminOrder = async () => {
      setIsloading(true);
      try {
        const response = await axios.post(
          `${BASE_URL}/api/v1/order/filter?page=0&size=100`,
          {
            sortBy: "createdAt",
            sortDirection: "asc",
            paymentStatus: selectedTab,
          }
        );
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      } finally {
        setIsloading(false);
      }
    };

    fetchAdminOrder();
  }, [selectedTab, IsSubmit]);

  if (isLoading) {
    return <Loading />;
  }

  console.log(selectedOrder);

  return (
    <div className="orders-page">
      <div className="container">
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
