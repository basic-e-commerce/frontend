import "./ProductTable.scss";
import ProductTableRow from "./ProductTableRow";
import PropTypes from "prop-types";

const ProductTable = ({ currentItems }) => {
  return (
    <div className="product-table">
      <table>
        <thead>
          <tr>
            <th className="productNameTh">Ürün İsmi</th>
            <th>Fiyatı</th>
            <th>Stok</th>
            <th>Puan</th>
            <th>İşlemler</th>
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
