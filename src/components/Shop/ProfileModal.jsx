import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getVendorProfile } from "../../services/ProfileService";
import "../../styles/Shop/profile.css";

export default function ProfileModal({ open, onClose, onEdit }) {
  const navigate = useNavigate();          // ✅ FIX: hook at top
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    if (open) fetchProfile();
  }, [open]);

  const fetchProfile = async () => {
    try {
      const vendor = await getVendorProfile();
      console.log("PROFILE FROM API 👉", vendor);
      setProfile(vendor);
    } catch (err) {
      console.error("Profile API error", err);
    }
  };

  // ✅ Secure Logout
  const handleLogout = () => {
    localStorage.removeItem("token");
    onClose();
    navigate("/"); // change to /login if needed
  };

  if (!open) return null;

  return (
    <div className="profile-overlay">
      <div className="profile-card">

        {/* HEADER */}
        <div className="profile-header">
          <div className="profile-left">
            <div className="profile-avatar">
              {profile?.owner_name?.charAt(0)}
            </div>
            <div>
              <h3>{profile?.owner_name}</h3>
              <p className="shop-name">{profile?.shop_name}</p>
              <p>{profile?.email}</p>
            </div>
          </div>

          <div className="profile-actions">
            <button
              className="edit-btn"
              onClick={() => onEdit(profile)}
            >
              ✏️ Edit
            </button>
            <button className="close-btn" onClick={onClose}>✕</button>
          </div>
        </div>

    {/* BODY */}
<div className="profile-body">

  {/* META */}
  <div className="profile-meta">
    <div className="meta-box">
      <span>ACCESS ROLE</span>
      <strong>🛒 SHOP</strong>
    </div>

    <div className="meta-box status">
      <span>ACCOUNT STATUS</span>
      <strong>✅ APPROVED</strong>
    </div>
  </div>

  {/* DETAILS */}
  <div className="info-grid">

    <div className="info-item">
      <strong>👤 Owner</strong>
      <p>{profile?.owner_name}</p>
    </div>

    <div className="info-item">
      <strong>🏪 Shop Name</strong>
      <p>{profile?.shop_name}</p>
    </div>

    <div className="info-item full">
      <strong>📍 Address</strong>
      <p>{profile?.address}</p>
    </div>

    <div className="info-item">
      <strong>⏰ Operational Hours</strong>
      <p>{profile?.opening_time || "-"} – {profile?.closing_time || "-"}</p>
    </div>

    <div className="info-item">
      <strong>📞 Contact</strong>
      <p>{profile?.phone}</p>
    </div>

    <div className="info-item full">
      <strong>📅 Registered On</strong>
      <p>
        {profile?.created_at
          ? new Date(profile.created_at).toDateString()
          : "-"}
      </p>
    </div>

  </div>
</div>


        {/* LOGOUT */}
        <button className="signout-btn" onClick={handleLogout}>
          🚪 Secure Logout
        </button>

      </div>
    </div>
  );
}