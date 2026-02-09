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
      setShops(res.data.pending_vendors || []);
    } catch (err) {
      console.error("Error loading shops:", err);
    }
  };

  const loadApprovedShops = async () => {
    try {
      const res = await getApprovedShops(token);
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
    alert("Shop Declined!");
    setShops(shops.filter((s) => s.id !== id));
  };

  return (
    <div className="admin-container">
      <h1 className="admin-title">Admin Approval Dashboard</h1>

      {shops.length === 0 ? (
        <p className="no-data">No shops waiting for approval.</p>
      ) : (
        <div className="shop-grid">
          {shops.map((shop) => (
            <div key={shop.id} className="shop-card">

              {/* SHOP NAME BIG TITLE */}
              <h2 className="shop-name">{shop.shop_name}</h2>

              <p><strong>Owner:</strong> {shop.owner_name}</p>
              <p><strong>Email:</strong> {shop.email}</p>
              <p><strong>Business Type:</strong> {shop.business_type}</p>
              <p><strong>Registered On:</strong> {new Date(shop.created_at).toLocaleString()}</p>

              <div className="shop-card-actions">
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
            </div>
          ))}
        </div>
      )}

      {/* APPROVED SHOPS */}
      <h2 className="approved-title">Approved Shops</h2>

      {approvedShops.length === 0 ? (
        <p className="no-data">No approved shops yet.</p>
      ) : (
        <div className="shop-grid">
          {approvedShops.map((shop) => (
            <div key={shop.id} className="approved-card">
              <h2 className="shop-name">{shop.shop_name}</h2>

              <p><strong>Owner:</strong> {shop.owner_name}</p>
              <p><strong>Email:</strong> {shop.email}</p>
              <p><strong>Phone:</strong> {shop.phone}</p>
              <p><strong>Business Type:</strong> {shop.business_type}</p>
              <p><strong>Approved On:</strong> {new Date(shop.created_at).toLocaleString()}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;