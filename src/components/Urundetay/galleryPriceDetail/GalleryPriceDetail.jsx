import { useSelector } from "react-redux";
import MrGlide from "../urunDetayGlide/MrGlide";
import "./GalleryPriceDetail.scss";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import NameAndMarka from "../nameAndMarka/NameAndMarka";
import FiyatActions from "../fiyatActions/FiyatActions";

const GalleryPriceDetail = ({ productDetail, phoneNo, name }) => {
  const { productDetailCover } = useSelector((state) => state.products);

  return (
    <div className="container">
      <div className="mainSectionSide">
        <div className="product-gallery">
          <div className="single-img">
            <img src={productDetailCover} alt="Selected Product" />
          </div>

          <div className="product-thump">
            <MrGlide images={productDetail.productImage} />
          </div>
        </div>

        <div className="rightActionSide">
          <NameAndMarka
            marka={name || ""}
            stokKodu={productDetail.id}
            name={productDetail.name}
            desc={productDetail.description}
          />

          {/*    <RatingAndCode rating={"4"} comments={"3"} code={"302024"} /> */}
          <FiyatActions
            id={productDetail.id}
            birim={"Adet"}
            fiyat={productDetail.salePrice}
            indirimliFiyat={productDetail.comparePrice}
            quantity={productDetail.quantity}
          />

          <a
            href={`https://wa.me/${phoneNo || ""}`}
            target="_blank"
            className="whatsappSiparis"
          >
            <WhatsAppIcon className="icon" />
            <div className="right">
              <div className="text">
                <h3>WhatsApp Sipariş Hattı</h3>
                <p>
                  WhatsApp üzerinden sipariş için <span>buraya</span> tıklayın
                </p>
              </div>
            </div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default GalleryPriceDetail;
