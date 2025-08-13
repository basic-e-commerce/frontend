import "./Iletisim.scss";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import InstagramIcon from "@mui/icons-material/Instagram";
import EmailIcon from "@mui/icons-material/Email";
import PropTypes from "prop-types";

const Iletisim = ({ contactData }) => {
  // Helper function to capitalize first letter
  const capitalizeFirst = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
  };

  return (
    <div className="iletisim">
      <div className="container">
        <div className="content">
          <div className="map">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3512.5742804343345!2d26.416648102012637!3d40.15538770037758!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14b1a82a9f86fbab%3A0x6d60d35f364075af!2sCevat%20Pa%C5%9Fa%2C%20Kaz%C4%B1m%20Karabekir%20Sk.%20No%3A22%2C%2017000%20%C3%87anakkale%20Merkez%2F%C3%87anakkale!5e0!3m2!1str!2str!4v1755083476312!5m2!1str!2str"
              className="iframe"
              style={{ border: "0px" }}
              allowfullscreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            ></iframe>
          </div>

          <div className="infoIletisim">
            <div className="itemIletisim">
              <h3>Mesai Saatlerimiz</h3>
              <div className="workingHoursGrid">
                {contactData?.openCloseHours?.map((day, index) => (
                  <div key={index} className="workingHoursItem">
                    <h4>{capitalizeFirst(day.day)}:</h4>
                    <p>
                      {day.hour} - {day.endHour}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <div className="itemIletisim">
              <h3>Adres Bilgilerimiz</h3>
              <p>
                {contactData?.addressLine1} {contactData?.postalCode}{" "}
                {contactData?.district}/{contactData?.city}
              </p>
            </div>

            <div className="itemIletisim">
              <h3>Telefon Numaralarımız</h3>
              <div className="itemList">
                <LocalPhoneIcon />
                <p>
                  <a href={`tel:${contactData?.phoneNo}`}>
                    {contactData?.phoneNo}
                  </a>
                </p>
              </div>
            </div>

            <div className="itemIletisim">
              <h3>Medya Hesaplarımız</h3>
              <div className="medyas">
                <a href={`mailto:${contactData?.email}`} className="itemList">
                  <EmailIcon />
                  <p>{contactData?.email}</p>
                </a>
                <a
                  id="sea"
                  target="_blank"
                  href={contactData?.instagramLink}
                  className="itemList"
                >
                  <InstagramIcon />
                  <p>{contactData?.instagram}</p>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

Iletisim.propTypes = {
  contactData: PropTypes.shape({
    addressLine1: PropTypes.string,
    postalCode: PropTypes.string,
    district: PropTypes.string,
    city: PropTypes.string,
    phoneNo: PropTypes.string,
    email: PropTypes.string,
    instagramLink: PropTypes.string,
    instagram: PropTypes.string,
    workingHours: PropTypes.string,
    openCloseHours: PropTypes.arrayOf(
      PropTypes.shape({
        day: PropTypes.string.isRequired,
        hour: PropTypes.string.isRequired,
        endHour: PropTypes.string.isRequired,
      })
    ),
  }),
};

export default Iletisim;
