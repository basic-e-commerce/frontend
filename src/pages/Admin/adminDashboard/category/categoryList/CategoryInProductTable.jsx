import "./CategoryInProductTable.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { Link } from "react-router-dom";
import StarRateIcon from "@mui/icons-material/StarRate";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../../../../config/baseApi";
import { useDispatch } from "react-redux";
import { getProductsCategory } from "../../../../../redux/slices/productSlice";

const CategoryInProductTable = ({ currentItems, selectedCategory }) => {
  const dispatch = useDispatch();
  const [showPopupProduct, setShowPopupProduct] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const handleDeleteClickProduct = (product) => {
    setSelectedProduct(product.id);
    setShowPopupProduct(true);
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
        {currentItems?.map((product) => (
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
              <span>{product?.price?.toFixed(2)} ₺</span>
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
              <button className="confirm" onClick={handleConfirmDeleteProduct}>
                Sil
              </button>
            </div>
          </div>
        </div>
      )}
    </table>
  );
};

export default CategoryInProductTable;
