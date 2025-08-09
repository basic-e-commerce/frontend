import MapIcon from "@mui/icons-material/Map";
import PhoneIcon from "@mui/icons-material/Phone";
import "./FooterTop.scss";

const FooterTop = ({ contactData }) => {
  return (
    <div className="dikkat">
      <div className="container dikkatItems">
        <div className="dikkatItem">
          <PhoneIcon fontSize="large" className="iconDikkat" />

          <div className="infoDikkat">
            <h3>Bizlere Ulaşın: {contactData?.phoneNo}</h3>
            <p>
              Yukarıdaki telefon numarası ile gönül rahatlığıyla iletişim
              kurabilirsiniz.
            </p>
            <div>
              <a href={`tel:${contactData?.phoneNo}`}>
                <button>Hemen Ara</button>
              </a>
            </div>
          </div>
        </div>

        <div className="dikkatItem">
          <MapIcon fontSize="large" className="iconDikkat" />

          <div className="infoDikkat">
            <h3>Adres İçin</h3>
            <p>
              {contactData?.addressLine1} {contactData?.postalCode}{" "}
              {contactData?.district}/{contactData?.city}
            </p>
            <div>
              <a target="_blank" href={contactData?.addressLink}>
                <button>Yol Tarifi Al</button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FooterTop;
