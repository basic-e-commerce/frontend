import "./CategoryList.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getCategories } from "../../../../../redux/slices/categorySlice";
import CategoryForm from "./CategoryForm";

const CategoryList = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <div className="categoryList">
      <div className="container">
        <div className="urunListContent">
          <CategoryForm />
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
