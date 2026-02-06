import "../../styles/Shop/profile.css";


export default function ProfileModal({ open, onClose, onEdit }) {
  if (!open) return null;

  return (
    <div className="profile-overlay">
      <div className="profile-card">

        {/* Header */}
        <div className="profile-header">
          <div className="profile-left">
            <div className="profile-avatar">S</div>
            <div>
              <h3>Suresh</h3>
              <p>owner@shop.com</p>
            </div>
          </div>

          <div className="profile-actions">
            <button className="edit-btn" onClick={onEdit}>
              ✏️ Edit
            </button>
            <button className="close-btn" onClick={onClose}>
              ✕
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="profile-body">
          <div className="profile-row">
            <span className="label">ACCESS ROLE</span>
            <span className="value">SHOP</span>
          </div>

          <div className="profile-row">
            <span className="label">ACCOUNT STATUS</span>
            <span className="status approved">APPROVED</span>
          </div>

          <div className="info">
            <p><strong>Owner</strong><br />Suresh</p>
            <p><strong>Address</strong><br />4th Block, Koramangala, Bengaluru</p>
            <p><strong>Operational Hours</strong><br />09:00 – 22:00</p>
            <p><strong>Contact</strong><br />9876543210</p>
            <p><strong>Registered On</strong><br />31 January 2026</p>
          </div>
        </div>

        {/* Footer */}
        <button className="signout-btn">🚪 Secure Logout</button>
      </div>
    </div>
  );
}