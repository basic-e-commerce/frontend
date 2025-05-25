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
  const { selectedCategory } = useSelector((state) => state.categories);

  console.log(categories);
  console.log(selectedCategory);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <ul className="categories">
      {categories?.map((category, index) => (
        <li
          onClick={() => {
            dispatch(setSelectedCategory(category));
          }}
          className={
            category.categoryLinkName == selectedCategory?.categoryLinkName
              ? "categoryItem selected"
              : "categoryItem"
          }
          key={index}
        >
          <button>{category.categoryName}</button>
        </li>
      ))}
    </ul>
  );
};

export default Categories;
