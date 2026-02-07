import Navbar from "../../components/Shop/Navbar";
import { Outlet } from "react-router-dom";
import "../../styles/Shop/Dashboard.css";

export default function ShopLayout() {
  return (
    <div className="shop-container">
  <Navbar />
  <main className="dashboard-page">
    <Outlet />
  </main>
</div>

  );
}
