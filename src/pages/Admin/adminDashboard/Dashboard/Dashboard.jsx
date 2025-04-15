import { useState } from "react";
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
import UnpurchasedProducts from "./Groups/SepetAlinmamis/UnpurchasedProducts";
import VisitorChart from "./Groups/VisitorChart/VisitorChart";

const Dashboard = () => {
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);

  const handleDateChange = (start, end) => {
    setStartDate(start);
    setEndDate(end);

    // API veya datayı burda çağırırsın
    console.log("Seçilen tarih aralığı:", {
      baslangic: start,
      bitis: end,
    });
  };

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
              value={"12.344₺"}
              tag={"Net Kar"}
            />
            <InfoCard
              img={<TrendingDownIcon fontSize="large" />}
              value={"4 Üründe"}
              tag={"Stok Azalıyor"}
            />
            <InfoCard
              img={<PersonAddIcon fontSize="large" />}
              value={"159"}
              tag={"Yeni Kayıt"}
            />
            <InfoCard
              img={<GroupsIcon fontSize="large" />}
              value={"1230"}
              tag={"Ziyaretçi"}
            />
          </div>

          <SummaryCard />

          <div className="two">
            <TopCategoriesCard />
            <MostSellingProductsCard />
          </div>
          <UnpurchasedProducts />
          <VisitorChart />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
