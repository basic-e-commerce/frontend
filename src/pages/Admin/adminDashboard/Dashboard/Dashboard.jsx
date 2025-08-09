import { useEffect, useState } from "react";
import "./Dashboard.scss";
import DateRangePicker from "./Groups/DateRangePicker/DateRangePicker";
import SummaryCard from "./Groups/SummaryCard/SummaryCard";
import InfoCard from "../../../../components/Admin/widgets/infoCard";
import DashboardSkeleton from "./Groups/DashboardSkeleton";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import TopCategoriesCard from "./Groups/TopCategories/TopCategories";
import MostSellingProductsCard from "./Groups/MostSellingProductsCard/MostSellingProductsCard";
import VisitorChart from "./Groups/VisitorChart/VisitorChart";
import api from "../../../../api/api";
import { BASE_URL } from "../../../../config/baseApi";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [satisData, setSatisData] = useState([]);
  const [registerCustomerData, setRegisterCustomerData] = useState("");
  const [populerProducts, setPopulerProducts] = useState([]);
  const [sepets, setSepets] = useState([]);
  const [visitor, setVisitor] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [lowStock, setLowStock] = useState([]);
  const [lowPopup, setLowPopup] = useState(false);

  const setOfDayEnd = (date) => {
    const d = new Date(date);
    d.setUTCHours(23, 59, 59, 0); // Günün sonu UTC zaman diliminde
    return d.toISOString();
  };

  const setOfDayStart = (date) => {
    const d = new Date(date);
    d.setUTCHours(0, 0, 0, 0); // Günün sonu UTC zaman diliminde
    return d.toISOString();
  };

  const getSatis = async () => {
    try {
      const response = await api.post(`${BASE_URL}/api/v1/sell/day-sell`, {
        startDate: setOfDayStart(startDate),
        endDate: setOfDayEnd(endDate),
        periodType: "DAY",
      });
      setSatisData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const registerCustomer = async () => {
    try {
      const response = await api.post(
        `${BASE_URL}/api/v1/sell/customer-register`,
        {
          startDate: setOfDayStart(startDate),
          endDate: setOfDayEnd(endDate),
        }
      );
      setRegisterCustomerData(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPopulerProduct = async () => {
    try {
      const response = await api.post(`${BASE_URL}/api/v1/sell/sell-product`, {
        startDate: setOfDayStart(startDate),
        endDate: setOfDayEnd(endDate),
      });
      setPopulerProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSepetInfo = async () => {
    try {
      const response = await api.post(
        `${BASE_URL}/api/v1/sell/card-contain-product`,
        {
          startDate: setOfDayStart(startDate),
          endDate: setOfDayEnd(endDate),
        }
      );
      setSepets(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDateChange = (start, end) => {
    if (start != null) {
      setStartDate(start);
    }

    if (end != null) {
      setEndDate(end);
    }
  };

  const getVisitor = async () => {
    try {
      const response = await api.post(
        `${BASE_URL}/api/v1/visitors/between-visitor`,
        {
          startDate: setOfDayStart(startDate),
          endDate: setOfDayEnd(endDate),
        }
      );
      setVisitor(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getLowStock = async () => {
    try {
      const response = await api.get(`${BASE_URL}/api/v1/sell/low-product`, {
        startDate: setOfDayStart(startDate),
        endDate: setOfDayEnd(endDate),
      });
      setLowStock(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const functions = [
      getSatis,
      registerCustomer,
      getPopulerProduct,
      getSepetInfo,
      getVisitor,
      getLowStock,
    ];
    const fetchSequentially = async () => {
      try {
        setIsLoading(true);
        for (let i = 0; i < functions.length; i++) {
          await functions[i]();
        }
      } catch (error) {
        console.error("Analizler çekilemedi:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!(startDate == null || endDate == null)) {
      fetchSequentially();
    }
  }, [startDate, endDate]);

  useEffect(() => {
    if (startDate === null && endDate === null) {
      const today = new Date();
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(today.getDate() - 7);

      setStartDate(sevenDaysAgo);
      setEndDate(today);
    }
  }, []);

  if (isLoading && startDate && endDate) {
    return <DashboardSkeleton />;
  }

  return (
    <div className="dashboard">
      <div className="dashboardContent">
        <DateRangePicker
          startDate={startDate}
          endDate={endDate}
          onChange={handleDateChange}
        />

        <div className="infoCards">
          <InfoCard
            img={<AttachMoneyIcon fontSize="large" />}
            value={
              satisData?.totalPrice !== undefined &&
              satisData?.totalPrice !== null
                ? `${satisData.totalPrice} TL`
                : "Veri Yok"
            }
            tag={"Ciro"}
          />
          <InfoCard
            img={<AttachMoneyIcon fontSize="large" />}
            value={
              satisData?.refundPrice !== undefined &&
              satisData?.refundPrice !== null
                ? `${satisData.refundPrice} TL`
                : "Veri Yok"
            }
            tag={"İade Edilmiş Tutar"}
          />

          <InfoCard
            onClick={() => setLowPopup(true)}
            img={<TrendingDownIcon fontSize="large" />}
            value={lowStock?.length + " Üründe" || "Veri Yok"}
            tag={"Stok Azalıyor"}
          />
          <InfoCard
            img={<PersonAddIcon fontSize="large" />}
            value={registerCustomerData || "Veri Yok"}
            tag={"Yeni Kayıt"}
          />
          <InfoCard
            img={<GroupsIcon fontSize="large" />}
            value={visitor?.quantity || "Veri Yok"}
            tag={"Ziyaretçi"}
          />
        </div>

        <SummaryCard satisData={satisData} />

        <div className="two">
          <TopCategoriesCard sepets={sepets} />
          <MostSellingProductsCard populerProducts={populerProducts} />
        </div>

        <VisitorChart visitor={visitor} />
      </div>

      {lowPopup && (
        <div className="modal-overlay">
          <div className="modal">
            <button
              className="close-btn"
              onClick={() => {
                setLowPopup(false);
              }}
            >
              ×
            </button>

            <div className="product-list">
              {lowStock?.map((item, index) => (
                <Link
                  to={`/admins/urunler/${item.linkName}`}
                  key={index}
                  className="product-item"
                >
                  <img src={item.coverImage?.url} alt={item.productName} />
                  <div className="details">
                    <p className="name">{item.name}</p>
                    <p className="id">Ürün ID: {item.id}</p>
                  </div>
                  <span className="sales">Kalan Stok: {item.quantity}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
