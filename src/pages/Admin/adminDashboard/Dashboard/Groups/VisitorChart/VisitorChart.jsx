import React from "react";
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

// Sabit veri (son 10 gün)
const data = [
  { date: "2025-03-30", Ziyaret: 120 },
  { date: "2025-03-31", Ziyaret: 150 },
  { date: "2025-04-01", Ziyaret: 180 },
  { date: "2025-04-02", Ziyaret: 130 },
  { date: "2025-04-03", Ziyaret: 220 },
  { date: "2025-04-04", Ziyaret: 1200 },
  { date: "2025-04-05", Ziyaret: 654 },
  { date: "2025-04-06", Ziyaret: 170 },
  { date: "2025-04-07", Ziyaret: 210 },
  { date: "2025-04-08", Ziyaret: 190 },
  { date: "2025-04-09", Ziyaret: 750 },
  { date: "2025-04-10", Ziyaret: 250 },
  { date: "2025-04-11", Ziyaret: 170 },
  { date: "2025-04-12", Ziyaret: 210 },
  { date: "2025-04-13", Ziyaret: 190 },
  { date: "2025-04-14", Ziyaret: 180 },
  { date: "2025-04-15", Ziyaret: 130 },
  { date: "2025-04-16", Ziyaret: 220 },
  { date: "2025-04-17", Ziyaret: 1500 },
  { date: "2025-04-18", Ziyaret: 250 },
  { date: "2025-04-19", Ziyaret: 170 },
  { date: "2025-04-20", Ziyaret: 210 },
  { date: "2025-04-21", Ziyaret: 190 },
  { date: "2025-04-22", Ziyaret: 200 },
  { date: "2025-04-23", Ziyaret: 250 },
  { date: "2025-04-24", Ziyaret: 170 },
  { date: "2025-04-25", Ziyaret: 210 },
  { date: "2025-04-26", Ziyaret: 190 },
];

const VisitorChart = () => {
  return (
    <div className="visitor-chart">
      <h2>Son 10 Günlük Ziyaretçi Grafiği</h2>
      <ResponsiveContainer width="100%" height={220}>
        <LineChart data={data}>
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
            stroke="#5C6BC0"
            strokeWidth={3}
            dot={true}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default VisitorChart;
