export default function StatCard({ title, value, icon, bg }) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${bg}`}>
        {icon}
      </div>

      <div>
        <p className="stat-title">{title}</p>
        <h3 className="stat-value">{value}</h3>
      </div>
    </div>
  );
}