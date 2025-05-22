import { useEffect, useState } from "react";
import "./Bilgiler.scss";
import api from "../../../api/api";
import { BASE_URL } from "../../../config/baseApi";

const KullaniciBilgileri = () => {
  useEffect(() => {
    fetchBilgiler();
  }, []);

  const fetchBilgiler = async () => {
    const response = await api.get(`${BASE_URL}/api/v1/customer/profile`);
    const data = response.data;
    setFormData({
      ad: data.name,
      soyad: data.lastName,
      email: data.username,
      telefon: data.phoneNumber,
    });
  };

  const [formData, setFormData] = useState({
    ad: "",
    soyad: "",
    email: "",
    telefon: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitBilgiler = async (e) => {
    e.preventDefault();

    try {
      console.log({
        name: formData.ad,
        lastName: formData.soyad,
        phoneNumber: formData.telefon,
      });
      const response = await api.put(`${BASE_URL}/api/v1/customer/profile`, {
        name: formData.ad,
        lastName: formData.soyad,
        phoneNumber: formData.telefon,
      });

      console.log(response.data);
      fetchBilgiler();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="kullaniciBilgileri">
      <div className="kullaniciInput">
        <div className="title">
          <h3>Kullanıcı Bilgileriniz</h3>
        </div>

        <hr />

        <form onSubmit={submitBilgiler} className="bars">
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
            <button type="submit">Değiştir</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default KullaniciBilgileri;
