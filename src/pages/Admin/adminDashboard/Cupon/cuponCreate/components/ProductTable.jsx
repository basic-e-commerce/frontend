import "./ProductTable.scss";
import ProductTableRow from "./ProductTableRow";
import PropTypes from "prop-types";

const ProductTable = ({ currentItems, productIds, onToggleProduct }) => {
  return (
    <div className="product-tableee">
      <table>
        <thead>
          <tr>
            <th className="productNameTh">Ürünleri Seç</th>
          </tr>
        </thead>
        <tbody>
          {currentItems?.map((item, idx) => (
            <ProductTableRow
              key={item.id || idx}
              item={item}
              selected={productIds?.includes(item.id)}
              onToggle={() => onToggleProduct(item.id)}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

ProductTable.propTypes = {
  currentItems: PropTypes.array,
  productIds: PropTypes.array,
  onToggleProduct: PropTypes.func,
};

export default ProductTable;
