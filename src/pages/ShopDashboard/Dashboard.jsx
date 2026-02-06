import StatCard from "../components/StatCard";
import OrderCard from "../components/orderCard";
import "../styles/Dashboard.css";

export default function Dashboard() {
  return (
    <main className="dashboard-page">

      {/* ===== STATS ===== */}
      <div className="stats-grid">
        <StatCard
          title="INCOMING TRAFFIC"
          value="3"
          icon="📩"
          bg="bg-blue"
        />

        <StatCard
          title="NET REVENUE"
          value="₹0"
          icon="📈"
          bg="bg-green"
        />

        <StatCard
          title="ACTIVE PIPELINE"
          value="3"
          icon="⚡"
          bg="bg-orange"
        />
      </div>

      {/* ===== PIPELINE HEADER ===== */}
      <div className="pipeline-header">
        <div>
          <p className="pipeline-title">⚡ Order Stream</p>
          <p className="pipeline-sub">Managing 3 live requests</p>
        </div>

        <span className="priority-badge">
          PRIORITY ATTENTION
        </span>
      </div>

      {/* ===== ORDERS ===== */}
      <div className="order-grid">
        <OrderCard name="Rahul Sharma" amount="700" id="101" />
        <OrderCard name="Priya Verma" amount="420" id="102" />
        <OrderCard name="Amit Patel" amount="510" id="103" />
      </div>

    </main>
  );
}