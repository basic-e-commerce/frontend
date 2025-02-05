import CardItem from "./cardItem/CardItem";
import "./DoubleProduct.scss";
import peynir from "/images/anasayfa/peynir.jpg";
import tereyag from "/images/anasayfa/tereyag.png";

const DoubleProduct = () => {
  return (
    <div className="container">
      <div className="product-cards">
        <CardItem
          title={"Peynir Diyarı"}
          desc={"Peynirci Baba ile mükemmel bir peynir deneyimi"}
          buttonText={"Peynir Ürünlerimiz"}
          img={peynir}
        />
        <CardItem
          title={"Tereyağı Şöleni"}
          desc={"25 yıllık tecrübenin emekle buluştuğu tereyağı çeşitleri"}
          buttonText={"Tereyağı Ürünlerimiz"}
          img={tereyag}
        />
      </div>
    </div>
  );
};

export default DoubleProduct;
