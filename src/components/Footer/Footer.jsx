import "./Footer.scss";
import InstagramIcon from "@mui/icons-material/Instagram";
import MapIcon from "@mui/icons-material/Map";
import PhoneIcon from "@mui/icons-material/Phone";
import { Link } from "react-router-dom";

const Footer = ({ contactData }) => {
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
            <p>{contactData?.footerDescription}</p>
          </div>
        </div>

        <div className="footerItem">
          <h3>Politikalar & Önemli Bilgiler</h3>
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
            <li>
              <Link to={"/firma-bilgileri"}>
                <span>Firma Bilgileri</span>
              </Link>
            </li>
            <li>
              <Link to={"/meslek-kurallari"}>
                <span>Meslek Kuralları</span>
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

                <a href={`tel:${contactData?.phoneNo}`}>
                  <span style={{ marginRight: "-0.5rem" }} className="ici">
                    {contactData?.phoneNo}
                  </span>
                </a>
              </div>
            </li>

            <li className="sag">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={contactData?.instagramLink}
              >
                <InstagramIcon />
                <span>{contactData?.instagram}</span>
              </a>
            </li>

            <li className="sag">
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={contactData?.addressLink}
              >
                <MapIcon />
                <span>
                  {contactData?.addressLine1} {contactData?.postalCode}{" "}
                  {contactData?.district}/{contactData?.city}
                </span>
              </a>
            </li>
          </ul>
        </div>
      </div>

      <hr style={{ width: "100%", border: "1px solid #dee0ea" }} />

      <div className="container bottomEnd">
        <p style={{ fontSize: "0.85rem" }}>
          Copyright 2025 © {contactData?.name}. Bütün Hakları Saklıdır.
        </p>
        <img
          className="odemeIcon"
          src="/images/logo_band_colored@2x.png"
          alt="Avon"
        />
      </div>
    </footer>
  );
};

export default Footer;
