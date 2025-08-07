import "./Footer.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import MapIcon from "@mui/icons-material/Map";
import PhoneIcon from "@mui/icons-material/Phone";
import data from "../../data.json";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footerItem">
          <div className="logo">
            <a href="/">
              <img src="/images/logo/logo.png" alt="Akıllı Logo" />
            </a>
          </div>
          <div className="metin">
            <p>{data.footerDesc}</p>
          </div>
        </div>

        <div className="footerItem">
          <h3>Pollitikalar</h3>
          <hr />
          <ul className="footerHizmet">
            <li>
              <Link to={"/gizlilik-politikasi"}>
                <span>Gizlilik Politikası</span>
              </Link>
            </li>
            <li>
              <Link to={"/mesafeli-satis-sozlesmesi"}>
                <span>Mesafeli Satış Sözleşmesi</span>{" "}
              </Link>
            </li>
            <li>
              <Link to={"/iade-ve-iptal-politikasi"}>
                <span>İade ve İptal Politikası</span>
              </Link>
            </li>
            <li>
              <Link to={"/cerez-politikasi"}>
                <span>Çerez Politikası</span>
              </Link>
            </li>
            <li>
              <Link to={"/kvkk-aydinlatma-metni"}>
                <span>KVKK Aydınlatma Metni</span>
              </Link>
            </li>
            <li>
              <Link to={"/on-bilgilendirme-formu"}>
                <span>Ön Bilgilendirme Formu</span>
              </Link>
            </li>
          </ul>
        </div>

        <div className="footerItem">
          <h3>İletişim Bilgilerimiz</h3>
          <hr />
          <ul>
            <li className="sag">
              <div className="yeap">
                <PhoneIcon />

                <a href={data.telefon_linki}>
                  <span style={{ marginRight: "-0.5rem" }} className="ici">
                    {data.telefon}
                  </span>
                </a>
              </div>
            </li>

            <li className="sag">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={data.instagram_linki}
              >
                <InstagramIcon />
                <span>{data.instagram}</span>
              </a>
            </li>

            <li className="sag">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={data.adres_linki}
              >
                <MapIcon />
                <span>{data.adres}</span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <hr style={{ width: "100%", border: "1px solid #dee0ea" }} />

      <div className="container">
        <p style={{ fontSize: "0.85rem" }}>
          Copyright 2025 © {data.magazaIsmi}. Bütün Hakları Saklıdır.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
