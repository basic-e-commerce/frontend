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
import "./VisitorChart.scss";

dayjs.locale("tr");

const VisitorChart = ({ visitor }) => {
  const transformData = (visitors) => {
    if (!visitors) return [];

    return Object.entries(visitors)
      .map(([date, count]) => ({
        date,
        Ziyaret: count,
      }))
      .sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  const chartData = transformData(visitor?.visitors);

  return (
    <div className="visitor-chart">
      <h2>Ziyaretçi Grafiği</h2>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={chartData}>
          <XAxis
            dataKey="date"
            fontSize={14}
            tickFormatter={(str) => dayjs(str).format("DD MMM")}
          />
          <YAxis />
          <Tooltip
            labelFormatter={(label) => dayjs(label).format("DD MMMM YYYY")}
          />
          <Line
            type="monotone"
            dataKey="Ziyaret"
            stroke="#000000"
            strokeWidth={3}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VisitorChart;
