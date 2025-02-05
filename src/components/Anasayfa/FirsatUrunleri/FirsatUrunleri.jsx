import TeamlisCard from "../teamListCard/TeamListCard";
import Baslik from "../../baslik/Baslik";
import "./FirsatUrunleri.scss";
import { useState } from "react";

const FirsatUrunleri = () => {
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
  
  return (
    <div className="firsatUrunleri">
      <div className="container">
        <div className="firsatContent">
          <Baslik title={"Fırsat Ürünleri"} desc={"Sizler için en iyisi"} />
          <ul className="ul">
            {projeler.map((proje, index) => (
              <TeamlisCard key={index} proje={proje} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FirsatUrunleri;
