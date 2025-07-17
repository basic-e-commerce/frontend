import CategoryCard from "../../components/CategoryCard/CategoryCard";
import "./Categories.scss";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/slices/categorySlice";
import { showAlertWithTimeoutKullanici } from "../../redux/slices/alertKullaniciSlice";
import Baslik from "../../components/baslik/Baslik";
import CategoriesSkeleton from "./CategoriesSkeleton";
import { setLoading } from "../../redux/slices/loadingSlice";

const Categories = () => {
  const { isLoading } = useSelector((state) => state.loading);
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchCategories = async () => {
      dispatch(setLoading({ isLoading: true }));
      try {
        await dispatch(getCategories()).unwrap();
      } catch (error) {
        dispatch(
          showAlertWithTimeoutKullanici({
            message: error.response.data,
            status: "error",
          })
        );
      } finally {
        dispatch(setLoading({ isLoading: false }));
      }
    };

    fetchCategories();
  }, [dispatch]);

  if (isLoading) {
    return <CategoriesSkeleton />;
  }

  return (
    <div className="categoriesPage">
      <div className="container">
        <Baslik
          title={"Ürün Kategorileri"}
          desc={"Lütfen bir kategori seçin!"}
        />
        <div className="categoryCardsContent">
          {categories?.map((item, index) => (
            <CategoryCard
              key={index}
              linkName={item.categoryLinkName}
              categoryName={item.categoryName}
              img={item.coverImage?.url || null}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Categories;
