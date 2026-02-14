import React, { useState, useEffect } from "react";
import "../styles/DeliveryAgents.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import {
  getDeliveryAgents,
  deleteDeliveryAgent
} from "../services/deliveryAgentService";
import { FaSearch } from "react-icons/fa";


const DeliveryAgents = () => {

  // 🔹 STATES
  const [agents, setAgents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteAgentId, setDeleteAgentId] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const [editingCreds, setEditingCreds] = useState(null);
  const [credData, setCredData] = useState({
    uniqueId: "",
    password: "",
  });

  // 🔹 FETCH FUNCTION (Moved ABOVE useEffect — only change)
  const fetchAgents = async () => {
  try {
    const res = await getDeliveryAgents();

    console.log("API RESPONSE:", res);

    // Handle all possible API formats
    const data = res?.data || res?.agents || res || [];

    setAgents(Array.isArray(data) ? data : []);

  } catch (error) {
    console.error("Error fetching agents:", error);
    setAgents([]);
  }
};


  // 🔹 EFFECT
  useEffect(() => {
    fetchAgents();
  }, []);

  // 🔹 HANDLERS

  const handleGenerate = (id) => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === id
          ? {
              ...agent,
              generated: !agent.generated,
              uniqueId: agent.generated
                ? agent.uniqueId
                : "AG" + Math.floor(1000 + Math.random() * 9000),
              password: agent.generated
                ? agent.password
                : Math.random().toString(36).slice(-8),
            }
          : agent
      )
    );
  };

  const handleDelete = async () => {
    try {
      await deleteDeliveryAgent(deleteAgentId);

      setAgents(prev =>
        prev.filter(agent => agent.id !== deleteAgentId)
      );

      setDeleteAgentId(null);
      setShowSuccess(true);

      setTimeout(() => setShowSuccess(false), 2500);

    } catch (error) {
      console.error("Delete failed:", error);
    }
  };

  const handleEditCreds = (agent) => {
    setEditingCreds(agent);

    setCredData({
      uniqueId: agent.uniqueId || "",
      password: agent.password || "",
    });
  };

  const handleCredChange = (e) => {
    setCredData({
      ...credData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSaveCreds = () => {
    setAgents((prev) =>
      prev.map((agent) =>
        agent.id === editingCreds.id
          ? {
              ...agent,
              uniqueId: credData.uniqueId,
              password: credData.password,
            }
          : agent
      )
    );

    setEditingCreds(null);
  };

  const filteredAgents = agents.filter((agent) =>
    agent.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    agent.phone?.includes(searchTerm)
  );

  return (
    <div className="agents-page">

      <div className="agents-header">

        <h2 className="agent-title">
          Verified Delivery Agents
        </h2>

        <div className="search-box">

  <FaSearch className="search-icon" />

  <input
    type="text"
    placeholder="Search by name, email, phone..."
    className="search-input"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />

</div>

      </div>

      <div className="agents-grid">
        {filteredAgents.map((agent) => (
          <div key={agent.id} className="agent-card">

            {/* DELETE */}
            <button
              className="delete-btn"
              onClick={() => setDeleteAgentId(agent.id)}
            >
              🗑
            </button>

            {/* HEADER */}
            <div className="agent-header">
              <h3>{agent.name}</h3>
            </div>

            {/* CONTACT ROW */}
            <div className="agent-contact">
              <span>📞 {agent.phone}</span>
              <span>|</span>
              <span>✉️ {agent.email}</span>
              <span>|</span>

              <a
                href={agent.driving_license_url}
                target="_blank"
                rel="noreferrer"
                className="license-link"
              >
                📄 View License
              </a>
            </div>

            {/* DETAILS ROW */}
            <div className="agent-info-row">
              <span>🪪 {agent.aadhar_number}</span>
              <span>|</span>
              <span>🧾 {agent.pan_number}</span>
              <span>|</span>
              <span>🏍️ {agent.vehicle_type}</span>
              <span>|</span>
              <span>🚗 {agent.vehicle_number}</span>
            </div>

            {/* GENERATE BUTTON */}
            <button
              className="generate-btn"
              onClick={() => handleGenerate(agent.id)}
            >
              {agent.generated ? "Hide Credentials" : "Generate"}
            </button>

            {/* CREDENTIAL PANEL */}
            {agent.generated && (
              <div className="generated-panel">
                <p><b>Unique ID:</b> {agent.uniqueId}</p>
                <p><b>Password:</b> {agent.password}</p>

                <button
                  className="edit-icon"
                  onClick={() => handleEditCreds(agent)}
                >
                  ✏️
                </button>
              </div>
            )}

          </div>
        ))}
      </div>

      {/* EDIT CREDENTIAL MODAL */}
      {editingCreds && (
        <div className="modal-overlay">
          <div className="modal">

            <h3 className="modal-title">Edit Credentials</h3>

            <label>Unique ID</label>
            <input
              name="uniqueId"
              value={credData.uniqueId}
              onChange={handleCredChange}
              placeholder="Unique ID"
            />

            <label>Password</label>
            <input
              name="password"
              value={credData.password}
              onChange={handleCredChange}
              placeholder="Password"
            />

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setEditingCreds(null)}
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={handleSaveCreds}
              >
                ✔ Save Changes
              </button>
            </div>

          </div>
        </div>
      )}

      {/* DELETE CONFIRMATION MODAL */}
      {deleteAgentId && (
        <div className="modal-overlay">
          <div className="modal">

            <h3 className="modal-title">Delete Agent?</h3>

            <p>Are you sure you want to delete this profile?</p>

            <div className="modal-actions">
              <button
                className="cancel-btn"
                onClick={() => setDeleteAgentId(null)}
              >
                Cancel
              </button>

              <button
                className="delete-confirm-btn"
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>

          </div>
        </div>
      )}

      {/* SUCCESS MESSAGE */}
      {showSuccess && (
        <div className="success-toast">
          ✅ Profile deleted successfully
        </div>
      )}

    </div>
  );
};

export default DeliveryAgents;
