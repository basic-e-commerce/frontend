import { useDispatch, useSelector } from "react-redux";
import Sorting from "../Sorting/Sorting";
import "./UrunlerSection.scss";
import { useEffect, useState } from "react";
import {
  getProducts,
  getProductsCategory,
} from "../../../redux/slices/productSlice";
import Loading from "../../Loading/Loading";
import TeamlisCard from "../../Anasayfa/teamListCard/TeamListCard";
import Pagination from "../../Pagination/Pagination";

const UrunlerSection = () => {
  const dispatch = useDispatch();
  const { products, productsStatus } = useSelector((state) => state.products);
  const { selectedCategory } = useSelector((state) => state.categories);
  const [currentItems, setCurrentItems] = useState([]);

  console.log(selectedCategory);

  useEffect(() => {
    if (selectedCategory == null) {
      dispatch(getProducts());
    } else {
      dispatch(getProductsCategory(selectedCategory.id));
    }
  }, [dispatch, selectedCategory]);

  return (
    <div className="urunlerSection">
      <div className="title">
        <div className="titleTop">
          <h3 style={{ fontSize: "1.2rem", padding: "0.5rem" }}>
            {selectedCategory == null
              ? "Tüm Ürünler"
              : selectedCategory.categoryName}
          </h3>
          <Sorting />
        </div>

        <hr />
      </div>

      {productsStatus == "LOADING" ? (
        <Loading />
      ) : (
        <>
          <ul className="urunlerMap">
            {currentItems?.map((product, index) => (
              <TeamlisCard key={index} product={product} />
            ))}
          </ul>

          <Pagination
            itemsPerPage={6}
            items={products}
            setCurrentItems={setCurrentItems}
          />
        </>
      )}
    </div>
  );
};

export default UrunlerSection;
