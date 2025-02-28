import "./UrunList.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../../../../../redux/slices/productSlice";
import Pagination from "../../../../../components/Pagination/Pagination";
import StarRateIcon from "@mui/icons-material/StarRate";
import { Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../../../../config/baseApi";

const UrunList = () => {
  const dispatch = useDispatch();
  const { products, productsStatus } = useSelector((state) => state.products);
  const [currentItems, setCurrentItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const handleDeleteClick = (product) => {
    setSelectedProduct(product.id);
    setShowPopup(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/v1/product?id=${selectedProduct}`
      );
      setSelectedProduct(null);
      setShowPopup(false);
      dispatch(getProducts()); // Yeniden ürünleri çek
      console.log(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="urunList">
      <div className="container">
        <div className="table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>Ürün İsmi</th>
                <th>Fiyat</th>
                <th>Stok Durumu</th>
                <th>Kategori</th>
                <th>Memnuniyet</th>
                <th></th>
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
                    <Link to={`/admin/urunler/${product.id}`}>
                      <button className="edit">
                        <EditIcon className="icon" />
                      </button>
                    </Link>
                    <button
                      className="delete"
                      onClick={() => handleDeleteClick(product)}
                    >
                      <DeleteIcon className="icon iconDelete" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          itemsPerPage={5}
          items={products}
          setCurrentItems={setCurrentItems}
        />

        {showPopup && (
          <div className="popup">
            <div className="popup-inner">
              <p>Silmek istediğinize emin misiniz?</p>
              <div className="popup-buttons">
                <button
                  className="cancel"
                  onClick={() => {
                    setSelectedProduct(null);
                    setShowPopup(false);
                  }}
                >
                  İptal
                </button>
                <button className="confirm" onClick={handleConfirmDelete}>
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

export default UrunList;
