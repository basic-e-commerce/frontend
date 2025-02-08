import { useEffect, useState } from "react";
import "./UrunDetay.scss";
import SikSorulan from "../../components/Anasayfa/sikSorulan/SikSorulan";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductDetail,
  productDetailCoverChange,
} from "../../redux/slices/productSlice";
import Loading from "../../components/Loading/Loading";
import GalleryPriceDetail from "../../components/Urundetay/galleryPriceDetail/GalleryPriceDetail";
import ProjelerGlide from "../../components/Urundetay/urunDetayGlide/ProjelerGlide";
import Baslik from "../../components/baslik/Baslik";

const UrunDetay = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetail, productDetailStatus } = useSelector(
    (state) => state.products
  );

  const [proje, setProje] = useState({
    images: [
      { filename: "/images/urundetay/urunler/1.jpg" },
      { filename: "/images/urundetay/urunler/2.jpg" },
      { filename: "/images/urundetay/urunler/3.jpg" },
      { filename: "/images/urundetay/urunler/4.jpg" },
      { filename: "/images/urundetay/urunler/5.jpg" },
    ],
  });

  const [digerProjeler, setProjeler] = useState([
    {
      id: 1,
      title: "Organik Tereyağ",
      eskiFiyat: "1000 TL",
      yeniFiyat: "800 TL",
      price: "15.000.000 TL",
      coverImage: "/images/anasayfa/tereyag.png",
    },
    {
      id: 2,
      title: "Örgü Peynir",
      eskiFiyat: "1000 TL",
      yeniFiyat: "800 TL",
      price: "7.500.000 TL",
      coverImage: "/images/anasayfa/peynir.jpg",
    },
    {
      id: 3,
      title: "Organik Bal",
      eskiFiyat: "1000 TL",
      yeniFiyat: "800 TL",
      price: "7.500.000 TL",
      coverImage: "/images/anasayfa/Bal.jpg",
    },
    {
      id: 1,
      title: "Organik Tereyağ",
      eskiFiyat: "1000 TL",
      yeniFiyat: "800 TL",
      price: "15.000.000 TL",
      coverImage: "/images/anasayfa/tereyag.png",
    },
    {
      id: 2,
      title: "Örgü Peynir",
      eskiFiyat: "1000 TL",
      yeniFiyat: "800 TL",
      price: "7.500.000 TL",
      coverImage: "/images/anasayfa/peynir.jpg",
    },
    {
      id: 3,
      title: "Organik Bal",
      eskiFiyat: "1000 TL",
      yeniFiyat: "800 TL",
      price: "7.500.000 TL",
      coverImage: "/images/anasayfa/Bal.jpg",
    },
    {
      id: 1,
      title: "Organik Tereyağ",
      eskiFiyat: "1000 TL",
      yeniFiyat: "800 TL",
      price: "15.000.000 TL",
      coverImage: "/images/anasayfa/tereyag.png",
    },
    {
      id: 2,
      title: "Örgü Peynir",
      eskiFiyat: "1000 TL",
      yeniFiyat: "800 TL",
      price: "7.500.000 TL",
      coverImage: "/images/anasayfa/peynir.jpg",
    },
  ]);

  useEffect(() => {
    dispatch(getProductDetail(id));
  }, [dispatch, id]);

  useEffect(() => {
    dispatch(productDetailCoverChange(productDetail?.image));
  }, [productDetail]);

  console.log(productDetail);

  return (
    <>
      {productDetailStatus == "LOADING" ? (
        <Loading />
      ) : (
        <div className="projeDetay">
          <GalleryPriceDetail proje={proje} />

          <div className="container">
            <div className="projectDetay">
              <h3>Ürün Detayları</h3>
              <div className="desc">
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Ratione reiciendis hic voluptatum architecto. Laudantium enim
                  officiis culpa ullam maxime fuga reiciendis autem quam error
                  nobis odio sed quos a.
                </p>
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
                projeler={digerProjeler}
              />
            </div>
          </div>

          <SikSorulan />
        </div>
      )}
    </>
  );
};

export default UrunDetay;
