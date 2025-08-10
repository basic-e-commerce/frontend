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
import PersonIcon from "@mui/icons-material/Person";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import PlaylistAddIcon from "@mui/icons-material/PlaylistAdd";
import CategoryIcon from "@mui/icons-material/Category";
import AddBoxIcon from "@mui/icons-material/AddBox";
import BentoIcon from "@mui/icons-material/Bento";
import LocalActivityIcon from "@mui/icons-material/LocalActivity";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import SettingsIcon from "@mui/icons-material/Settings";
import HomeWorkIcon from "@mui/icons-material/HomeWork";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";

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
            <Link to="/admins/kullanicilar">
              <PersonIcon className="icon" />
              <span>Kullanıcılar</span>
            </Link>
          </li>

          <li>
            <Link to="/admins/urunler">
              <FormatListBulletedIcon className="icon" />
              <span>Ürünler</span>
            </Link>
          </li>
          <li>
            <Link to="/admins/urunekle">
              <PlaylistAddIcon className="icon" />
              <span>Ürün Ekle</span>
            </Link>
          </li>
          <li>
            <Link to="/admins/kategoriler">
              <BentoIcon className="icon" />
              <span>Kategoriler</span>
            </Link>
          </li>

          <li>
            <Link to="/admins/kategoriekle">
              <AddBoxIcon className="icon" />
              <span>Kategori Ekle</span>
            </Link>
          </li>

          <li>
            <Link to="/admins/kuponekle">
              <AddCircleIcon className="icon" />
              <span>Kupon Ekle</span>
            </Link>
          </li>

          <li>
            <Link to="/admins/kuponlistele">
              <LocalActivityIcon className="icon" />
              <span>Kupon Ayarları</span>
            </Link>
          </li>

          <li>
            <Link to="/admins/siparisler">
              <ShoppingBasketIcon className="icon" />
              <span>Siparişleri Listele</span>
            </Link>
          </li>

          <li>
            <Link to="/admins/ayarlar">
              <SettingsIcon className="icon" />
              <span>Ayarlar</span>
            </Link>
          </li>

          <li>
            <Link to="/admins/kargo-adresleri">
              <HomeWorkIcon className="icon" />
              <span>Kargo Adresleri</span>
            </Link>
          </li>

          <li>
            <Link to="/admins/anlasma-cargo">
              <LocalShippingIcon className="icon" />
              <span>Anlaşma Cargo</span>
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
