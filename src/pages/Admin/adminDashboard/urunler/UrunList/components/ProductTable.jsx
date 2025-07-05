import "./ProductTable.scss";
import ProductTableRow from "./ProductTableRow";
import PropTypes from "prop-types";

const ProductTable = ({ currentItems }) => {
  return (
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
            <ProductTableRow key={idx} item={item} />
          ))}
        </tbody>
      </table>
    </div>
  );
};

ProductTable.propTypes = {
  currentItems: PropTypes.array,
};

export default ProductTable;
