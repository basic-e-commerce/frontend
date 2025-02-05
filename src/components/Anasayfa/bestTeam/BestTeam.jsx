import { useState } from "react";
import Baslik from "../../baslik/Baslik";
import ProjelerGlide from "../../ProjerlerGlide/ProjelerGlide";
import "./BestTeam.scss";

const BestTeam = () => {
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
    <div className="bestTeam">
      <div className="container">
        <div className="content">
          <div className="left">
            <Baslik title="En çok satanlar" desc="İmalattan Sofranıza" />
          </div>

          <div className="TeamlistCards">
            <ProjelerGlide
              key={window.location.pathname}
              perView={3}
              projeler={projeler}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestTeam;
