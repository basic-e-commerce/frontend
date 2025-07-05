import "./ProductTableRow.scss";
import VisibilityIcon from "@mui/icons-material/Visibility";
import EditIcon from "@mui/icons-material/Edit";
import StarRateIcon from "@mui/icons-material/StarRate";
import { Link } from "react-router-dom";

const ProductTableRow = ({ item }) => {
  return (
    <tr>
      <td>
        <div className="product-info">
          <div className="image">
            <img src={item.coverImage?.url} alt={item.name} />
          </div>
          <div className="details">
            <span className="name">{item.name}</span>
            <p className="shortDesc">{item.shortDescription}</p>
          </div>
        </div>
      </td>
      <td>
        <span>
          <s>{item.salePrice}₺</s>
        </span>
        <br />
        <span style={{ marginTop: "0.3rem", paddingLeft: "0.7rem" }}>
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
        <span className="reviews">{item.reviews}50 Yorum</span>
      </td>
      <td className="actions">
        <a target="_blank" href={`/urunler/${item.linkName}`} className="view">
          <VisibilityIcon className="icon" />
        </a>
        <Link to={`/admins/urunler/${item.linkName}`} className="edit">
          <EditIcon className="icon" />
        </Link>
      </td>
    </tr>
  );
};

export default ProductTableRow;
