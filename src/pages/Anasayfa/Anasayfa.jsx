import "./Anasayfa.scss";
import FullImg from "../../components/Anasayfa/fullImg/FullImg";
import { useEffect } from "react";
import { getProducts } from "../../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { showAlertWithTimeoutKullanici } from "../../redux/slices/alertKullaniciSlice";
import { setLoading } from "../../redux/slices/loadingSlice";
import WhoFounder from "../../components/whoFounder/WhoFounder";
import WhyOur from "../../components/whyOur/WhyOur";
import SliderLeft from "../../components/sliderLeft/SliderLeft";
import FadeInSection from "../../components/FadeInSection/FadeInSection";
import AnaProduct from "../../components/anaProduct/AnaProduct";
import SikcaSorulan from "../../components/sikcaSorulan/SikcaSorulan";
import PopulerProduct from "../../components/populerProduct/PopulerProduct";
import Slider from "../../components/Slider/Slider";
import AnasayfaSkeleton from "./AnasayfaSkeleton";

const Anasayfa = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const isLoading = useSelector((state) => state.loading.isLoading);

  const sections2 = [
    <PopulerProduct
      key="populer-product"
      title={"Ürünlerimiz"}
      desc={"Ürünlerimiz sayfasına göz atın"}
      products={products}
    />,
    <WhoFounder key="who-founder" />,
    <WhyOur key="why-our" loading={isLoading} />,
  ];

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

  if (isLoading) {
    return <AnasayfaSkeleton />;
  }

  return (
    <div className="anasayfa">
      <div className="topSideAnasayfa">
        <div className="container">
          <div className="topSideAnasayfaContent">
            <Slider loading={isLoading} />
            <SliderLeft />
          </div>
        </div>
      </div>

      <FadeInSection>
        <AnaProduct />
      </FadeInSection>

      <FullImg />

      {sections2.map((Section, index) => (
        <FadeInSection key={index}>{Section}</FadeInSection>
      ))}

      <div className="slider">
        <div className="slider-track">
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index} className="slide">
              <img
                src={`/images/karePost/${index + 1}.jpeg`}
                alt={"detay peyzaj"}
              />
            </div>
          ))}
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index} className="slide">
              <img
                src={`/images/karePost/${index + 1}.jpeg`}
                alt={"detay peyzaj"}
              />
            </div>
          ))}
          {Array.from({ length: 8 }, (_, index) => (
            <div key={index} className="slide">
              <img
                src={`/images/karePost/${index + 1}.jpeg`}
                alt={"detay peyzaj"}
              />
            </div>
          ))}
        </div>
      </div>

      <SikcaSorulan />
    </div>
  );
};

export default Anasayfa;
