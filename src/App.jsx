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

        <Route path="/admin" element={<AdminDashboard />}>
          <Route path="urunler" element={<UrunList />} />
          <Route path="ekle" element={<UrunEkle />} />
          <Route path="duzenle" element={<UrunDuzenle />} />
        </Route>
      </Routes>
      {!isAdminRoute && <FooterTop />}
      {!isAdminRoute && <Footer />}
    </Provider>
  );
}

export default App;
