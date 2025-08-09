import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { BASE_URL } from "../../../../../config/baseApi";
import api from "../../../../../api/api";
import {
  setLoading,
  clearLoading,
} from "../../../../../redux/slices/loadingSlice";
import { showAlertWithTimeout } from "../../../../../redux/slices/alertSlice";

export const useOrders = () => {
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [selectedOrderByCargo, setSelectedOrderByCargo] = useState(null);
  const [selectedIade, setSelectedIade] = useState(null);
  const [selectedCancel, setselectedCancel] = useState(null);
  const [selectedOdeme, setSelectedOdeme] = useState(null);
  const [selectedManualCargo, setSelectedManualCargo] = useState(null);
  const [IsSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();

  const tabs = [
    "PENDING",
    "APPROVED",
    "PRE_TRANSIT",
    "TRANSIT",
    "DELIVERED",
    "RETURNED",
    "CANCEL",
  ];
  const [selectedTab, setSelectedTab] = useState("PENDING");
  const TAB_FILTERS = {
    PENDING: {
      paymentStatus: "PROCESS",
      orderStatus: "PENDING",
      orderPackageStatusCode: null,
      refundOrder: false,
    },
    APPROVED: {
      paymentStatus: "SUCCESS",
      orderStatus: "APPROVED",
      orderPackageStatusCode: null,
      refundOrder: false,
    },
    PRE_TRANSIT: {
      paymentStatus: "SUCCESS",
      orderStatus: "APPROVED",
      orderPackageStatusCode: "PRE_TRANSIT",
      refundOrder: false,
    },
    TRANSIT: {
      paymentStatus: "SUCCESS",
      orderStatus: "APPROVED",
      orderPackageStatusCode: "TRANSIT",
      refundOrder: false,
    },
    DELIVERED: {
      paymentStatus: "SUCCESS",
      orderStatus: "APPROVED",
      orderPackageStatusCode: "DELIVERED",
      refundOrder: false,
    },
    RETURNED: {
      refundOrder: true,
    },
    CANCEL: {
      orderStatus: "CANCEL",
      refundOrder: false,
    },
  };

  const fetchAdminOrder = async () => {
    dispatch(
      setLoading({ isLoading: true, message: "Siparişler yükleniyor..." })
    );
    try {
      const filterPayload = {
        ...TAB_FILTERS[selectedTab],
        sortBy: "createdAt",
        sortDirection: "desc",
      };

      const response = await api.post(
        `${BASE_URL}/api/v1/order/filter?page=0&size=100`,
        filterPayload
      );

      setOrders(response.data);
    } catch (error) {
      dispatch(
        showAlertWithTimeout({
          message: error.message || error.response?.data || "Hata Var",
          status: "error",
        })
      );
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
    selectedIade,
    setSelectedIade,
    IsSubmit,
    setIsSubmit,
    tabs,
    selectedTab,
    setSelectedTab,
    selectedCancel,
    setselectedCancel,
    selectedOdeme,
    setSelectedOdeme,
    selectedManualCargo,
    setSelectedManualCargo,
  };
};
