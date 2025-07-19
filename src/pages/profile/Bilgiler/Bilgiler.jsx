import { useEffect, useState } from "react";
import "./Bilgiler.scss";
import api from "../../../api/api";
import { BASE_URL } from "../../../config/baseApi";
import { useDispatch, useSelector } from "react-redux";
import { showAlertWithTimeoutKullanici } from "../../../redux/slices/alertKullaniciSlice";
import { clearLoading, setLoading } from "../../../redux/slices/loadingSlice";
import BilgilerSkeleton from "./BilgilerSkeleton";

const KullaniciBilgileri = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loading);

  const [formData, setFormData] = useState({
    ad: "",
    soyad: "",
    email: "",
    telefon: "",
  });

  const [initialData, setInitialData] = useState({
    ad: "",
    soyad: "",
    email: "",
    telefon: "",
  });

  const fetchBilgiler = async () => {
    dispatch(setLoading({ isLoading: true, message: "yukleniyor..." }));
    try {
      const response = await api.get(`${BASE_URL}/api/v1/customer/profile`);
      const data = response.data;
      setFormData({
        ad: data.name,
        soyad: data.lastName,
        email: data.username,
        telefon: data.phoneNumber,
      });

      setInitialData({
        ad: data.name,
        soyad: data.lastName,
        email: data.username,
        telefon: data.phoneNumber,
      });
    } catch (error) {
      setTimeout(() => {
        dispatch(
          showAlertWithTimeoutKullanici({
            message: error.response.data,
            status: "error",
          })
        );
      }, 400);
    } finally {
      dispatch(clearLoading());
    }
  };

  useEffect(() => {
    fetchBilgiler();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitBilgiler = async (e) => {
    e.preventDefault();

    try {
      await api.put(`${BASE_URL}/api/v1/customer/profile`, {
        name: formData.ad,
        lastName: formData.soyad,
        phoneNumber: formData.telefon,
      });

      fetchBilgiler();
      dispatch(
        showAlertWithTimeoutKullanici({
          message: "Adres Güncellendi",
          status: "success",
        })
      );
    } catch (error) {
      dispatch(
        showAlertWithTimeoutKullanici({
          message: error.message,
          status: "error",
        })
      );
    }
  };

  if (isLoading) {
    return <BilgilerSkeleton />;
  }

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
            <button
              className={
                JSON.stringify(initialData) == JSON.stringify(formData)
                  ? "disabledButton"
                  : "normalButton"
              }
              disabled={JSON.stringify(initialData) == JSON.stringify(formData)}
              type="submit"
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
