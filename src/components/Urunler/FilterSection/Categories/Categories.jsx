import { useDispatch, useSelector } from "react-redux";
import "./Categories.scss";
import { useEffect } from "react";
import {
  getCategories,
  setSelectedCategory,
} from "../../../../redux/slices/categorySlice";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <ul className="categories">
      {categories?.map((category, index) => (
        <li
          onClick={() => {
            dispatch(setSelectedCategory(category.id));
          }}
          className="categoryItem"
          key={index}
        >
          <button>{category.name}</button>
        </li>
      ))}
    </ul>
  );
};

export default Categories;
