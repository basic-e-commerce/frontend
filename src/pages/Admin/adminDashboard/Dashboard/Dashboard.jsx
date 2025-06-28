import { useEffect, useState } from "react";
import "./Dashboard.scss";
import DateRangePicker from "./Groups/DateRangePicker/DateRangePicker";
import SummaryCard from "./Groups/SummaryCard/SummaryCard";
import InfoCard from "../../../../components/Admin/widgets/infoCard";

import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import TrendingDownIcon from "@mui/icons-material/TrendingDown";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupsIcon from "@mui/icons-material/Groups";
import TopCategoriesCard from "./Groups/TopCategories/TopCategories";
import MostSellingProductsCard from "./Groups/MostSellingProductsCard/MostSellingProductsCard";
import VisitorChart from "./Groups/VisitorChart/VisitorChart";
import api from "../../../../api/api";
import { BASE_URL } from "../../../../config/baseApi";

const Dashboard = () => {
  const [satisData, setSatisData] = useState([]);
  const [registerCustomerData, setRegisterCustomerData] = useState("");
  const [populerProducts, setPopulerProducts] = useState([]);
  const [sepets, setSepets] = useState([]);

  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const setOfDay = (date) => {
    const d = new Date(date);
    d.setUTCHours(23, 59, 59, 0); // Günün sonu UTC zaman diliminde
    return d.toISOString();
  };

  const getSatis = async () => {
    try {
      const response = await api.post(`${BASE_URL}/api/v1/sell/day-sell`, {
        startDate: setOfDay(startDate),
        endDate: setOfDay(endDate),
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
          startDate: setOfDay(startDate),
          endDate: setOfDay(endDate),
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
        startDate: setOfDay(startDate),
        endDate: setOfDay(endDate),
      });
      setPopulerProducts(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getSepetInfo = async () => {
    try {
      const response = await api.get(
        `${BASE_URL}/api/v1/sell/card-contain-product`
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

  useEffect(() => {
    const functions = [
      getSatis,
      registerCustomer,
      getPopulerProduct,
      getSepetInfo,
    ];
    const fetchSequentially = async () => {
      try {
        for (let i = 0; i < functions.length; i++) {
          await functions[i]();
        }
      } catch (error) {
        console.error("Analizler çekilemedi:", error);
      }
    };

    if (!(startDate == null || endDate == null)) {
      fetchSequentially();
    }
  }, [startDate, endDate]);

  console.log(satisData);

  return (
    <div className="dashboard">
      <div className="container">
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
              img={<TrendingDownIcon fontSize="large" />}
              value={"4 Üründe"}
              tag={"Stok Azalıyor"}
            />
            <InfoCard
              img={<PersonAddIcon fontSize="large" />}
              value={registerCustomerData || "Veri Yok"}
              tag={"Yeni Kayıt"}
            />
            <InfoCard
              img={<GroupsIcon fontSize="large" />}
              value={"1230"}
              tag={"Ziyaretçi"}
            />
          </div>

          <SummaryCard satisData={satisData} />

          <div className="two">
            <TopCategoriesCard sepets={sepets} />
            <MostSellingProductsCard populerProducts={populerProducts} />
          </div>

          <VisitorChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
