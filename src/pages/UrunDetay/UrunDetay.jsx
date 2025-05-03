import { useEffect } from "react";
import "./UrunDetay.scss";
import SikSorulan from "../../components/Anasayfa/sikSorulan/SikSorulan";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail, getProducts } from "../../redux/slices/productSlice";
import Loading from "../../components/Loading/Loading";
import GalleryPriceDetail from "../../components/Urundetay/galleryPriceDetail/GalleryPriceDetail";
import ProjelerGlide from "../../components/Urundetay/urunDetayGlide/ProjelerGlide";
import Baslik from "../../components/baslik/Baslik";

const UrunDetay = () => {
  const { linkName } = useParams();
  const dispatch = useDispatch();
  const { products, productDetail, productsStatus, productDetailStatus } =
    useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProductDetail(linkName));
    dispatch(getProducts());
  }, [dispatch, linkName]);

  console.log(productDetail);

  return (
    <>
      {productDetailStatus == "SUCCESS" && productsStatus == "SUCCESS" ? (
        <div className="projeDetay">
          <GalleryPriceDetail productDetail={productDetail} />

          <div className="container">
            <div className="projectDetay">
              <h3>Ürün Detayları</h3>
              <div className="desc">
                <p>{productDetail.description}</p>
              </div>
            </div>
          </div>

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

          <SikSorulan />
        </div>
      ) : (
        <Loading />
      )}
    </>
  );
};

export default UrunDetay;
