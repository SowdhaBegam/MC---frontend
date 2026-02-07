import React, { useEffect, useState } from "react";
import { getPendingShops, approveShop, getApprovedShops } from "../services/adminService";
import "../styles/Admin.css";

const AdminDashboard = () => {
  const [shops, setShops] = useState([]);
  const [approvedShops, setApprovedShops] = useState([]);

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadPendingShops();
    loadApprovedShops();
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
  const loadApprovedShops = async () => {
  try {
    const res = await getApprovedShops(token);
    console.log("Approved Shops:", res.data);
    setApprovedShops(res.data.data || []);
  } catch (err) {
    console.error("Error loading approved shops:", err);
  }
};


  const handleApprove = async (id) => {
    await approveShop(id, token);
    alert("Shop Approved!");
    loadPendingShops();
    loadApprovedShops();
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
          <h3>{shop.shop_name}</h3>
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
    {/* APPROVED SHOPS SECTION */}
<h2 className="approved-title">Approved Shops</h2>

{approvedShops.length === 0 ? (
  <p className="no-data">No approved shops yet.</p>
) : (
  approvedShops.map((shop) => (
    <div key={shop.id} className="approved-card">
      <h3>{shop.shop_name}</h3>
      <p><strong>Owner:</strong> {shop.owner_name}</p>
      <p><strong>Email:</strong> {shop.email}</p>
      <p><strong>Phone:</strong> {shop.phone}</p>
      <p><strong>Business Type:</strong> {shop.business_type}</p>
      <p><strong>Approved On:</strong> {new Date(shop.created_at).toLocaleString()}</p>
    </div>
  ))
)}

  </div>
  
);
};

export default AdminDashboard;
