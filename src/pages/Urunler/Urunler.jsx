import FilterSection from "../../components/Urunler/FilterSection/FilterSection";
import UrunlerSection from "../../components/Urunler/urunlerSection/UrunlerSection";
import "./Urunler.scss";

const Urunler = () => {
  return (
    <div className="urunler">
      <div className="container">
        <FilterSection />
        <UrunlerSection />
      </div>
    </div>
  );
};

export default Urunler;
