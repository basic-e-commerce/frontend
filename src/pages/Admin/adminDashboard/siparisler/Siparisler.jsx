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

  // useEffect(() => {
  //   const fetchAdminOrder = async () => {
  //     try {
  //       const response = await axios.post(
  //         `${BASE_URL}/api/v1/order/filter?page=0&size=100`,
  //         {
  //           sortBy: "createdAt",
  //           sortDirection: "asc",
  //           paymentStatus: "APPROVED",
  //         }
  //       );
  //       setOrders(response.data);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetchAdminOrder();
  // }, []);

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
  const dummyOrders = [
    {
      id: "1",
      orderCode: "ORD123456",
      firstName: "Ahmet",
      lastName: "Yılmaz",
      totalPrice: 750,
      installment: 3,
      orderStatus: "Hazırlanıyor",
      address: {
        phoneNo: "05551234567",
        addressLine1: "Atatürk Caddesi No:5",
        city: "İstanbul",
      },
      orderItemResponseDtos: [
        {
          productName: "Kahverengi Koltuk",
          quantity: 1,
          coverImage: "https://via.placeholder.com/100",
        },
        {
          productName: "Ahşap Sehpa",
          quantity: 2,
          coverImage: "https://via.placeholder.com/100",
        },
      ],
    },
    {
      id: "2",
      orderCode: "ORD987654",
      firstName: "Elif",
      lastName: "Demir",
      totalPrice: 430,
      installment: 1,
      orderStatus: "Teslim Edildi",
      address: {
        phoneNo: "05337654321",
        addressLine1: "Cumhuriyet Mah. Gül Sok. No:12",
        city: "Ankara",
      },
      orderItemResponseDtos: [
        {
          productName: "Modern Halı",
          quantity: 1,
          coverImage: "https://via.placeholder.com/100",
        },
      ],
    },
  ];

  useEffect(() => {
    setOrders(dummyOrders);
  }, []);

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
