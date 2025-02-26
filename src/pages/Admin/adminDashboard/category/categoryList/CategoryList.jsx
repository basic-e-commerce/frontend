import "./CategoryList.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Pagination from "../../../../../components/Pagination/Pagination";
import { Link, useNavigate } from "react-router-dom";
import { getCategories } from "../../../../../redux/slices/categorySlice";
import denemeImg from "/images/acardion/2.jpg";

const CategoryList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { categories } = useSelector((state) => state.categories);
  const [currentItems, setCurrentItems] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(getCategories());
  }, [dispatch]);

  const handleDeleteClick = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };

  const handleConfirmDelete = () => {
    console.log("Ürün silindi:", selectedProduct);
    setShowPopup(false);
    setSelectedProduct(null);
  };

  console.log(currentItems);
  return (
    <div className="urunList">
      <div className="container">
        <div className="table-container">
          <table className="product-table">
            <thead>
              <tr>
                <th>Kategori İsmi</th>
                <th>Aktiflik durumu</th>
                <th>Açıklama</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((product) => (
                <tr key={product.id}>
                  <td>
                    <div className="product-info">
                      <img src={denemeImg} alt={product.name} />
                      <div>
                        <p className="product-name">{product.name}</p>
                      </div>
                    </div>
                  </td>

                  <td>
                    <span>Aktif</span>
                  </td>
                  <td className="ratingAndComments">
                    <span>Açıklama</span>
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
          items={categories}
          setCurrentItems={setCurrentItems}
        />

        {showPopup && (
          <div className="popup">
            <div className="popup-inner">
              <p>Silmek istediğinize emin misiniz?</p>
              <div className="popup-buttons">
                <button className="cancel" onClick={() => setShowPopup(false)}>
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

export default CategoryList;
