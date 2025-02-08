import { useSelector } from "react-redux";
import MrGlide from "../urunDetayGlide/MrGlide";
import "./GalleryPriceDetail.scss";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import NameAndMarka from "../nameAndMarka/NameAndMarka";
import RatingAndCode from "../ratingAndCode/RatingAndCode";
import FiyatActions from "../fiyatActions/FiyatActions";

const GalleryPriceDetail = ({ proje }) => {
  const { productDetailCover } = useSelector((state) => state.products);

  return (
    <div className="container">
      <div className="mainSectionSide">
        <div className="product-gallery">
          <div className="single-img">
            <img src={productDetailCover} alt="Selected Product" />
          </div>

          <div className="product-thump">
            <MrGlide images={proje.images} />
          </div>
        </div>

        <div className="rightActionSide">
          <NameAndMarka
            marka={"Sütaş"}
            name={"Yöre Çanakkale Klasik Tam Yağlı Orta Sert İnek Beyaz Peynir"}
          />

          <RatingAndCode rating={"4"} comments={"3"} code={"302024"} />

          <FiyatActions
            birim={"Adet"}
            fiyat={"400,00"}
            indirimliFiyat={"360,75"}
          />

          <div className="whatsappSiparis">
            <WhatsAppIcon className="icon" />
            <div className="right">
              <div className="text">
                <h3>WhatsApp Sipariş Hattı</h3>
                <p>
                  WhatsApp üzerinden sipariş için <span>buraya</span> tıklayın
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GalleryPriceDetail;
