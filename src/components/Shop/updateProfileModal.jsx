import { useEffect, useState } from "react";
import SuccessModal from "../common/SuccessModal";
import { updateVendorProfile } from "../../services/ProfileService";
import "../../styles/Shop/updateprofile.css";

export default function UpdateProfileModal({ open, onClose, profile }) {
  const [formData, setFormData] = useState({
    shop_name: "",
    owner_name: "",
    phone: "",
    address: "",
    opening_time: "",
    closing_time: "",
    email: "",
  });

  const [showSuccess, setShowSuccess] = useState(false);

  // Fill form when profile comes
  useEffect(() => {
    if (profile) {
      setFormData({
        shop_name: profile.shop_name || "",
        owner_name: profile.owner_name || "",
        phone: profile.phone || "",
        address: profile.address || "",
        opening_time: profile.opening_time || "",
        closing_time: profile.closing_time || "",
        email: profile.email || "",
      });
    }
  }, [profile]);

  if (!open) return null;

  // ✅ Update handler (NO logic change)
  const handleUpdate = async () => {
    try {
      await updateVendorProfile(formData);
      setShowSuccess(true);   // 🔥 show UI modal
    } catch (err) {
      console.error("Update failed", err);
    }
  };

  return (
    <>
      <div className="profile-overlay">
        <div className="update-card">

          {/* HEADER */}
          <div className="update-header">
            <div>
              <h3>Update Profile</h3>
              <p>{formData.email}</p>
            </div>
            <button className="close-btn" onClick={onClose}>✕</button>
          </div>

          {/* BODY */}
          <div className="update-body">

            <div className="form-row">
              <div className="form-group">
                <label>Shop Name</label>
                <input
                  value={formData.shop_name}
                  onChange={(e) =>
                    setFormData({ ...formData, shop_name: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Owner Name</label>
                <input
                  value={formData.owner_name}
                  onChange={(e) =>
                    setFormData({ ...formData, owner_name: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="form-group">
              <label>Contact</label>
              <input
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>

            <div className="form-group">
              <label>Address</label>
              <textarea
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>Opens At</label>
                <input
                  type="time"
                  value={formData.opening_time}
                  onChange={(e) =>
                    setFormData({ ...formData, opening_time: e.target.value })
                  }
                />
              </div>

              <div className="form-group">
                <label>Closes At</label>
                <input
                  type="time"
                  value={formData.closing_time}
                  onChange={(e) =>
                    setFormData({ ...formData, closing_time: e.target.value })
                  }
                />
              </div>
            </div>

          </div>

          {/* FOOTER */}
          <div className="update-footer">
            <button className="cancel-btn" onClick={onClose}>Cancel</button>
            <button className="save-btn" onClick={handleUpdate}>
              Update
            </button>
          </div>

        </div>
      </div>

      {/* ✅ SUCCESS MODAL */}
      <SuccessModal
        open={showSuccess}
        title="Profile Updated 🎉"
        message="Your profile details were updated successfully."
        onClose={() => {
          setShowSuccess(false);
          onClose(); // close update modal also
        }}
      />
    </>
  );
}