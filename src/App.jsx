import "./App.css";
import { Route, Routes, useLocation } from "react-router-dom";
import Anasayfa from "./pages/Anasayfa/Anasayfa";
import Header from "./components/Header/Header";
import FooterTop from "./components/FooterTop/FooterTop";
import Footer from "./components/Footer/Footer";
import Urunler from "./pages/Urunler/Urunler";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import UrunDetay from "./pages/UrunDetay/UrunDetay";
import ScrollToTop from "./components/scrollTop/ScrollToTop";
import Sepet from "./pages/sepet/Sepet";
import Login from "./pages/login/Login";
import AdminDashboard from "./pages/Admin/adminDashboard/AdminDashboard";
import UrunEkle from "./pages/Admin/adminDashboard/urunler/urunEkle/UrunEkle";
import UrunList from "./pages/Admin/adminDashboard/urunler/urunList/UrunList";
import UrunDuzenle from "./pages/Admin/adminDashboard/urunler/urunDuzenle/UrunDuzenle";
import CategoryList from "./pages/Admin/adminDashboard/category/categoryList/CategoryList";
import CategoryCreate from "./pages/Admin/adminDashboard/category/categoryCreate/CategoryCreate";
import Istatistikler from "./pages/Admin/adminDashboard/istatistikler/Istatistikler";
import Profile from "./pages/profile/Profile";
import Bilgiler from "./pages/profile/Bilgiler/Bilgiler";

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <Provider store={store}>
      {!isAdminRoute && <Header />}
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Anasayfa />} />
        <Route path="/urunler" element={<Urunler />} />
        <Route path="/urunler/:id" element={<UrunDetay />} />
        <Route path="/sepet" element={<Sepet />} />
        <Route path="/login" element={<Login />} />

        <Route path="/admins" element={<AdminDashboard />}>
          <Route path="istatistik" element={<Istatistikler />} />
          <Route path="urunler" element={<UrunList />} />
          <Route path="urunekle" element={<UrunEkle />} />
          <Route path="urunler/:id" element={<UrunDuzenle />} />
          <Route path="kategoriler" element={<CategoryList />} />
          <Route path="kategoriekle" element={<CategoryCreate />} />
        </Route>
        <Route path="/profil" element={<Profile />}>
          <Route path="bilgiler" element={<Bilgiler />} />
        </Route>
      </Routes>
      {!isAdminRoute && <FooterTop />}
      {!isAdminRoute && <Footer />}
    </Provider>
  );
}

export default App;
