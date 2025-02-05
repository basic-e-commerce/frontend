import { useDispatch, useSelector } from "react-redux";
import Sorting from "../Sorting/Sorting";
import "./UrunlerSection.scss";
import { useEffect, useState } from "react";
import { getProducts } from "../../../redux/slices/productSlice";
import Loading from "../../Loading/Loading";
import TeamlisCard from "../../Anasayfa/teamListCard/TeamListCard";
const UrunlerSection = () => {
  const dispatch = useDispatch();
  const { products, productsStatus } = useSelector((state) => state.products);
  const [projeler, setProjeler] = useState([
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
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="urunlerSection">
      <div className="title">
        <h3 style={{ fontSize: "1.2rem" }}>Ürünler</h3>
        <hr />
      </div>
      <Sorting />
      {productsStatus == "LOADING" ? (
        <Loading />
      ) : (
        <ul className="urunlerMap">
          {products?.map((product, index) => (
            <TeamlisCard proje={product} />
          ))}
        </ul>
      )}
    </div>
  );
};

export default UrunlerSection;
