import "./Anasayfa.scss";
import BestTeam from "../../components/Anasayfa/bestTeam/BestTeam";
import SikSorulan from "../../components/Anasayfa/sikSorulan/SikSorulan";
import FullImg from "../../components/Anasayfa/fullImg/FullImg";
import Slider from "../../components/Anasayfa/slider/Slider";
import DoubleProduct from "../../components/Anasayfa/doubleProduct/DoubleProduct";
import FirsatUrunleri from "../../components/Anasayfa/FirsatUrunleri/FirsatUrunleri";
import WhoUsing from "../../components/Anasayfa/whoUsing/WhoUsing";

const Anasayfa = () => {
  return (
    <div className="anasayfa">
      <Slider />
      <DoubleProduct />
      <BestTeam />
      <FullImg />
      <FirsatUrunleri />
      <WhoUsing />
      <SikSorulan />
    </div>
  );
};

export default Anasayfa;
