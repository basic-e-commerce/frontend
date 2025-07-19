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
import { useEffect } from "react";
import { setLogin, setLogout } from "./redux/slices/authSlice";
import api from "./api/api";
import ProtectedRoute from "./context/ProtectedRoute";
import SiparisAlindi from "./pages/SiparisAlindi/SiparisAlindi";
import Categories from "./pages/Categories/Categories";
import CategoryForm from "./pages/Admin/adminDashboard/category/categoryList/CategoryForm";
import UrunList from "./pages/Admin/adminDashboard/urunler/UrunList/UrunList";
import CustomerLogin from "./pages/customerLogin/CustomerLogin";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");
  const dispatch = useDispatch();
  const { accessToken } = useSelector((state) => state.authSlice);

  useEffect(() => {
    const silentLogin = async () => {
      try {
        const response = await api.post(
          "/api/v1/auth/refresh",
          {},
          { withCredentials: true }
        );
        const data = response.data;
        dispatch(setLogin(data));
      } catch (err) {
        console.log("Session expired or user not logged in", err);
        dispatch(setLogout());
      }
    };

    if (!accessToken) {
      silentLogin();
    }
  }, [dispatch, accessToken]);

  return (
    <>
      <Header />
      <ScrollToTop />

      <Routes>
        <Route path="/" element={<Anasayfa />} />
        <Route path="/kategoriler" element={<Categories />} />
        <Route path="/kategoriler/:categoryLinkName" element={<Urunler />} />
        <Route path="/urunler/:productLinkName" element={<UrunDetay />} />
        <Route path="/sepet" element={<Sepet />} />
        <Route path="/customerlogin" element={<Login />} />
        <Route path="/customerregister" element={<CustomerLogin />} />
        <Route path="/adminlogin" element={<AdminLogin />} />
        <Route path="/siparis" element={<SiparisOlustur />} />
        <Route path="/success-payment" element={<SiparisAlindi />} />

        <Route
          path="/admins"
          element={
            <ProtectedRoute redirectTo="/adminlogin" allowedRoles={["ADMIN"]}>
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
          <Route path="siparisler" element={<Siparisler />} />
          <Route path="ayarlar" element={<Ayarlar />} />
        </Route>

        {/* Protected Kullanıcı Alanları */}

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
      </Routes>

      {!isAdminRoute && <FooterTop />}
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
