import "./Sidebar.scss";
import CelebrationIcon from "@mui/icons-material/Celebration";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import LoopIcon from "@mui/icons-material/Loop";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="panelSidebar">
      <div className="top">
        <h3 className="logo">Peynir Harmanı</h3>
      </div>
      <div className="bottom">
        <ul>
          <li style={{ marginBottom: "10px" }}>
            <Link to="/admins">
              <ArrowBackIcon className="icon" />
              <span>Çıkış Yap</span>
            </Link>
          </li>
          <li>
            <Link to="/admins/dashboard">
              <InfoOutlinedIcon className="icon" />
              <span>İstatistik ve Analizler</span>
            </Link>
          </li>
          <li>
            <Link to="/admins/urunler">
              <LoopIcon className="icon" />
              <span>Ürünler</span>
            </Link>
          </li>
          <li>
            <Link to="/admins/urunekle">
              <SlowMotionVideoIcon className="icon" />
              <span>Ürün Ekle</span>
            </Link>
          </li>
          <li>
            <Link to="/admins/kategoriler">
              <CandlestickChartIcon className="icon" />
              <span>Kategoriler</span>
            </Link>
          </li>

          <li>
            <Link to="/admins/kategoriekle">
              <CelebrationIcon className="icon" />
              <span>Kategori Ekle</span>
            </Link>
          </li>

          <li>
            <Link to="/admins/siparisler">
              <DonutLargeIcon className="icon" />
              <span>Siparişleri Listele</span>
            </Link>
          </li>

          <li>
            <Link to="/admins/ayarlar">
              <TrendingUpIcon className="icon" />
              <span>Ayarlar</span>
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
