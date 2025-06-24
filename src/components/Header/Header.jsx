import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.scss";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/slices/categorySlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const { visb, message, status } = useSelector(
    (state) => state.alertKullanici
  );
  const dispatch = useDispatch();
  const { isLogin, role, isAuthChecked } = useSelector(
    (state) => state.authSlice
  );

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setTimeout(() => {
      setIsMenuOpen(false);
    }, 300); // 500ms (yarım saniye) gecikme
  };

  useEffect(() => {
    setIsMenuOpen(false);
    dispatch(getCategories());
  }, [location]);

  return (
    <header className="header">
      <div className="headerTop">
        <div className="container">
          <div className="headerTopWrapper">
            <div className="iconss">
              <span className="none">Bizi Takip Edin!</span>

              <a
                href="https://www.instagram.com/kayayapiinsaat_17"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon className="icon" />
              </a>

              <a
                href="https://wa.me/905436486611"
                target="_blank"
                rel="noopener noreferrer"
              >
                <WhatsAppIcon className="icon" />
              </a>
            </div>

            <div className="auth">
              {isLogin && isAuthChecked ? (
                role === "ADMIN" ? (
                  <Link className="authItem" to={"/admins/dashboard"}>
                    <PersonIcon className="icon" />
                    <span>Admin Paneli</span>
                  </Link>
                ) : (
                  <>
                    <Link className="authItem" to={"/profil/bilgiler"}>
                      <PersonIcon className="icon" />
                      <span>Profilim</span>
                    </Link>

                    <Link className="authItem" to={"/sepet"}>
                      <ShoppingCartOutlinedIcon className="icon" />
                      <span>Sepetim</span>
                    </Link>
                  </>
                )
              ) : (
                <>
                  <Link className="authItem" to={"/login"}>
                    <PersonIcon className="icon" />
                    <span>Giriş Yap</span>
                  </Link>

                  <Link className="authItem" to={"/sepet"}>
                    <ShoppingCartOutlinedIcon className="icon" />
                    <span>Sepetim</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="headerBottom">
        <div className="container">
          <div className="headerWrapper">
            <Link className="logo" to="/">
              {/* <img
                style={{ borderRadius: "5px" }}
                src="/images/logo/peynirharmanılogowebson.png"
                alt=""
              /> */}
              <h1>LOGO</h1>
            </Link>

            <nav className={`navigation ${isMenuOpen ? "open" : ""}`}>
              <ul className="menu-list">
                <li>
                  <Link
                    className="menu-link"
                    to="/kategoriler"
                    onClick={closeMenu}
                  >
                    Tüm Ürünler
                  </Link>
                </li>
                <li className="menu-list-item">
                  <Link className="menu-link" to="/" onClick={closeMenu}>
                    Anasayfa
                  </Link>
                </li>
              </ul>
            </nav>

            <div className="hamburger" onClick={toggleMenu}>
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </div>
          </div>
        </div>
      </div>

      {visb && (
        <div
          style={
            status === "success"
              ? { backgroundColor: "#4caf50" }
              : { backgroundColor: "darkred" }
          }
          className="popupKullanici"
        >
          <p>{message}</p>
        </div>
      )}
    </header>
  );
};

export default Header;
