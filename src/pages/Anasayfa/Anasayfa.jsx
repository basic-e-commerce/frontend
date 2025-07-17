import "./Anasayfa.scss";
import BestTeam from "../../components/Anasayfa/bestTeam/BestTeam";
import SikSorulan from "../../components/Anasayfa/sikSorulan/SikSorulan";
import FullImg from "../../components/Anasayfa/fullImg/FullImg";
import Slider from "../../components/Anasayfa/slider/Slider";
import DoubleProduct from "../../components/Anasayfa/doubleProduct/DoubleProduct";
import FirsatUrunleri from "../../components/Anasayfa/FirsatUrunleri/FirsatUrunleri";
import WhoUsing from "../../components/Anasayfa/whoUsing/WhoUsing";
import { useEffect } from "react";
import { getProducts } from "../../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { showAlertWithTimeoutKullanici } from "../../redux/slices/alertKullaniciSlice";
import { setLoading } from "../../redux/slices/loadingSlice";
import SliderSkeleton from "../../components/Anasayfa/slider/SliderSkeleton";
import DoubleProductSkeleton from "../../components/Anasayfa/doubleProduct/DoubleProductSkeleton";
import BestTeamSkeleton from "../../components/Anasayfa/bestTeam/BestTeamSkeleton";
import FullImgSkeleton from "../../components/Anasayfa/fullImg/FullImgSkeleton";
import FirsatUrunleriSkeleton from "../../components/Anasayfa/FirsatUrunleri/FirsatUrunleriSkeleton";
import WhoUsingSkeleton from "../../components/Anasayfa/whoUsing/WhoUsingSkeleton";
import SikSorulanSkeleton from "../../components/Anasayfa/sikSorulan/SikSorulanSkeleton";

const Anasayfa = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const isLoading = useSelector((state) => state.loading.isLoading);

  useEffect(() => {
    const getProductsAnasayfa = async () => {
      dispatch(setLoading({ isLoading: true }));
      try {
        await dispatch(getProducts()).unwrap();
      } catch (error) {
        dispatch(
          showAlertWithTimeoutKullanici({
            message: error.response.data,
            status: "error",
          })
        );
      } finally {
        dispatch(setLoading({ isLoading: false }));
      }
    };

    getProductsAnasayfa();
  }, [dispatch]);

  return (
    <div className="anasayfa">
      {isLoading ? (
        <>
          <SliderSkeleton />
          <DoubleProductSkeleton />
          <BestTeamSkeleton />
          <FullImgSkeleton />
          <FirsatUrunleriSkeleton />
          <WhoUsingSkeleton />
          <SikSorulanSkeleton />
        </>
      ) : (
        <>
          <Slider />
          <DoubleProduct />
          <BestTeam products={products} />
          <FullImg />
          <FirsatUrunleri products={products} />
          <WhoUsing />
          <SikSorulan />
        </>
      )}
    </div>
  );
};

export default Anasayfa;
