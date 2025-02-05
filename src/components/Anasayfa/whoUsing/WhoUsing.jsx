import Acardion from "./acardion/Acardion";
import Baslik from "../../baslik/Baslik";
import "./WhoUsing.scss";

const WhoUsing = () => {
  return (
    <div className="whoUsing">
      <div className="container">
        <div className="content">
          <Acardion />
          <div className="left">
            <Baslik title={"Favori Ürünlerimiz"} desc={"En Sevilenler"} />
            <p>
              Peynir harmanımız, yöresel ve kaliteli ürünlerin özenle bir araya
              getirilmesiyle hazırlanıyor. Kahvaltınıza ya da atıştırmalık
              sofralarınıza benzersiz bir lezzet katıyor.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhoUsing;
