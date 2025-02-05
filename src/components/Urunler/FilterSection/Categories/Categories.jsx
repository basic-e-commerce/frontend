import { useDispatch, useSelector } from "react-redux";
import "./Categories.scss";
import { useEffect } from "react";
import { getCategories } from "../../../../redux/slices/categorySlice";

const Categories = () => {
  const dispatch = useDispatch();
  const { categories } = useSelector((state) => state.categories);
  console.log(categories);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  return (
    <ul className="categories">
      {categories?.map((categoryName, index) => (
        <li className="categoryItem" key={index}>
          <button>{categoryName.name}</button>
        </li>
      ))}
    </ul>
  );
};

export default Categories;
