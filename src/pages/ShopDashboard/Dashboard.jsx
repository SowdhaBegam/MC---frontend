import { useEffect, useState } from "react";
import StatCard from "../../components/Shop/StatCard";
import OrderCard from "../../components/Shop/orderCard";
import axios from "../../api/axios";

export default function Dashboard() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* =========================
     FETCH ORDERS
  ========================= */
  const fetchOrders = async () => {
    try {
      const res = await axios.get("/shop/orders");

      // debug
      console.log("Dashboard Orders 👉", res.data);

      if (Array.isArray(res.data)) {
        setOrders(res.data);
      } else {
        setOrders([]);
      }
    } catch (err) {
      console.error("Fetch orders error 👉", err);
      setError("Unable to load orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  /* =========================
     UI STATES
  ========================= */
  if (loading) return <p>Loading dashboard...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  const activeOrders = orders.filter(
    (o) => o.status !== "completed"
  );

  const totalRevenue = orders.reduce(
    (sum, o) => sum + Number(o.total_amount || 0),
    0
  );

  return (
    <>
      {/* ================= STATS ================= */}
      <div className="stats-grid">
        <StatCard
          title="NEW ORDERS"
          value={orders.length}
          icon="📩"
          bg="bg-blue"
        />

        <StatCard
          title="ORDER IN PROCESS"
          value={activeOrders.length}
          icon="📌"
          bg="bg-orange"
        />

        <StatCard
          title="TODAY'S REVENUE"
          value={`₹${totalRevenue}`}
          icon="💰"
          bg="bg-green"
        />
      </div>

      {/* ================= HEADER ================= */}
      <div className="pipeline-header">
        <div>
          <p className="pipeline-title">⚡ Order Stream</p>
          <p className="pipeline-sub">
            Managing {activeOrders.length} live requests
          </p>
        </div>
        <span className="priority-badge">PRIORITY ATTENTION</span>
      </div>

      {/* ================= ORDERS ================= */}
      <div className="order-grid">
        {activeOrders.length === 0 ? (
          <p>No active orders</p>
        ) : (
          activeOrders.map((order) => (
            <OrderCard
              key={order.id}
              id={order.id}
              name={order.customer_name || "Unknown"}
              amount={order.total_amount || 0}
              statusFromDB={order.status}
              items={order.items}
            />
          ))
        )}
      </div>
    </>
  );
}