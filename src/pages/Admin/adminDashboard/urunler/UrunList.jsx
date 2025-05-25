import "./UrunList.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getProductsCategory,
  resetTheProducts,
} from "../../../../redux/slices/productSlice";
import Pagination from "../../../../components/Pagination/Pagination";
import StarRateIcon from "@mui/icons-material/StarRate";
import { Link } from "react-router-dom";
import { getCategories } from "../../../../redux/slices/categorySlice";

const UrunList = () => {
  const dispatch = useDispatch();
  const { products, productsStatus } = useSelector((state) => state.products);
  const { categories } = useSelector((state) => state.categories);
  const [currentItems, setCurrentItems] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null);

  console.log(categories);
  console.log(currentItems);

  useEffect(() => {
    dispatch(resetTheProducts());
    dispatch(getCategories());
  }, [dispatch]);

  useEffect(() => {
    if (selectedCategoryId) {
      dispatch(getProductsCategory(selectedCategoryId));
    }
  }, [selectedCategoryId]);

  return (
    <div className="urunList">
      <div className="container">
        <div className="urunListContent">
          <label className="secilenBolum">
            Kategori:
            <select
              onChange={(e) => setSelectedCategoryId(e.target.value)}
              value={selectedCategoryId || ""}
            >
              <option disabled value="">
                Kategori Seçiniz
              </option>
              {categories?.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.categoryName}
                </option>
              ))}
            </select>
          </label>

          {selectedCategoryId &&
            (currentItems?.length > 0 ? (
              <div className="product-table">
                <table>
                  <thead>
                    <tr>
                      <th className="productNameTh">Product Name & Size</th>
                      <th>Price</th>
                      <th>Stock</th>

                      <th>Rating</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems?.map((item, idx) => (
                      <tr key={idx}>
                        <td>
                          <div className="product-info">
                            <div className="image">
                              <img src={item.coverImage?.url} alt={item.name} />
                            </div>
                            <div className="details">
                              <span className="name">{item.name}</span>
                              <p className="shortDesc">
                                {item.shortDescription}
                              </p>
                            </div>
                          </div>
                        </td>
                        <td>
                          <span>
                            <s>{item.salePrice}₺</s>
                          </span>
                          <br />
                          <span
                            style={{
                              marginTop: "0.3rem",
                              paddingLeft: "0.7rem",
                            }}
                          >
                            {item.comparePrice}₺
                          </span>
                        </td>
                        <td>
                          <span className="stock">{item.quantity} stokta</span>
                          <br />
                          <span className="sold">10 Satılmış</span>
                        </td>

                        <td>
                          <div className="rating">
                            <StarRateIcon style={{ fontSize: "1.1rem" }} />
                            <span>4.3</span>
                          </div>
                          <br />
                          <span className="reviews">
                            {item.reviews}50 Yorum
                          </span>
                        </td>
                        <td className="actions">
                          <a
                            target="_blank"
                            href={`/urunler/${item.linkName}`}
                            className="view"
                          >
                            <VisibilityIcon className="icon" />
                          </a>
                          <Link
                            to={`/admins/urunler/${item.linkName}`}
                            className="edit"
                          >
                            <EditIcon className="icon" />
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="no-products-message">
                Bu kategoride ürün bulunamadı.
              </p>
            ))}

          {selectedCategoryId && (
            <Pagination
              itemsPerPage={5}
              items={products}
              setCurrentItems={setCurrentItems}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default UrunList;
