import { Link } from "react-router-dom";
import "./MostSellingProductsCard.scss";

const products = [
  {
    name: "Mavi Ceket",
    image: "/images/dogruDaire/konum.jpg",
    id: "ID: 121318",
    sales: "401",
  },
  {
    name: "Siyah Pantalon",
    image: "/images/dogruDaire/huzur.jpg",
    id: "ID: 246130",
    sales: "128",
  },

  {
    name: "Water Bottle",
    image: "/images/dogruDaire/pazar.jpg",
    id: "ID: 844573",
    sales: "32",
  },
  {
    name: "Water Bottle",
    image: "/images/dogruDaire/yatirim.jpg",
    id: "ID: 844573",
    sales: "16",
  },
];

const MostSellingProductsCard = () => {
  return (
    <div className="most-selling-products-card">
      <div className="headerTitle">
        <h3>En çok satılan 4 ürün</h3>
      </div>
      <div className="product-list">
        {products.map((item, index) => (
          <Link to={""} key={index} className="product-item">
            <img src={item.image} alt={item.name} />
            <div className="details">
              <p className="name">{item.name}</p>
              <p className="id">{item.id}</p>
            </div>
            <span className="sales">{item.sales} satış</span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default MostSellingProductsCard;
