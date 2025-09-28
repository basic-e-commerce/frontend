import "./ProfileNav.scss";
import SpaceDashboardIcon from "@mui/icons-material/SpaceDashboard";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import LockIcon from "@mui/icons-material/Lock";
import PowerSettingsNewRoundedIcon from "@mui/icons-material/PowerSettingsNewRounded";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logOutBackend } from "../../api/apiAuth";
import { setLogout } from "../../redux/slices/authSlice";

const ProfileNav = () => {
  const dispatch = useDispatch();
  const handleLogout = async () => {
    try {
      await logOutBackend();
      dispatch(setLogout());
    } catch (error) {
      console.log(error);
    }
  };

  const menuItems = [
    {
      to: "/profil/bilgiler",
      icon: <SpaceDashboardIcon />,
      label: "Profilim",
    },
    {
      to: "/profil/sifredegistir",
      icon: <LockIcon />,
      label: "Şifre Ayarları",
    },
    {
      to: "/profil/adreslerim",
      icon: <LocationOnIcon />,
      label: "Adreslerim",
    },
    {
      to: "/profil/siparislerim",
      icon: <ShoppingBagIcon />,
      label: "Siparişlerim",
    },
    {
      icon: <PowerSettingsNewRoundedIcon />,
      label: "Çıkış Yap",
      action: handleLogout,
    },
  ];

  return (
    <div className="container">
      <div className="accountNav">
        <div className="account-grid">
          {menuItems.map((item, idx) =>
            item.action ? (
              <button key={idx} className="account-card" onClick={item.action}>
                {item.icon}
                <span>{item.label}</span>
              </button>
            ) : (
              <Link key={idx} to={item.to} className="account-card">
                {item.icon}
                <span>{item.label}</span>
              </Link>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileNav;
