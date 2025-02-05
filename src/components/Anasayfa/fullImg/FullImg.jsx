import Baslik from "../../baslik/Baslik";
import { Link } from "react-router-dom";
import "./FullImg.scss";

const FullImg = () => {
  return (
    <div className="fullImg">
      <div className="container">
        <div className="fullImgContent">
          <Baslik
            title={"Tüm Ürünlerimizi Keşfedin"}
            desc={"Her şey sizler için"}
          />
          <Link to={"/projeler"} className="btn-fullImg">
            Tüm Ürünlere Git
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FullImg;
