import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../../../../config/baseApi";
import api from "../../../../../api/api";
import {
  setLoading,
  clearLoading,
} from "../../../../../redux/slices/loadingSlice";

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderByCargo, setSelectedOrderByCargo] = useState(null);
  const [IsSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();

  const tabs = [
    "PENDING",
    "APPROVED",
    "PRE_TRANSIT",
    "TRANSIT",
    "DELIVERED",
    "FAILURE",
    "RETURNED",
  ];
  const [selectedTab, setSelectedTab] = useState("PENDING");

  const fetchAdminOrder = async () => {
    dispatch(
      setLoading({ isLoading: true, message: "Siparişler yükleniyor..." })
    );
    try {
      const response = await api.post(
        `${BASE_URL}/api/v1/order/filter?page=0&size=100`,
        selectedTab === "PENDING" || selectedTab === "APPROVED"
          ? {
              sortBy: "createdAt",
              sortDirection: "asc",
              paymentStatus: selectedTab,
            }
          : {
              sortBy: "createdAt",
              sortDirection: "asc",
              paymentStatus: "APPROVED",
              statusCode: selectedTab,
            }
      );
      setOrders(response.data);
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(clearLoading());
    }
  };

  useEffect(() => {
    fetchAdminOrder();
  }, [selectedTab, IsSubmit]);

  return {
    orders,
    selectedOrder,
    setSelectedOrder,
    selectedOrderByCargo,
    setSelectedOrderByCargo,
    IsSubmit,
    setIsSubmit,
    tabs,
    selectedTab,
    setSelectedTab,
  };
};
