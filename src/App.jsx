import "./App.scss";
import { Route, Routes, useLocation } from "react-router-dom";
import Anasayfa from "./pages/Anasayfa/Anasayfa";
import Header from "./components/Header/Header";
import FooterTop from "./components/FooterTop/FooterTop";
import Footer from "./components/Footer/Footer";
import Urunler from "./pages/Urunler/Urunler";
import { useDispatch, useSelector } from "react-redux";
import UrunDetay from "./pages/UrunDetay/UrunDetay";
import ScrollToTop from "./components/scrollTop/ScrollToTop";
import Sepet from "./pages/sepet/Sepet";
import Login from "./pages/login/Login";
import AdminDashboard from "./pages/Admin/adminDashboard/AdminDashboard";
import UrunEkle from "./pages/Admin/adminDashboard/urunler/urunEkle/UrunEkle";
import CookiePopup from "./components/CookiePopup/CookiePopup";

import UrunDuzenle from "./pages/Admin/adminDashboard/urunler/urunDuzenle/UrunDuzenle";
import CategoryCreate from "./pages/Admin/adminDashboard/category/categoryCreate/CategoryCreate";
import Profile from "./pages/profile/Profile";
import Bilgiler from "./pages/profile/Bilgiler/Bilgiler";
import SifreDegistir from "./pages/profile/SifreDegistir/SifreDegistir";
import Siparisler from "./pages/Admin/adminDashboard/siparisler/Siparisler";
import Ayarlar from "./pages/Admin/adminDashboard/ayarlar/Ayarlar";
import SiparisOlustur from "./pages/siparisOlustur/SiparisOlustur";
import KisiAdresleri from "./pages/profile/kisiAdresleri/KisiAdresleri";
import SiparisMusteri from "./pages/profile/siparis/SiparisMusteri";
import Dashboard from "./pages/Admin/adminDashboard/Dashboard/Dashboard";
import AdminLogin from "./pages/Admin/adminLogin/AdminLogin";
import { useEffect, useState } from "react";
import { setLogin, setLogout } from "./redux/slices/authSlice";
import api from "./api/api";
import ProtectedRoute from "./context/ProtectedRoute";
import SiparisAlindi from "./pages/SiparisAlindi/SiparisAlindi";
import Categories from "./pages/Categories/Categories";
import CategoryForm from "./pages/Admin/adminDashboard/category/categoryList/CategoryForm";
import UrunList from "./pages/Admin/adminDashboard/urunler/UrunList/UrunList";
import CustomerLogin from "./pages/customerLogin/CustomerLogin";
import CuponCreate from "./pages/Admin/adminDashboard/Cupon/cuponCreate/CuponCreate";
import CuponList from "./pages/Admin/adminDashboard/Cupon/cuponList/CuponList";
import SiparisRed from "./pages/SiparisAlindi/SiparisRed";
import axios from "axios";
import { BASE_URL } from "./config/baseApi";
import GizlilikPolitikasi from "./pages/Politikalar/GizlilikPolitikasi";
import MesafeliSatisSozlesmesi from "./pages/Politikalar/MesafeliSatisSozlesmesi";
import OnBilgilendirmeFormu from "./pages/Politikalar/OnBilgilendirmeFormu";
import IadeIptalPolitikasi from "./pages/Politikalar/IadeIptalPolitikasi";
import KvkkAydinlatmaMetni from "./pages/Politikalar/KvkkAydinlatmaMetni";
import CookiePolicy from "./pages/Politikalar/CookiePolicy";
import Iletisim from "./pages/iletisim/Iletisim";
import KargoAdres from "./pages/Admin/adminDashboard/kargoAdres/KargoAdres";
import AnlasmaCargo from "./pages/Admin/adminDashboard/anlasmalıKargo/AnlasmaCargo";
import User from "./pages/Admin/adminDashboard/User/User";
import EpostaOnaylandi from "./pages/kullaniciActionPages/EpostaOnaylandi";
import EpostaRed from "./pages/kullaniciActionPages/EpostaRed";
import SifremiUnuttum from "./pages/sifreUnuttum/SifremiUnuttum";
import SifreYenileme from "./pages/sifreyenileme/SifreYenileme";
import SiparisSorgu from "./pages/siparisSorgu/SiparisSorgu";
import FirmaBilgileri from "./pages/FirmaBilgileri/FirmaBilgileri";
import MeslekKurallari from "./pages/Politikalar/MeslekKurallari";
import ProfileNav from "./pages/profileNav/ProfileNav";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const isAdminPanel = location.pathname.startsWith("/admins");
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.authSlice);
  const [contactData, setContactData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initializeApp = async () => {
      try {
        const silentLogin = async () => {
          try {
            const response = await api.post(
              `${BASE_URL}/api/v1/auth/refresh`,
              {},
              { withCredentials: true }
            );
            const data = response.data;
            dispatch(setLogin(data));
          } catch (error) {
            console.log(error);
            dispatch(setLogout());
          }
        };

        const visitor = async () => {
          try {
            await axios.post(`${BASE_URL}/api/v1/visitors/visit`);
          } catch (error) {
            console.log(error);
          }
        };

        const contact = async () => {
          try {
            const response = await axios.get(
              `${BASE_URL}/api/v1/merchant/public-detail`
            );
            setContactData(response.data);
          } catch (error) {
            console.log(error);
          }
        };

        if (!accessToken) {
          await Promise.all([silentLogin(), visitor(), contact()]);
        }
      } finally {
        setIsLoading(false);
      }
    };

    initializeApp();
  }, [dispatch, accessToken]);

  if (isLoading) {
    return <div>Yükleniyor</div>;
  }

  return (
    <>
      <CookiePopup />
      {!isAdminPanel && <Header />}
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Anasayfa />} />
        <Route path="/kategoriler" element={<Categories />} />
        <Route path="/kategoriler/:categoryLinkName" element={<Urunler />} />
        <Route
          path="/urunler/:productLinkName"
          element={
            <UrunDetay
              name={contactData?.name}
              phoneNo={contactData?.phoneNo}
            />
          }
        />
        <Route
          path="/sepet"
          element={<Sepet minOrderAmount={contactData?.minOrderAmount} />}
        />
        <Route path="/customerlogin" element={<Login />} />
        <Route path="/customerregister" element={<CustomerLogin />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="/siparis"
          element={
            <SiparisOlustur minOrderAmount={contactData?.minOrderAmount} />
          }
        />
        <Route path="/success-payment" element={<SiparisAlindi />} />
        <Route path="/fail-payment" element={<SiparisRed />} />
        <Route path="/account-verified" element={<EpostaOnaylandi />} />
        <Route path="/account-not-verified" element={<EpostaRed />} />
        <Route path="/sifremi-unuttum" element={<SifremiUnuttum />} />
        <Route path="/password-reset" element={<SifreYenileme />} />
        <Route path="/siparis-sorgula" element={<SiparisSorgu />} />

        <Route
          path="/iletisim"
          element={<Iletisim contactData={contactData} />}
        />
        <Route path="/gizlilik-politikasi" element={<GizlilikPolitikasi />} />
        <Route
          path="/mesafeli-satis-sozlesmesi"
          element={<MesafeliSatisSozlesmesi />}
        />
        <Route
          path="/on-bilgilendirme-formu"
          element={<OnBilgilendirmeFormu />}
        />
        <Route
          path="/iade-ve-iptal-politikasi"
          element={<IadeIptalPolitikasi />}
        />
        <Route
          path="/kvkk-aydinlatma-metni"
          element={<KvkkAydinlatmaMetni />}
        />

        <Route path="/cerez-politikasi" element={<CookiePolicy />} />
        <Route path="/firma-bilgileri" element={<FirmaBilgileri />} />
        <Route path="/meslek-kurallari" element={<MeslekKurallari />} />

        <Route
          path="/admins"
          element={
            <ProtectedRoute redirectTo="/admin-login" allowedRoles={["ADMIN"]}>
              <AdminDashboard />
            </ProtectedRoute>
          }
        >
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="urunler" element={<UrunList />} />
          <Route path="urunekle" element={<UrunEkle />} />
          <Route path="urunler/:productLinkName" element={<UrunDuzenle />} />
          <Route path="kategoriler" element={<CategoryForm />} />
          <Route path="kategoriekle" element={<CategoryCreate />} />
          <Route path="kuponekle" element={<CuponCreate />} />
          <Route path="kuponlistele" element={<CuponList />} />

          <Route path="siparisler" element={<Siparisler />} />
          <Route path="ayarlar" element={<Ayarlar />} />
          <Route path="kargo-adresleri" element={<KargoAdres />} />
          <Route path="anlasma-cargo" element={<AnlasmaCargo />} />
          <Route path="kullanicilar" element={<User />} />
        </Route>

        <Route
          path="/profil"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        >
          <Route path="bilgiler" element={<Bilgiler />} />
          <Route path="adreslerim" element={<KisiAdresleri />} />
          <Route path="sifredegistir" element={<SifreDegistir />} />
          <Route path="siparislerim" element={<SiparisMusteri />} />
        </Route>

        <Route
          path="/profile-yonlendir"
          element={
            <ProtectedRoute allowedRoles={["CUSTOMER"]}>
              <ProfileNav />
            </ProtectedRoute>
          }
        />
      </Routes>

      {!isAdminRoute && <FooterTop contactData={contactData} />}
      {!isAdminRoute && <Footer contactData={contactData} />}
    </>
  );
}

export default App;
