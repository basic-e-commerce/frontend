import "./Urunler.scss";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import CategoryName from "../../components/categoryName/CategoryName";
import SideBar from "../../components/urunler/sidebar/SideBar";
import List from "../../components/urunler/list/List";
import Pagination from "../../components/Pagination/Pagination";
import { useDispatch, useSelector } from "react-redux";
import { getProductsCategoryLinkNameUser } from "../../redux/slices/productSlice";
import {
  getCategories,
  getCategoryByCategoryLinkName,
} from "../../redux/slices/categorySlice";
import Loading from "../../components/Loading/Loading";

const Urunler = () => {
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);
  const [currentItems, setCurrentItems] = useState([]);
  const { categoryLinkName } = useParams();
  const { products, productsStatus } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const [products, categories, category] = await Promise.all([
          dispatch(getProductsCategoryLinkNameUser(categoryLinkName)).unwrap(),
          dispatch(getCategories()).unwrap(),
          dispatch(getCategoryByCategoryLinkName(categoryLinkName)).unwrap(),
        ]);

        setSelectedCategory(category);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [dispatch, categoryLinkName]);

  if (isLoading) {
    return <Loading />;
  }

  console.log(selectedCategory);

  return (
    <div className="projeler">
      <CategoryName
        title={selectedCategory?.name}
        img={selectedCategory?.coverImage?.url}
      />

      <div className="container">
        <div className="contentProjeler">
          <SideBar
            categories={categories}
            categoryLinkName={categoryLinkName}
            sidebarOpen={sidebarOpen}
            setSidebarOpen={setSidebarOpen}
          />

          <div className="contentProjelerRight">
            <List
              products={products}
              currentItems={currentItems}
              toggleSidebar={toggleSidebar}
              categoryName={selectedCategory?.name}
            />

            <Pagination
              itemsPerPage={9}
              items={products}
              setCurrentItems={setCurrentItems}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Urunler;
