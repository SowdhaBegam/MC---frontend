import React, { useEffect, useState } from "react";
import { getPendingShops, approveShop, getApprovedShops, declineShop } from "../services/adminService";
import { getDeclinedShops } from "../services/adminService";
import "../styles/Admin.css";

const AdminDashboard = () => {
  const [shops, setShops] = useState([]);
  const [approvedShops, setApprovedShops] = useState([]);
  const [viewId, setViewId] = useState(null);
  const [activeTab, setActiveTab] = useState("pending");
  const [declinedShops, setDeclinedShops] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const token = localStorage.getItem("token");

  useEffect(() => {
    loadPendingShops();
    loadApprovedShops();
    loadDeclinedShops(); 
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
  try {
    await declineShop(id, token);

    alert("Shop Declined!");

    // Remove from pending list
    const declinedShop = shops.find((s) => s.id === id);
    setShops(shops.filter((s) => s.id !== id));

    // Add to declined list (optional)
    setDeclinedShops((prev) => [...prev, declinedShop]);

  } catch (err) {
    console.error("Decline error:", err);
    alert("Failed to decline shop");
  }
};
const loadDeclinedShops = async () => {
  try {
    const res = await getDeclinedShops();
    setDeclinedShops(res.data.data || []);
  } catch (err) {
    console.error("Error loading declined shops:", err);
  }
};
const filterShops = (shopsArray) => {
  return shopsArray.filter((shop) =>
    (
      shop.shop_name +
      shop.owner_name +
      shop.email +
      shop.phone +
      shop.business_type
    )
      .toLowerCase()
      .includes(searchTerm.toLowerCase())
  );
};



  return (
    <div className="admin-container admin-dashboard-page">
      <h1 className="admin-title">Approval Dashboard</h1>
      {/* STATUS NAVBAR */}
      {/* 🔍 SEARCH BAR */}
<div className="admin-search">
  <input
    type="text"
    placeholder="🔍Search by shop, owner, email, phone..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
</div>

<div className="status-navbar">

  <button
    className={`tab ${activeTab === "pending" ? "active" : ""}`}
    onClick={() => setActiveTab("pending")}
  >
    🟡 New Requests <span>{shops.length}</span>
  </button>

  <button
    className={`tab ${activeTab === "approved" ? "active" : ""}`}
    onClick={() => setActiveTab("approved")}
  >
    🟢 Approved <span>{approvedShops.length}</span>
  </button>

  <button
    className={`tab ${activeTab === "declined" ? "active" : ""}`}
    onClick={() => setActiveTab("declined")}
  >
    🔴 Declined <span>{declinedShops.length}</span>
  </button>

</div>


      {activeTab === "pending" && (
  shops.length === 0 ? (
    <p className="no-data">No shops waiting for approval.</p>
  ) : (
  <table className="shop-table">

    <thead>
      <tr>
        <th>ID</th>
        <th>Shop Name</th>
        <th>Owner</th>
        <th>Email</th>
        <th>Phone</th>
        <th>Business Type</th>
        <th>Registered On</th>
        <th>Actions</th>
      </tr>
    </thead>

    <tbody>
      {filterShops(shops).map((shop) => (
        <tr key={shop.id}>

          <td>{shop.id}</td>

          <td className="shop-name">
            {shop.shop_name}
          </td>

          <td>{shop.owner_name}</td>

          <td>{shop.email}</td>

          <td>{shop.phone || "-"}</td>

          <td>{shop.business_type}</td>

          <td>
            {new Date(shop.created_at).toLocaleString()}
          </td>

          <td className="actions">

            <button
              onClick={() => handleApprove(shop.id)}
              className="approve-btn"
            >
              ✔
            </button>

            <button
              onClick={() => handleDecline(shop.id)}
              className="decline-btn"
            >
              ✖
            </button>

          </td>

        </tr>
      ))}
    </tbody>

  </table>
  )
)}
      

      {/* APPROVED SHOPS */}
      {activeTab === "approved" && (
  <>
    {activeTab === "approved" && (
  approvedShops.length === 0 ? (
    <p className="no-data">No approved shops yet.</p>
  ) : (
    <table className="shop-table">

      <thead>
        <tr>
          <th>ID</th>
          <th>Shop Name</th>
          <th>Owner</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Business Type</th>
          <th>Approved On</th>
        </tr>
      </thead>

      <tbody>
        {filterShops(approvedShops).map((shop) => (
          <tr key={shop.id}>

            <td>{shop.id}</td>

            <td className="shop-name">
              {shop.shop_name}
            </td>

            <td>{shop.owner_name}</td>

            <td>{shop.email}</td>

            <td>{shop.phone || "-"}</td>

            <td>{shop.business_type}</td>

            <td>
              {new Date(shop.created_at).toLocaleString()}
            </td>

          </tr>
        ))}
      </tbody>

    </table>
  )
)}

  </>
)}
{/* DECLINED SHOPS */}
{activeTab === "declined" && (
  declinedShops.length === 0 ? (
    <p className="no-data">No declined shops.</p>
  ) : (
    <table className="shop-table">
      <thead>
        <tr>
          <th>ID</th>
          <th>Shop Name</th>
          <th>Owner</th>
          <th>Email</th>
          <th>Phone</th>
          <th>Business Type</th>
          <th>Registered On</th>
        </tr>
      </thead>

      <tbody>
        {filterShops(declinedShops).map((shop) => (
          <tr key={shop.id}>
            <td>{shop.id}</td>
            <td className="shop-name">{shop.shop_name}</td>
            <td>{shop.owner_name}</td>
            <td>{shop.email}</td>
            <td>{shop.phone}</td>
            <td>{shop.business_type}</td>
            <td>{new Date(shop.created_at).toLocaleString()}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
)}

    </div>
  );
};

export default AdminDashboard;