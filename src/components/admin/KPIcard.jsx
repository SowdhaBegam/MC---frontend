export default function KPICard({ title, value, change, color }) {
  return (
    <div className="kpi-card">
      <div className="kpi-title">{title}</div>
      <div className="kpi-value">{value}</div>
      <div className={`kpi-change ${color}`}>
        {change}
      </div>
    </div>
  );
}