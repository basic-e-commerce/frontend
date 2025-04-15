import "./CategoryList.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../../../components/Pagination/Pagination";
import { getCategories } from "../../../../../redux/slices/categorySlice";
import {
  getProductsCategory,
  resetTheProducts,
} from "../../../../../redux/slices/productSlice";
import CategoryInProductTable from "./CategoryInProductTable";
import CategoryForm from "./CategoryForm";

const CategoryList = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  const { products, productStatus } = useSelector((state) => state.products);
  const [currentItems, setCurrentItems] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    dispatch(resetTheProducts());
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      dispatch(getProductsCategory(selectedCategory?.id));
    }
  }, [selectedCategory, categories, dispatch]);

  console.log(selectedCategory);

  return (
    <div className="categoryList">
      <div className="container">
        <div className="urunListContent">
          <CategoryForm
            categories={categories}
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />

          <CategoryInProductTable
            currentItems={currentItems}
            selectedCategory={selectedCategory}
          />

          {products && (
            <Pagination
              itemsPerPage={5}
              items={products}
              setCurrentItems={setCurrentItems}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
