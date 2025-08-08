import "./Sidebar.scss";
import CelebrationIcon from "@mui/icons-material/Celebration";
import SlowMotionVideoIcon from "@mui/icons-material/SlowMotionVideo";
import LoopIcon from "@mui/icons-material/Loop";
import CandlestickChartIcon from "@mui/icons-material/CandlestickChart";
import DonutLargeIcon from "@mui/icons-material/DonutLarge";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import { Link } from "react-router-dom";
import api from "../../../api/api";
import { BASE_URL } from "../../../config/baseApi";
import { useDispatch } from "react-redux";
import { setLogout } from "../../../redux/slices/authSlice";
import LogoutIcon from "@mui/icons-material/Logout";

const Sidebar = () => {
  const dispatch = useDispatch();
  return (
    <div className="panelSidebar">
      <div className="top">
        <h3 className="logo">Mağaza İsmi</h3>
      </div>
      <div className="bottom">
        <ul>
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
            <Link to="/admins/kuponekle">
              <CelebrationIcon className="icon" />
              <span>Kupon Ekle</span>
            </Link>
          </li>

          <li>
            <Link to="/admins/kuponlistele">
              <CelebrationIcon className="icon" />
              <span>Kupon Ayarları</span>
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

          <li>
            <Link to="/admins/kargo-adresleri">
              <TrendingUpIcon className="icon" />
              <span>Kargo Adresleri</span>
            </Link>
          </li>

          <li style={{ marginBottom: "10px" }}>
            <button
              onClick={async () => {
                try {
                  await api.post(`${BASE_URL}/api/v1/auth/refresh/logout`);
                  dispatch(setLogout());
                } catch (error) {
                  console.log(error);
                }
              }}
            >
              <LogoutIcon className="icon" />
              <span>Çıkış Yap</span>
            </button>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
