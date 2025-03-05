import "./CategoryList.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../../../components/Pagination/Pagination";
import { Link, useNavigate } from "react-router-dom";
import { getCategories } from "../../../../../redux/slices/categorySlice";
import CategorySingleDown from "./CategorySingleDown";
import {
  getProductsCategory,
  resetTheProducts,
} from "../../../../../redux/slices/productSlice";
import StarRateIcon from "@mui/icons-material/StarRate";
import { BASE_URL } from "../../../../../config/baseApi";
import axios from "axios";

const CategoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);
  const { products, productStatus } = useSelector((state) => state.products);
  const [currentItems, setCurrentItems] = useState([]);
  const [showPopupCategory, setShowPopupCategory] = useState(false);
  const [showPopupProduct, setShowPopupProduct] = useState(false);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedCategoryName, setSelectedCategoryName] = useState("");

  useEffect(() => {
    dispatch(resetTheProducts());
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategory) {
      let selected = categories.find(
        (cat) => cat.id === Number(selectedCategory)
      );

      if (!selected) {
        // Eğer ana kategoriler içinde bulunamazsa, alt kategorileri tarayalım
        categories.forEach((cat) => {
          if (cat.subCategories && cat.subCategories.length > 0) {
            const foundSubCategory = cat.subCategories.find(
              (subCat) => subCat.id === Number(selectedCategory)
            );
            if (foundSubCategory) {
              selected = foundSubCategory;
            }
          }
        });
      }

      setSelectedCategoryName(selected?.name || "");
      dispatch(getProductsCategory(selected?.id));
    }
  }, [selectedCategory, categories, dispatch]);

  const handleDeleteClickCategory = (category) => {
    setSelectedCategory(category.id);
    setShowPopupCategory(true);
  };

  const handleDeleteClickProduct = (product) => {
    setSelectedProduct(product.id);
    setShowPopupProduct(true);
  };

  const handleConfirmDeleteCategory = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/v1/category?categoryId=${selectedCategory}`
      );
      setSelectedCategoryName("");
      setSelectedCategory("");
      setShowPopupCategory(false);
      dispatch(getCategories()); // Yeniden ürünleri çek
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleConfirmDeleteProduct = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/v1/product?id=${selectedProduct}`
      );
      setSelectedProduct(null);
      setShowPopupProduct(false);
      dispatch(getProductsCategory(selectedCategory));
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="categoryList">
      <div className="container">
        <div className="urunListContent">
          <label>
            Kategori Seç:
            <CategorySingleDown
              categories={categories}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          </label>

          <label>
            Kategori İsmi:
            <input
              type="text"
              name="productName"
              value={selectedCategoryName}
              onChange={(e) => setSelectedCategoryName(e.target.value)}
              required
              disabled={!selectedCategory}
            />
          </label>

          {selectedCategory && (
            <div className="buttonContainer">
              <button onClick={handleDeleteClickCategory} className="sil">
                Sil
              </button>
              <button>Düzenle</button>
            </div>
          )}

          <table className="product-table">
            <thead>
              <tr>
                <th>Ürün İsmi</th>
                <th>Fiyat</th>
                <th>Stok Durumu</th>
                <th>Kategori</th>
                <th>Memnuniyet</th>
                <th>Aksiyon</th>
              </tr>
            </thead>

            <tbody>
              {currentItems.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="product-info">
                      <img src={product.coverImage} alt={product.name} />
                      <div>
                        <p className="product-name">{product.name}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span>{product.price.toFixed(2)} ₺</span>
                  </td>
                  <td>
                    <span>30 kalan</span>
                    <br />
                    <span className="sold">20 satılmış</span>
                  </td>
                  <td>
                    <span>Kategori a</span>
                  </td>
                  <td className="ratingAndComments">
                    <span className="rating">
                      <StarRateIcon className="icon" />
                      <span>4.2</span>
                    </span>
                    <span className="reviews">35 Yorum</span>
                  </td>
                  <td className="actions">
                    <a target="_blank" href={`/urunler/${product.id}`}>
                      <button className="view">
                        <VisibilityIcon className="icon" />
                      </button>
                    </a>
                    <Link to={`/admins/urunler/${product.id}`}>
                      <button className="edit">
                        <EditIcon className="icon" />
                      </button>
                    </Link>
                    <button
                      className="delete"
                      onClick={() => handleDeleteClickProduct(product)}
                    >
                      <DeleteIcon className="icon iconDelete" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {products && (
            <Pagination
              itemsPerPage={5}
              items={products}
              setCurrentItems={setCurrentItems}
            />
          )}
        </div>

        {showPopupCategory && (
          <div className="popup">
            <div className="popup-inner">
              <p>Silmek istediğinize emin misiniz?</p>
              <div className="popup-buttons">
                <button
                  className="cancel"
                  onClick={() => {
                    setShowPopupCategory(false);
                  }}
                >
                  İptal
                </button>
                <button
                  className="confirm"
                  onClick={handleConfirmDeleteCategory}
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        )}

        {showPopupProduct && (
          <div className="popupProduct">
            <div className="popup-inner">
              <p>Silmek istediğinize emin misiniz?</p>
              <div className="popup-buttons">
                <button
                  className="cancel"
                  onClick={() => {
                    setSelectedProduct(null);
                    setShowPopupProduct(false);
                  }}
                >
                  İptal
                </button>
                <button
                  className="confirm"
                  onClick={handleConfirmDeleteProduct}
                >
                  Sil
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoryList;
