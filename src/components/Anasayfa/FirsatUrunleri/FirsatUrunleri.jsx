import TeamlisCard from "../teamListCard/TeamListCard";
import Baslik from "../../baslik/Baslik";
import "./FirsatUrunleri.scss";

const FirsatUrunleri = ({ products }) => {
  return (
    <div className="firsatUrunleri">
      <div className="container">
        <div className="firsatContent">
          <Baslik title={"Fırsat Ürünleri"} desc={"Sizler için en iyisi"} />
          <ul className="ul">
            {products?.map((product, index) => (
              <TeamlisCard key={index} product={product} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FirsatUrunleri;
