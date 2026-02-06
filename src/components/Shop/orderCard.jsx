import { useState } from "react";
import "../../styles/Shop/orderCard.css";

export default function OrderCard({ name, amount, id }) {
  const [status, setStatus] = useState("received");

  const renderButton = () => {
    switch (status) {
      case "received":
        return (
          <div className="order-actions">
            <button className="accept-btn" onClick={() => setStatus("accepted")}>
              ACCEPT
            </button>
            <button className="reject-btn">✕</button>
          </div>
        );

      case "accepted":
        return (
          <button
            className="start-prep-btn"
            onClick={() => setStatus("preparing")}
          >
            🍳 START PREP
          </button>
        );

      case "preparing":
        return (
          <button
            className="mark-ready-btn"
            onClick={() => setStatus("ready")}
          >
            ✅ MARK READY
          </button>
        );

      case "ready":
        return (
          <button
            className="dispatch-btn"
            onClick={() => setStatus("dispatched")}
          >
            🚚 DISPATCH
          </button>
        );

      case "dispatched":
        return (
          <div className="order-complete">
            ✔ ORDER COMPLETED
          </div>
        );

      default:
        return null;
    }
  };

  const statusText = {
    received: "RECEIVED",
    accepted: "ACCEPTED",
    preparing: "PREPARING",
    ready: "READY FOR PICKUP",
    dispatched: "COMPLETED",
  };

  return (
    <div className="order-card">
      <div className="order-left"></div>

      <div>
        {/* HEADER */}
        <div className="order-header">
          <div>
            <h4>{name}</h4>
            <span className="text-xs text-gray-400">#{id}</span>
          </div>
          <span className="amount">₹{amount}</span>
        </div>

        {/* ITEMS */}
        <div className="items">
          <div className="item-pill">2× Butter Chicken</div>
          <div className="item-pill">2× Masala Dosa</div>
        </div>

        {/* TIME */}
        <div className="time">🕒 05:11 PM</div>

        {/* ACTION */}
        <div className="action-wrap">
          {renderButton()}
        </div>

        {/* STATUS */}
        <div className="status-text">{statusText[status]}</div>
      </div>
    </div>
  );
}