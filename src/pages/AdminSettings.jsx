import React, { useState } from "react";
import "../styles/AdminSettings.css";

const AdminSettings = () => {

  const [maintenance, setMaintenance] = useState(false);
  const [registration, setRegistration] = useState(true);
  const [ordersEnabled, setOrdersEnabled] = useState(true);

  return (
    <div className="admin-settings-page">

      <h1 className="text-3xl font-bold mb-10 fade-in">
        Admin Settings
      </h1>

      {/* 🔥 PROFILE + SYSTEM SIDE BY SIDE */}
      <div className="settings-grid">

        {/* 🔹 ADMIN PROFILE */}
<div className="settings-card profile-enhanced">

  <div className="profile-top">
    <div className="profile-avatar-large">
      A
    </div>

    <div>
      <h2 className="settings-title">Admin Profile</h2>
      <p className="profile-subtitle">
        Manage your account details and security
      </p>
      <span className="role-badge">Super Admin</span>
    </div>
  </div>

  <div className="form-group mt-6">
    <input className="input-style" placeholder="Admin Name" />
    <input className="input-style" placeholder="Admin Email" />
    <input className="input-style" placeholder="Phone Number" />
    <input
      type="password"
      className="input-style"
      placeholder="Change Password"
    />
  </div>

  <button className="primary-btn mt-6">
    Update Profile
  </button>

</div>


        {/* 🔹 SYSTEM CONFIGURATION */}
        <div className="settings-card">
          <h2 className="settings-title">System Configuration</h2>

          <div className="form-group">
            <input className="input-style" placeholder="Platform Name" />
            <input type="email" className="input-style" placeholder="Support Email" />
            <input type="tel" className="input-style" placeholder="Contact Number" />

            <select className="input-style">
              <option>Select Default Currency</option>
              <option>INR</option>
              <option>USD</option>
              <option>SAR</option>
              <option>EUR</option>
            </select>

            <select className="input-style">
              <option>Select Timezone</option>
              <option>IST</option>
              <option>GMT</option>
              <option>AST</option>
              <option>EST</option>
            </select>
          </div>

          <button className="primary-btn mt-6">
            Save System Settings
          </button>
        </div>

      </div>


      {/* 🔥 PLATFORM CONTROL (FULL WIDTH BELOW) */}
      <div className="settings-card full-width-card">
        <h2 className="settings-title">Platform Control</h2>

        <div className="space-y-5">

          <Toggle
            label="Enable Shop Registration"
            
            state={registration}
            setState={setRegistration}
          />

          <Toggle
            label="Enable Orders"
            
            state={ordersEnabled}
            setState={setOrdersEnabled}
          />

          <Toggle
            label="Maintenance Mode"
            state={maintenance}
            setState={setMaintenance}
          />

          <input
            className="input-style"
            placeholder="Commission Percentage (%)"
          />

        </div>

        <button className="primary-btn mt-6">
          Save Platform Settings
        </button>
      </div>

    </div>
  );
};


/* 🔥 Reusable Toggle */
const Toggle = ({ label, state, setState }) => {
  return (
    <div className="toggle-row">
      <span className="toggle-label">{label}</span>

      <div
        onClick={() => setState(!state)}
        className={`toggle-modern ${state ? "active" : ""}`}
      >
        <div className="toggle-knob" />
      </div>
    </div>
  );
};


export default AdminSettings;