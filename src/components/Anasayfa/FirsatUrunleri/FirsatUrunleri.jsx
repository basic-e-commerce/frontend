import TeamlisCard from "../teamListCard/TeamListCard";
import Baslik from "../../baslik/Baslik";
import "./FirsatUrunleri.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/slices/productSlice";

const FirsatUrunleri = () => {
  const { products, productsStatus } = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="firsatUrunleri">
      <div className="container">
        <div className="firsatContent">
          <Baslik title={"Fırsat Ürünleri"} desc={"Sizler için en iyisi"} />
          <ul className="ul">
            {products.map((product, index) => (
              <TeamlisCard key={index} product={product} />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default FirsatUrunleri;
