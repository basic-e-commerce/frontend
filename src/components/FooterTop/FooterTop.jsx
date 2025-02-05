import MapIcon from "@mui/icons-material/Map";
import PhoneIcon from "@mui/icons-material/Phone";
import "./FooterTop.scss";

const FooterTop = () => {
  return (
    <div className="dikkat">
      <div className="container dikkatItems">
        <div className="dikkatItem">
          <PhoneIcon fontSize="large" className="iconDikkat" />

          <div className="infoDikkat">
            <h3>Bizlere Ulaşın: +90 538 636 3206</h3>
            <p>
              Yukarıdaki telefon numarası ile gönül rahatlığıyla iletişim
              kurabilirsiniz. Telefonumuz sizlere 7/24 açık
            </p>
            <div>
              <a href="tel:+905386363206">
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
            İsmetpaşa, 2. Karanfil Sk. No:19/1, 17000 Çanakkale
            Merkez/Çanakkale
            </p>
            <div>
              <a
                target="_blank"
                href="https://maps.app.goo.gl/CPBNeTykSFdNv9vK9"
              >
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
