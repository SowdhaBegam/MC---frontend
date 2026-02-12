import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./pages/AdminDashboard";
import "./App.css";
import ShopLayout from "./pages/ShopDashboard/ShopLayout";
import Dashboard from "./pages/ShopDashboard/Dashboard";
import Orders from "./pages/ShopDashboard/Orders";
import Products from "./pages/ShopDashboard/Products";
import AdminLayout from "./layouts/Admin/AdminLayout";
import ForgotPass from "./components/ForgotPass";
import AddProduct from "./components/admin/AddProduct";
import AdminShopProducts from "./components/admin/AdminShopProducts";

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
        <Route path="/forgot-password" element={<ForgotPass />} />


        {/* Register page */}
        <Route path="/register" element={<RegisterPage />} />

        {/* 🔐 Shop Dashboard */}

<Route path="/shop-dashboard" element={<ProtectedRoute><ShopLayout /></ProtectedRoute>}>
  <Route index element={<Dashboard />} />
  <Route path="orders" element={<Orders />} />
  <Route path="products" element={<Products />} />
</Route>


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
  <Route path="add-product" element={<AddProduct />} />
  <Route path="shop/:id" element={<AdminShopProducts />} />
  <Route path="orders" element={<OrdersPage />} />
  <Route path="settings" element={<SettingsPage />} />
  
</Route>




      </Routes>
    </BrowserRouter>
  );
}