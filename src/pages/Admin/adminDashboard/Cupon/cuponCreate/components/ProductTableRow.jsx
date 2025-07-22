import "./ProductTableRow.scss";
import PropTypes from "prop-types";

const ProductTableRow = ({ item, selected, onToggle }) => {
  return (
    <tr
      className={selected ? "selected" : ""}
      onClick={onToggle}
      style={{ cursor: "pointer" }}
    >
      <td>
        <div className="product-infoo">
          <div className="image">
            <img src={item.coverImage?.url} alt={item.name} />
            {selected && <span className="checkmark">✔</span>}
          </div>
          <div className="details">
            <span className="name">{item.name}</span>
            <p className="shortDesc">{item.shortDescription}</p>
          </div>
        </div>
      </td>
    </tr>
  );
};

ProductTableRow.propTypes = {
  item: PropTypes.object.isRequired,
  selected: PropTypes.bool,
  onToggle: PropTypes.func,
};

export default ProductTableRow;
