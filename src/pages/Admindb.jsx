import KPICard from "../components/admin/KPIcard";
import OrdersChart from "../components/admin/OrdersChart";
import RevenueChart from "../components/admin/RevenueChart";
import TopShops from "../components/admin/TopShops";
import RecentShops from "../components/admin/RecentShops";
import LatestOrders from "../components/admin/LatestOrders";


import "../styles/admindb.css";

export default function Admindb() {
  return (
    <div className="admin-dashboard">

      {/* Header */}
      <div className="dashboard-header">
        <div>
          <h2>Admin Dashboard</h2>
          <p>Platform Overview</p>
        </div>

        <div className="dashboard-actions">
          <select>
            <option>Last 7 Days</option>
            <option>Last 30 Days</option>
          </select>
          <button className="export-btn">Export</button>
        </div>
      </div>

      {/* KPI Section */}
      <div className="kpi-grid">
        <KPICard title="Total Shops" value="124" change="+8%" color="blue" />
        <KPICard title="Active Shops" value="86" change="+5%" color="green" />
        <KPICard title="Total Orders" value="1,540" change="+12%" color="orange" />
        <KPICard title="Revenue" value="₹2,45,800" change="+20%" color="purple" />
        <KPICard title="Pending Approvals" value="8" change="3 awaiting" color="red" />
      </div>
      
      <div className="charts-grid">
  <OrdersChart />
  <RevenueChart />
</div>

<div className="bottom-grid">
  <TopShops />
  <RecentShops />
  <LatestOrders />
 
</div>



    </div>
  );
}