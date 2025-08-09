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

const SummaryCard = ({ satisData }) => {
  const chartData = satisData?.productDaySells?.map(
    ({ price, quantity, date }) => ({
      date,
      sales: quantity,
      revenue: price,
    })
  );

  const totalItems = satisData?.totalQuantity || "Veri Yok"; // 280 ürün satıldı
  const totalAmount = satisData?.totalPrice?.toFixed(2) || "Veri Yok"; // Toplam gelir 120.000 TL
  const totalRefund = satisData?.refundPrice?.toFixed(2) || "Veri Yok"; // Toplam iade edilen tutar
  const totalOrder = satisData?.totalOrder || "Veri Yok"; // Toplam Verilen Sipariş
  const averageBasket = satisData?.averageOrderAmount?.toFixed(1) || "Veri Yok"; // Ortalama sepet tutarı
  const refundOrders = satisData?.refundOrders?.toFixed(0) || "Veri Yok"; // Toplam iade edilen sipariş

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
              stroke="#000000"
              strokeWidth={3}
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      <div className="summary-card__right">
        <h4>Satış Özeti</h4>
        <p>
          <span> Toplam Satılan Ürün Sayısı:</span> {totalItems}
        </p>
        <p>
          <span>Toplam Sipariş:</span> {totalOrder}
        </p>
        <p>
          <span>Toplam Ciro:</span> {totalAmount}₺
        </p>

        <p>
          <span>Toplam İade Sipariş:</span> {refundOrders} Adet
        </p>

        <p>
          <span>Toplam İade Edilen Tutar:</span> {totalRefund}₺
        </p>
        <p>
          <span>Ortalama Sepet:</span> {averageBasket}₺
        </p>
      </div>
    </div>
  );
};

export default SummaryCard;
