import { PieChart, Pie, Cell } from "recharts";
import "./TopCategories.scss";

const data = [
  { name: "Elektronik", value: 3000, color: "#1F1F1F" },
  { name: "Telefon", value: 2000, color: "#8C8C8C" },
  { name: "Bilgisayar", value: 1200, color: "#E0E0E0" },
];

const TopCategoriesCard = () => {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  const formattedTotal = `₺${(total / 1000).toFixed(1)}K`;

  return (
    <div className="top-categories-card">
      <h3 className="title">Top Categories</h3>

      <div className="chart-wrapper">
        <PieChart width={140} height={140}>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={50}
            outerRadius={65}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
        </PieChart>
        <div className="total">{formattedTotal}</div>
      </div>

      <div className="legend">
        {data.map((entry, index) => (
          <div key={index} className="legend-item">
            <span
              className="dot"
              style={{ backgroundColor: entry.color }}
            ></span>
            <span className="label">
              {entry.name}: {entry.value}₺
            </span>
          </div>
        ))}
      </div>

      <div className="arrow">
        <span>Tümünü Gör</span>
      </div>
    </div>
  );
};

export default TopCategoriesCard;
