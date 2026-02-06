import "../../styles/Shop/updateprofile.css";

export default function UpdateProfileModal({ open, onClose }) {
  if (!open) return null;

  return (
    <div className="profile-overlay">
      <div className="update-card">

        {/* Header */}
        <div className="update-header">
          <div>
            <h3>Update Profile</h3>
            <p>owner@shop.com</p>
          </div>
          <button className="close-btn" onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="update-body">
          <div className="form-row">
            <div className="form-group">
              <label>Shop Name</label>
              <input defaultValue="Suresh Shop" />
            </div>
            <div className="form-group">
              <label>Owner Name</label>
              <input defaultValue="Suresh" />
            </div>
          </div>

          <div className="form-group">
            <label>Contact</label>
            <input defaultValue="9876543210" />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea defaultValue="4th Block, Koramangala, Bengaluru" />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Opens At</label>
              <input type="time" defaultValue="09:00" />
            </div>
            <div className="form-group">
              <label>Closes At</label>
              <input type="time" defaultValue="22:00" />
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="update-footer">
          <button className="cancel-btn" onClick={onClose}>Cancel</button>
          <button className="save-btn">Update</button>
        </div>
      </div>
    </div>
  );
}