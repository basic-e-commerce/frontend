import { useEffect } from "react";
import "./UrunDetay.scss";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail, getProducts } from "../../redux/slices/productSlice";
import GalleryPriceDetail from "../../components/Urundetay/galleryPriceDetail/GalleryPriceDetail";
import ProjelerGlide from "../../components/Urundetay/urunDetayGlide/ProjelerGlide";
import Baslik from "../../components/baslik/Baslik";
import UrunDetaySkeleton from "./UrunDetaySkeleton";
import { clearLoading, setLoading } from "../../redux/slices/loadingSlice";
import { showAlertWithTimeoutKullanici } from "../../redux/slices/alertKullaniciSlice";
import SikcaSorulan from "../../components/sikcaSorulan/SikcaSorulan";

const UrunDetay = () => {
  const { productLinkName } = useParams();
  const dispatch = useDispatch();
  const { products, productDetail, productsStatus, productDetailStatus } =
    useSelector((state) => state.products);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(
        setLoading({ isLoading: true, message: "Urun Detay Yukleniyor" })
      );
      try {
        await dispatch(getProductDetail(productLinkName)).unwrap();
        await dispatch(getProducts()).unwrap();
      } catch (error) {
        setTimeout(() => {
          dispatch(
            showAlertWithTimeoutKullanici({
              message: error.response.data,
              status: "error",
            })
          );
        }, 400);
      } finally {
        dispatch(clearLoading());
      }
    };

    fetchData();
  }, [dispatch, productLinkName]);

  return (
    <>
      {productDetailStatus == "SUCCESS" && productsStatus == "SUCCESS" ? (
        <div className="projeDetay">
          <GalleryPriceDetail productDetail={productDetail} />

          <div className="digerUrunler">
            <div className="container">
              <Baslik
                title={"Diger urunler"}
                desc={"Sizler İçin En İyisi burada diyebiliriz"}
              />

              <ProjelerGlide
                key={window.location.pathname}
                perView={4}
                products={products}
              />
            </div>
          </div>

          <SikcaSorulan />
        </div>
      ) : (
        <UrunDetaySkeleton />
      )}
    </>
  );
};

export default UrunDetay;
