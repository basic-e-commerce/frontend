import { useEffect, useState } from "react";
import Baslik from "../../baslik/Baslik";
import ProjelerGlide from "../../ProjerlerGlide/ProjelerGlide";
import "./BestTeam.scss";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../redux/slices/productSlice";
import Loading from "../../Loading/Loading";

const BestTeam = () => {
  const dispatch = useDispatch();
  const { products, productsStatus } = useSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="bestTeam">
      <div className="container">
        <div className="content">
          <div className="left">
            <Baslik title="En çok satanlar" desc="İmalattan Sofranıza" />
          </div>

          <div className="TeamlistCards">
            {productsStatus === "LOADING" ? (
              <Loading />
            ) : (
              <ProjelerGlide
                key={window.location.pathname}
                perView={3}
                products={products}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BestTeam;
