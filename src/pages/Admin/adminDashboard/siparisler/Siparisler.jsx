import { useState, useEffect } from "react";
import OrderTable from "./OrderTable";
import OrderDetailModal from "./OrderDetailModal";
import "./Siparisler.scss";
import axios from "axios";
import { BASE_URL } from "../../../../config/baseApi";
import Tabs from "./Tabs";
import { useDispatch } from "react-redux";

const Siparisler = () => {
  const [isLoading, setIsloading] = useState(false);
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const dispatch = useDispatch();
  const [IsSubmit, setIsSubmit] = useState(false);

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
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAdminOrder();
  }, []);

  // useEffect(() => {
  //   const fetchOrders = async () => {
  //     setIsloading(true);
  //     try {
  //       const response = await api.post(
  //         `${BASE_URL}/api/v1/customer-package/register-list`,
  //         {
  //           status: selectedTab,
  //           sortBy: "createAt",
  //           sortDirection: "DESC",
  //         }
  //       );
  //       setOrders(response.data);
  //     } catch (error) {
  //       dispatch(
  //         showAlertWithTimeoutKullanici({
  //           message: error.response.message,
  //           status: "error",
  //         })
  //       );
  //     } finally {
  //       setIsloading(false);
  //     }
  //   };

  //   fetchOrders();
  // }, [selectedTab, IsSubmit]);

  const tabs = ["PENDING", "APPROVED", "REJECTED", "FINISHED", ""];
  const [selectedTab, setSelectedTab] = useState("PENDING");

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
