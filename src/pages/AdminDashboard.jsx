import React, { useEffect, useState } from "react";
import { getPendingShops, approveShop } from "../services/adminService";
import "../styles/Admin.css";

const AdminDashboard = () => {
  const [shops, setShops] = useState([]);
  const token = localStorage.getItem("token");

  useEffect(() => {
    loadPendingShops();
  }, []);

  const loadPendingShops = async () => {
    try {
      const res = await getPendingShops(token);
      console.log("Pending Shops:", res.data);
      setShops(res.data.pending_vendors || []);
    } catch (err) {
      console.error("Error loading shops:", err);
    }
  };

  const handleApprove = async (id) => {
    await approveShop(id, token);
    alert("Shop Approved!");
    loadPendingShops();
  };

  const handleDecline = async (id) => {
    // If backend has decline API, use that.
    // For now, we just remove from list.
    alert("Shop Declined!");
    setShops(shops.filter((s) => s.id !== id));
  };

  return (
     <div className="admin-container">
    <h1 className="admin-title">Admin Approval Dashboard</h1>

    {shops.length === 0 ? (
      <p className="no-data">No shops waiting for approval.</p>
    ) : (
      shops.map((shop) => (
        <div key={shop.id} className="shop-card">
          <h3>{shop.name}</h3>
          <p><strong>Owner:</strong> {shop.owner_name}</p>
          <p><strong>Email:</strong> {shop.email}</p>
          <p><strong>Business Type:</strong> {shop.business_type}</p>
          <p><strong>Registered On:</strong> {new Date(shop.created_at).toLocaleString()}</p>

          <button
            onClick={() => handleApprove(shop.id)}
            className="approve-btn"
          >
            Approve
          </button>

          <button
            onClick={() => handleDecline(shop.id)}
            className="decline-btn"
          >
            Decline
          </button>
        </div>
      ))
    )}
  </div>
  
);
};

export default AdminDashboard;
