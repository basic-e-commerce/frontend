import "./Urunler.scss";
import { useEffect, useState, useRef } from "react";

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
import { setLoading } from "../../redux/slices/loadingSlice";
import UrunlerSkeleton from "./UrunlerSkeleton";

const Urunler = () => {
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.loading);
  const [currentItems, setCurrentItems] = useState([]);
  const { categoryLinkName } = useParams();
  const { products } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [value, setValue] = useState([0, 5000]);

  const debounceTimerRef = useRef(null);
  const prevCategoryRef = useRef(categoryLinkName);
  const prevValueRef = useRef([0, 5000]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleValueChange = (newValue) => {
    setValue(newValue);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }

    debounceTimerRef.current = setTimeout(() => {
      fetchProducts(categoryLinkName, newValue);
      setSidebarOpen(false);
    }, 500);
  };

  const fetchProducts = async (categoryName, priceRange) => {
    dispatch(setLoading({ isLoading: true }));
    try {
      await dispatch(
        getProductsCategoryLinkNameUser({
          linkName: categoryName,
          min: priceRange[0],
          max: priceRange[1],
        })
      ).unwrap();
    } catch (error) {
      console.log(error);
    } finally {
      dispatch(setLoading({ isLoading: false }));
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setLoading({ isLoading: true }));
      try {
        await dispatch(getCategories()).unwrap();
        const category = await dispatch(
          getCategoryByCategoryLinkName(categoryLinkName)
        ).unwrap();
        setSelectedCategory(category);

        // Category değiştiyse value'yu sıfırla ve fetch yap
        if (prevCategoryRef.current !== categoryLinkName) {
          setValue([0, 5000]);
          prevValueRef.current = [0, 5000];

          await fetchProducts(categoryLinkName, [0, 5000]);
        } else {
          // Category aynıysa sadece mevcut value ile fetch yap
          await fetchProducts(categoryLinkName, value);
        }

        prevCategoryRef.current = categoryLinkName;
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading({ isLoading: false }));
      }
    };
    setSidebarOpen(false);
    fetchData();
  }, [dispatch, categoryLinkName]);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

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
            value={value}
            setValue={handleValueChange}
          />

          <div className="contentProjelerRight">
            <List
              products={products}
              currentItems={currentItems}
              toggleSidebar={toggleSidebar}
              categoryName={selectedCategory?.name}
            />

            <Pagination
              itemsPerPage={12}
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
