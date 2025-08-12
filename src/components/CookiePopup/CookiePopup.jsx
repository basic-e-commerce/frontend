import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./CookiePopup.scss";

const CookiePopup = () => {
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    // localStorage'dan çerez tercihini kontrol et
    const cookiePreference = localStorage.getItem("cookiePreference");

    // Eğer daha önce tercih yapılmamışsa popup'ı göster
    if (!cookiePreference) {
      setShowPopup(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("cookiePreference", "accepted");
    setShowPopup(false);
  };

  const handleReject = () => {
    localStorage.setItem("cookiePreference", "rejected");
    setShowPopup(false);
  };

  if (!showPopup) {
    return null;
  }

  return (
    <div className="cookie-popup-overlay">
      <div className="cookie-popup">
        <div className="cookie-popup-content">
          <div className="cookie-popup-header">
            <h3>Çerez Politikası</h3>
          </div>

          <div className="cookie-popup-body">
            <p>
              Bu web sitesi deneyiminizi geliştirmek için çerezler
              kullanmaktadır. Sitemizi kullanmaya devam ederek, gizlilik
              politikamızı kabul etmiş olursunuz.
            </p>
            <p>
              Çerezler, web sitemizin daha iyi çalışması, güvenliği artırması ve
              size daha iyi bir kullanıcı deneyimi sunması için kullanılır.
            </p>
            <div className="cookie-popup-links">
              <div className="politikalar">
                <Link to="/gizlilik-politikasi" className="cookie-link">
                  Gizlilik Politikası
                </Link>
                <span className="cookie-link-separator">•</span>
                <Link to="/cerez-politikasi" className="cookie-link">
                  Çerez Politikası
                </Link>
              </div>

              <div className="cookie-popup-buttons">
                <button
                  className="cookie-btn cookie-btn-reject"
                  onClick={handleReject}
                >
                  Reddet
                </button>
                <button
                  className="cookie-btn cookie-btn-accept"
                  onClick={handleAccept}
                >
                  Kabul Et
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiePopup;
