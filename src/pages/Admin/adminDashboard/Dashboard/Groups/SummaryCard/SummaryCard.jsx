import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import dayjs from "dayjs";
import "dayjs/locale/tr";
import "./SummaryCard.scss";

const SummaryCard = () => {
  const chartData = [
    { date: "2025-04-01", sales: 49, revenue: 4116 },
    { date: "2025-04-02", sales: 21, revenue: 1596 },
    { date: "2025-04-03", sales: 45, revenue: 2520 },
    { date: "2025-04-04", sales: 49, revenue: 4067 },
    { date: "2025-04-05", sales: 25, revenue: 2425 },
    { date: "2025-04-06", sales: 27, revenue: 891 },
    { date: "2025-04-07", sales: 21, revenue: 1428 },
    { date: "2025-04-08", sales: 46, revenue: 4462 },
    { date: "2025-04-09", sales: 17, revenue: 1530 },
    { date: "2025-04-10", sales: 48, revenue: 1584 },

    // Devam eder...
  ];

  const totalItems = 280; // 280 ürün satıldı
  const totalAmount = 120000; // Toplam gelir 120.000 TL
  const averageBasket = totalAmount / totalItems; // Ortalama sepet tutarı

  return (
    <div className="summary-card">
      <div className="summary-card__left">
        <h4>Satışlar</h4>
        <ResponsiveContainer width="100%" height={150}>
          <LineChart data={chartData}>
            <XAxis
              dataKey="date"
              fontSize={14}
              tickFormatter={(str) => dayjs(str).format("DD MMM")}
            />
            <YAxis fontSize={14} />
            <Tooltip
              labelFormatter={(label) => dayjs(label).format("DD MMMM YYYY")}
            />
            <Line
              type="monotone"
              dataKey="sales"
              stroke="#5C6BC0"
              strokeWidth={3}
              dot={true}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="summary-card__right">
        <h4>Satış Özeti</h4>
        <p>
          <span>🛍️ Toplam Satış:</span> {totalItems}
        </p>
        <p>
          <span>💸 Toplam Tutar:</span> {totalAmount.toFixed(2)}₺
        </p>
        <p>
          <span>📦 Ortalama Sepet:</span> {averageBasket.toFixed(2)}₺
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
