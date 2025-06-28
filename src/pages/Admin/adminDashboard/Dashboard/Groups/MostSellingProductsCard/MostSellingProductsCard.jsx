import { Link } from "react-router-dom";
import "./MostSellingProductsCard.scss";
import { useState } from "react";

const MostSellingProductsCard = ({ populerProducts }) => {
  const [popUp, setPopUp] = useState(false);

  return (
    <div className="most-selling-products-card">
      <div className="headerTitle">
        <h3>En çok satılan 4 ürün</h3>
      </div>
      <div className="product-list">
        {populerProducts?.slice(0, 4).map((item, index) => (
          <Link to={""} key={index} className="product-item">
            <img src={item.coverImage?.url} alt={item.productName} />
            <div className="details">
              <p className="name">{item.productName}</p>
              <p className="id">Ürün ID: {item.productId}</p>
            </div>
            <span className="sales">{item.quantity} satış</span>
          </Link>
        ))}
      </div>
      <div className="alll">
        <button
          onClick={() => {
            setPopUp(true);
          }}
        >
          Tümünü Gör
        </button>
      </div>

      {popUp && (
        <div className="modal-overlay">
          <div className="modal">
            <button
              className="close-btn"
              onClick={() => {
                setPopUp(false);
              }}
            >
              ×
            </button>
            <div className="product-list">
              {populerProducts?.map((item, index) => (
                <Link to={""} key={index} className="product-item">
                  <img src={item.coverImage?.url} alt={item.productName} />
                  <div className="details">
                    <p className="name">{item.productName}</p>
                    <p className="id">Ürün ID: {item.productId}</p>
                  </div>
                  <span className="sales">{item.quantity} satış</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MostSellingProductsCard;
