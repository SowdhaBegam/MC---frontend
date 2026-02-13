import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const data = [
  { day: "Mon", orders: 120 },
  { day: "Tue", orders: 150 },
  { day: "Wed", orders: 90 },
  { day: "Thu", orders: 170 },
  { day: "Fri", orders: 200 },
  { day: "Sat", orders: 180 },
  { day: "Sun", orders: 220 }
];

export default function OrdersChart() {
  return (
    <div className="chart-card">
      <h4>Orders Per Day</h4>
      <ResponsiveContainer width="90%" height={150}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="orders"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}