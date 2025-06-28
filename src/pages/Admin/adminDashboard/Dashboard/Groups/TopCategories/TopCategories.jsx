import { PieChart, Pie, Cell } from "recharts";
import "./TopCategories.scss";
import { useState } from "react";
import { Link } from "react-router-dom";

const COLORS = ["#1F1F1F", "#8C8C8C", "#E0E0E0"]; // Sırasıyla Ürün 1-2-3

const TopCategoriesCard = ({ sepets }) => {
  const pieData = sepets?.slice(0, 3).map((item, index) => ({
    name: item.productName,
    value: item.quantity,
    color: COLORS[index] || "#CCCCCC", // fazla ürün gelirse default renk
  }));

  const total = pieData?.reduce((acc, item) => acc + item.value, 0) || 0;
  const [popUp, setPopUp] = useState(false);

  console.log(sepets);

  return (
    <div className="top-categories-card">
      <h3 className="title">Sepetinde Ürün Olanlar (Anlık)</h3>

      <div className="chart-wrapper">
        <PieChart width={140} height={140}>
          <Pie
            data={pieData}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={65}
            paddingAngle={5}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
        <div className="total">{total} kişi</div>
      </div>

      <div className="legend">
        {pieData.map((entry, index) => (
          <div key={index} className="legend-item">
            <span
              className="dot"
              style={{ backgroundColor: entry.color }}
            ></span>
            <span className="label">
              {entry.name}: {entry.value} kişinin sepetinde
            </span>
          </div>
        ))}
      </div>

      <div className="arrow">
        <button>Tümünü Gör</button>
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
              {/* {sepets?.map((item, index) => (
                <Link to={""} key={index} className="product-item">
                  <img src={item.coverImage?.url} alt={item.productName} />
                  <div className="details">
                    <p className="name">{item.productName}</p>
                    <p className="id">Ürün ID: {item.productId}</p>
                  </div>
                  <span className="sales">{item.quantity} satış</span>
                </Link>
              ))} */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TopCategoriesCard;
