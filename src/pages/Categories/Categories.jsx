import CategoryCard from "../../components/CategoryCard/CategoryCard";
import "./Categories.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../redux/slices/categorySlice";
import { showAlertWithTimeoutKullanici } from "../../redux/slices/alertKullaniciSlice";
import Baslik from "../../components/baslik/Baslik";
import Loading from "../../components/Loading/Loading";

const Categories = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { categories } = useSelector((state) => state.categories);
  const dispatch = useDispatch();

  console.log(categories);

  useEffect(() => {
    const fetchCategories = async () => {
      setIsLoading(true);
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
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [dispatch]);

  if (isLoading) {
    return <Loading />;
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
