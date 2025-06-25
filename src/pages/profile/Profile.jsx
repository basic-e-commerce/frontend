import "./Profile.scss";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LockIcon from "@mui/icons-material/Lock";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import { Link, Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOutBackend } from "../../api/apiAuth";
import { setLogout } from "../../redux/slices/authSlice";

const Profile = () => {
  const dispatch = useDispatch();
  return (
    <div className="container">
      <div className="account">
        <div className="sidebarr">
          <div className="top">
            <div className="logo">Kullanıcı Paneli</div>
          </div>
          <hr />
          <div className="center">
            <ul>
              <li>
                <Link to="/profil/bilgiler">
                  <SpaceDashboardIcon className="icon" />
                  <span>Profilim</span>
                </Link>
              </li>
              <li>
                <Link to="/profil/sifredegistir">
                  <LockIcon className="icon" />
                  <span>Şifre Ayarları</span>
                </Link>
              </li>
              <li>
                <Link to="/profil/adreslerim">
                  <LocationOnIcon className="icon" />
                  <span>Adreslerim</span>
                </Link>
              </li>
              <li>
                <Link to="/profil/siparislerim">
                  <ShoppingBagIcon className="icon" />
                  <span>Siparişlerim</span>
                </Link>
              </li>
              <li>
                <button
                  onClick={async () => {
                    try {
                      await logOutBackend();
                      dispatch(setLogout());
                    } catch (error) {
                      console.log(error);
                    }
                  }}
                >
                  <PowerSettingsNewRoundedIcon className="icon" />
                  <span>Çıkış Yap</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        <section className="section">
          <Outlet />
        </section>
      </div>
    </div>
  );
};

export default Profile;
