import React, { useState, useEffect } from "react";
import "../styles/DeliveryAgents.css";
import { FaTrash, FaEdit } from "react-icons/fa";
import {
  getDeliveryAgents,
  deleteDeliveryAgent
} from "../services/deliveryAgentService";
const DeliveryAgents = () => {

    const [agents, setAgents] = useState([]);
    useEffect(() => {
  fetchAgents();
}, []);

const fetchAgents = async () => {
  try {
    const data = await getDeliveryAgents();
    setAgents(data);
  } catch (error) {
    console.error("Error fetching agents:", error);
  }
};

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

const handleDelete = async (id) => {
  try {
    await deleteDeliveryAgent(id);

    // Remove from UI
    setAgents((prev) =>
      prev.filter((agent) => agent.id !== id)
    );

  } catch (error) {
    console.error("Delete failed:", error);
  }
};

    return (
  <div className="agents-page">

    <h2 className="agent-title">Verified Delivery Agents</h2>

    <div className="agents-grid">
      {agents.map((agent) => (
        <div key={agent.id} className="agent-card">

          {/* DELETE */}
          <button
            className="delete-btn"
            onClick={() => handleDelete(agent.id)}
          >
            🗑
          </button>

          {/* DETAILS */}
          {/* HEADER */}
<div className="agent-header">
  <h3>{agent.name}</h3>
</div>

{/* CONTACT ROW */}
<div className="agent-contact">
  <span>📞 {agent.phone}</span>
  <span>|</span>
  <span>✉️ {agent.email}</span>
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
  <span>|</span>

  <a
    href={agent.driving_license_url}
    target="_blank"
    rel="noreferrer"
  >
    📄 View License
  </a>

</div>


          {/* GENERATE / TOGGLE BUTTON */}
          <button
            className="generate-btn"
            onClick={() => handleGenerate(agent.id)}
          >
            {agent.generated ? "Hide Credentials" : "Generate"}
          </button>

          {/* SLIDE PANEL */}
          {agent.generated && (
            <div className="generated-panel">
              <p><b>Unique ID:</b> {agent.uniqueId}</p>
              <p><b>Password:</b> {agent.password}</p>

              <button className="edit-icon">
                ✏️
              </button>
            </div>
          )}

        </div>
      ))}
    </div>

  </div>
);

};

export default DeliveryAgents;
