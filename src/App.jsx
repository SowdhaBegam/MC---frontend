import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import AdminDashboard from "./components/AdminDashboard";
import "./App.css";
import ShopDashboard from "./pages/ShopDashboard";

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

{/* 🔐 Admin Dashboard */}
<Route
  path="/admin-dashboard"
  element={
    <ProtectedRoute>
      <AdminDashboard
        view="dashboard"
        shops={[]}
        users={[]}
        orders={[]}
        onUpdateShopStatus={() => {}}
        onForceToggleShop={() => {}}
      />
    </ProtectedRoute>
  }
/>



      </Routes>
    </BrowserRouter>
  );
}