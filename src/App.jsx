import "./App.css";
import { Route, Routes } from "react-router-dom";
import Anasayfa from "./pages/Anasayfa/Anasayfa";
import Header from "./components/Header/Header";
import FooterTop from "./components/FooterTop/FooterTop";
import Footer from "./components/Footer/Footer";
import Urunler from "./pages/Urunler/Urunler";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import UrunDetay from "./pages/UrunDetay/UrunDetay";
import ScrollToTop from "./components/scrollTop/ScrollToTop";

function App() {
  return (
    <Provider store={store}>
      <Header />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Anasayfa />} />
        <Route path="/urunler" element={<Urunler />} />
        <Route path="/urunler/:id" element={<UrunDetay />} />
      </Routes>
      <FooterTop />
      <Footer />
    </Provider>
  );
}

export default App;
