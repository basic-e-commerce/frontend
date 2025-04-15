import { useState } from "react";
import "./Bilgiler.scss";

const KullaniciBilgileri = () => {
  const [formData, setFormData] = useState({
    ad: "",
    soyad: "",
    email: "",
    telefon: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="kullaniciBilgileri">
      <div className="kullaniciInput">
        <div className="title">
          <h3>Kullanıcı Bilgileriniz</h3>
        </div>

        <hr />

        <form className="bars">
          <label>
            Adınız:
            <input
              type="text"
              name="ad"
              value={formData.ad}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </label>

          <label>
            Soyadınız:
            <input
              type="text"
              name="soyad"
              value={formData.soyad}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </label>

          <label>
            E-posta Adresiniz:
            <input
              type="email"
              name="email"
              disabled
              value={formData.email}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </label>

          <label>
            Telefon:
            <input
              type="tel"
              name="telefon"
              value={formData.telefon}
              onChange={handleChange}
              required
              autoComplete="off"
            />
          </label>

          <div className="button">
            <button
              onClick={() =>
                setFormData({ ad: "", soyad: "", email: "", telefon: "" })
              }
            >
              Değiştir
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KullaniciBilgileri;
