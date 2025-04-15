import "./Anasayfa.scss";
import BestTeam from "../../components/Anasayfa/bestTeam/BestTeam";
import SikSorulan from "../../components/Anasayfa/sikSorulan/SikSorulan";
import FullImg from "../../components/Anasayfa/fullImg/FullImg";
import Slider from "../../components/Anasayfa/slider/Slider";
import DoubleProduct from "../../components/Anasayfa/doubleProduct/DoubleProduct";
import FirsatUrunleri from "../../components/Anasayfa/FirsatUrunleri/FirsatUrunleri";
import WhoUsing from "../../components/Anasayfa/whoUsing/WhoUsing";
import { useSelector } from "react-redux";

const Anasayfa = () => {
  const { accessToken } = useSelector((state) => state.authSlice);
  console.log("a:" + accessToken);

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
