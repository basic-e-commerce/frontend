import { useEffect, useState, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.scss";
import SegmentIcon from "@mui/icons-material/Segment";
// import WhatsAppIcon from "@mui/icons-material/WhatsApp";
// import InstagramIcon from "@mui/icons-material/Instagram";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useDispatch, useSelector } from "react-redux";
import { logOutBackend } from "../../api/apiAuth";
import { setLogout } from "../../redux/slices/authSlice";
import LoadingBarUser from "../LoadingBarUser/LoadingBarUser";
import SearchIcon from "@mui/icons-material/Search";
import SearchCard from "../SearchCard/SearchCard";
import axios from "axios";
import { BASE_URL } from "../../config/baseApi";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();

  const { isLogin, role } = useSelector((state) => state.authSlice);
  const { visb, message, status } = useSelector(
    (state) => state.alertKullanici
  );
  const { isLoading } = useSelector((state) => state.loading);

  const submenuRef = useRef(null);
  const [submenuHeight, setSubmenuHeight] = useState("0px");

  const getNavigationData = useCallback(() => {
    const nav = [];

    if (isLogin && role === "CUSTOMER") {
      nav.push({
        label: "Profil",
        submenu: [
          { to: "/profil/bilgiler", label: "Kişisel Bilgiler" },
          { to: "/profil/sifredegistir", label: "Şifre Ayarları" },
          { to: "/profil/adreslerim", label: "Adreslerim" },
          { to: "/profil/siparislerim", label: "Siparişlerim" },
        ],
      });
    }
    if (isLogin && role === "ADMIN") {
      nav.push({
        label: "Yönetim Paneli",
        submenu: [{ to: "/admins/dashboard", label: "Admin Paneli" }],
      });
    }
    nav.push(
      { to: "/", label: "Anasayfa" },
      { to: "/kategoriler", label: "Tüm Ürünler" },
      { to: "/siparis-sorgula", label: "Sipariş Sorgula" },
      { to: "/iletisim", label: "İletişim" }
    );
    return nav;
  }, [isLogin, role]);

  const navigationData = getNavigationData();
  const desktopMenu = navigationData.filter((item) => !item.submenu);

  const handleLogout = async () => {
    try {
      await logOutBackend();
      dispatch(setLogout());
      setIsMenuOpen(false);
    } catch (err) {
      console.error("Çıkış hatası:", err);
    }
  };

  useEffect(() => {
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.classList.add("sideMenu-open");
    } else {
      document.body.classList.remove("sideMenu-open");
    }
    return () => {
      document.body.classList.remove("sideMenu-open");
    };
  }, [isMenuOpen]);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const threshold = 70;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (!isMenuOpen) {
        if (currentScrollY === 0) {
          document.querySelector(".header")?.classList.remove("hide");
          lastScrollY = 0;
          return;
        }
        const diff = currentScrollY - lastScrollY;
        if (diff > threshold) {
          document.querySelector(".header")?.classList.add("hide");
          lastScrollY = currentScrollY;
        } else if (diff < -threshold) {
          document.querySelector(".header")?.classList.remove("hide");
          lastScrollY = currentScrollY;
        }
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMenuOpen]);

  useEffect(() => {
    if (isProfileMenuOpen && submenuRef.current) {
      setSubmenuHeight(submenuRef.current.scrollHeight + "px");
    } else {
      setSubmenuHeight("0px");
    }
  }, [isProfileMenuOpen, navigationData]);

  const fetchSearchProducts = async (title) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/v1/product/search?searchTitle=${title}&page=0&size=10`
      );
      setProducts(response.data);
    } catch (error) {
      console.error("Arama hatası:", error);
    }
  };

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchTerm(value);

    if (value === "") {
      setProducts([]);
      setIsSearchOpen(false);
    } else {
      setTimeout(() => fetchSearchProducts(value), 500);
    }
  };

  return (
    <header className="header">
      <div className="headerTop">
        <div className="container">
          <div className="headerTopWrapper">
            {isSearchOpen ? (
              <div />
            ) : (
              <div className="headerTopLeft">
                {!isLogin ? (
                  <>
                    <Link to="/customerregister" className="header-auth-link">
                      <span>Kayıt Ol</span>
                    </Link>
                    <Link to="/customerlogin" className="header-auth-link">
                      <span>Giriş Yap</span>
                    </Link>
                  </>
                ) : role === "CUSTOMER" ? (
                  <Link to="/profil/bilgiler" className="header-profile-link">
                    <PersonIcon className="icon" />
                    <span>Profilim</span>
                  </Link>
                ) : (
                  <Link to="/admins/dashboard" className="header-profile-link">
                    <PersonIcon className="icon" />
                    <span>Admin Paneli</span>
                  </Link>
                )}
              </div>
            )}

            <div className="headerTopRight">
              {isSearchOpen && (
                <input
                  type="text"
                  className="searchInput"
                  placeholder="Aramak için yazın..."
                  autoFocus
                  value={searchTerm}
                  onChange={handleSearchChange}
                />
              )}

              <button
                onClick={() => setIsSearchOpen(true)}
                className="buttonSearchContent header-cart-link"
              >
                <SearchIcon className="icon" />
              </button>

              <Link to="/sepet" className="header-cart-link">
                <ShoppingCartIcon className="icon" />
                <span>Sepet</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="headerBottom">
        <div className="container">
          <div className="headerWrapper">
            <Link className="logo" to="/">
              <img src="/images/logo/logo.png" alt="Logo" />
            </Link>
            <div className="desktopMenu">
              <nav>
                <ul>
                  {desktopMenu.map((item, index) => (
                    <li key={index}>
                      <Link to={item.to}>{item.label}</Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
            {/* Hamburger Menü */}
            <div
              className="hamburger"
              onClick={() => setIsMenuOpen((prev) => !prev)}
            >
              {isMenuOpen ? <CloseIcon /> : <SegmentIcon />}
            </div>
          </div>

          {isSearchOpen && searchTerm && (
            <div className="searchWrapper">
              <div className="container">
                <div className="searchContent">
                  <div className="topSearchh">
                    <span>Bulunan Ürün: {products.length}</span>
                    <button
                      className="closeButton"
                      onClick={() => {
                        setIsSearchOpen(false);
                        setSearchTerm("");
                      }}
                    >
                      <CloseIcon />
                    </button>
                  </div>

                  <div className="listSearch">
                    {products?.map((product, index) => (
                      <SearchCard
                        key={index}
                        product={product}
                        setIsSearchOpen={setIsSearchOpen}
                        setSearchTerm={setSearchTerm}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <div className={`sideMenu ${isMenuOpen ? "open" : ""}`}>
        <div className="sideMenuLogo">
          {/* <img src="/images/logo/logo.png" alt="Logo" />*/}
        </div>
        <div className="sideMenuContent">
          <nav>
            <ul>
              {navigationData.map((item, index) =>
                item.submenu ? (
                  <li className="submenuToggleLi" key={index}>
                    <div
                      className="submenuToggle"
                      onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                    >
                      {item.label}
                      <KeyboardArrowDownIcon />
                    </div>
                    <ul
                      ref={submenuRef}
                      className={`submenu${isProfileMenuOpen ? " open" : ""}`}
                      style={{
                        maxHeight: submenuHeight,
                        opacity: isProfileMenuOpen ? 1 : 0,
                        visibility: isProfileMenuOpen ? "visible" : "hidden",
                        paddingTop: isProfileMenuOpen ? "1.5rem" : 0,
                        transition:
                          "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.3s, visibility 0.3s, padding-top 0.3s",
                      }}
                    >
                      {item.submenu.map((sub, idx) => (
                        <li key={idx}>
                          {sub.action ? (
                            <button onClick={handleLogout}>Çıkış Yap</button>
                          ) : (
                            <Link
                              to={sub.to}
                              onClick={() => setIsMenuOpen(false)}
                            >
                              {sub.label}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={index}>
                    <Link to={item.to} onClick={() => setIsMenuOpen(false)}>
                      {item.label}
                    </Link>
                  </li>
                )
              )}
            </ul>
          </nav>
        </div>
        <div className="sideMenuFooter">
          {isLogin ? (
            <Link onClick={handleLogout} className="register">
              Çıkış Yap
            </Link>
          ) : (
            <>
              <Link to="/customerregister" className="register">
                Kayıt Ol
              </Link>
              <Link to="/customerlogin" className="loginnn">
                Giriş Yap
              </Link>
            </>
          )}
        </div>
      </div>

      {visb && (
        <div
          className="popupKullanici"
          style={{
            backgroundColor: status === "success" ? "#4caf50" : "darkred",
          }}
        >
          <p>{message}</p>
        </div>
      )}
      <LoadingBarUser isLoading={isLoading} />
    </header>
  );
};

export default Header;
