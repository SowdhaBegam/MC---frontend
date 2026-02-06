import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";
import ShopDashboard from "./pages/ShopDashboard";
import AdminLayout from "./layouts/Admin/AdminLayout";

const DashboardHome = () => <h2 style={{color:"white"}}>Dashboard Overview</h2>;
const OrdersPage = () => <h2 style={{color:"white"}}>Orders Page</h2>;
const SettingsPage = () => <h2 style={{color:"white"}}>Settings Page</h2>;
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated } = useContext(AuthContext);
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Login page */}
        <Route path="/" element={<LoginPage />} />

        {/* Register page */}
        <Route path="/register" element={<RegisterPage />} />

        {/* 🔐 Shop Dashboard */}
<Route
  path="/shop-dashboard"
  element={
    <ProtectedRoute>
      <ShopDashboard />
    </ProtectedRoute>
  }
/>

<Route
  path="/admin"
  element={
    <ProtectedRoute>
      <AdminLayout />
    </ProtectedRoute>
  }
>
  <Route path="dashboard" element={<DashboardHome />} />
  <Route path="shops" element={<AdminDashboard />} />
  <Route path="orders" element={<OrdersPage />} />
  <Route path="settings" element={<SettingsPage />} />
</Route>




      </Routes>
    </BrowserRouter>
  );
}