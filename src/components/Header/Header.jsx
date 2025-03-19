import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.scss";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import InstagramIcon from "@mui/icons-material/Instagram";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import SearchIcon from "@mui/icons-material/Search";
import HeadsetIcon from "@mui/icons-material/Headset";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategories,
  setSelectedCategory,
} from "../../redux/slices/categorySlice";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

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
  }, [location]);

  useEffect(() => {
    if (categories.length === 0) {
      dispatch(getCategories());
    }
  }, [dispatch, categories.length]);

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
              <Link className="authItem" to={"/login"}>
                <PersonIcon className="icon" />
                <span>Giriş Yap</span>
              </Link>

              <Link className="authItem" to={"/sepet"}>
                <ShoppingCartOutlinedIcon className="icon" />
                <span>Sepetim</span>
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="headerCenter">
        <div className="container">
          <div className="headerWrapperCenter">
            <Link className="logo" to="/">
              <img src="/images/logo/peynirharmanılogowebson.png" alt="" />
            </Link>

            <div className="searchContainer">
              <input
                type="text"
                placeholder="Ara..."
                className="search-input"
              />
              <SearchIcon className="search-icon" />
            </div>

            <div className="info-container">
              <div className="info-box">
                <HeadsetIcon className="icon" />

                <div className="info-text">
                  <span>Destek Hattı</span>
                  <strong>0850 305 32 02</strong>
                  <span>test</span>
                </div>
              </div>

              <div className="divider"></div>

              <div className="info-box">
                <LocalShippingOutlinedIcon className="icon" />
                <div className="info-text">
                  <span>1200 TL ve üzeri</span>
                  <strong>Ücretsiz Kargo</strong>
                </div>
              </div>
            </div>

            <div className="hamburger" onClick={toggleMenu}>
              {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </div>
          </div>
        </div>
      </div>

      <div className="headerBottom">
        <div className="container">
          <div className="headerWrapperBottom">
            <nav className={`navigation ${isMenuOpen ? "open" : ""}`}>
              <ul className="menu-list">
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <li key={category.id} className="menu-list-item">
                      <Link
                        className="menu-link"
                        to={`/urunler`}
                        onClick={() => {
                          dispatch(setSelectedCategory(category));
                          closeMenu();
                        }}
                      >
                        {category.name}
                      </Link>
                    </li>
                  ))
                ) : (
                  <li className="menu-list-item">Kategoriler yükleniyor...</li>
                )}

                <li className="menu-list-item">
                  <Link
                    className="menu-link"
                    to={`/urunler`}
                    onClick={() => {
                      dispatch(setSelectedCategory(null));
                      closeMenu();
                    }}
                  >
                    Tüm Ürünler
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
