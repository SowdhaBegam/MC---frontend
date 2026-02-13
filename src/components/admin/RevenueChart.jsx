import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid
} from "recharts";

const data = [
  { month: "Jan", revenue: 40000 },
  { month: "Feb", revenue: 60000 },
  { month: "Mar", revenue: 75000 }
];

export default function RevenueChart() {
  return (
    <div className="chart-card">
      <h4>Revenue Growth</h4>
      <ResponsiveContainer width="100%" height={150}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="revenue"
            stroke="#7c3aed"
            fill="#c4b5fd"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}