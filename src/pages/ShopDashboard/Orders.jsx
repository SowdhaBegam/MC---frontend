import { useState } from "react";
import "../styles/orders.css";

export default function Orders() {

  // 🔥 STEP 1: Orders state
  const [orders, setOrders] = useState([
    {
      id: 101,
      customer: "Rahul Sharma",
      items: ["Butter Chicken"],
      amount: 700,
      time: "04:55 PM",
      status: "pending",
    },
    {
      id: 102,
      customer: "Priya Verma",
      items: ["Masala Dosa"],
      amount: 240,
      time: "04:55 PM",
      status: "pending",
    },
    {
      id: 103,
      customer: "Amit Patel",
      items: ["Butter Chicken", "Masala Dosa"],
      amount: 510,
      time: "04:55 PM",
      status: "pending",
    },
  ]);

  // 🔥 STEP 2: Accept order handler
  const acceptOrder = (id) => {
    setOrders(
      orders.map((order) =>
        order.id === id
          ? { ...order, status: "completed" }
          : order
      )
    );
  };

  return (
    <div className="orders-page">
      <h2 className="orders-title">Order Archive</h2>

      <div className="orders-grid">
        {orders.map((order) => (
          <div
            key={order.id}
            className={`order-card ${order.status}`}
          >
            {/* Header */}
            <div className="order-header">
              <h4>{order.customer}</h4>
              <span className="amount">₹{order.amount}</span>
            </div>

            {/* Items */}
            <ul className="items">
              {order.items.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            {/* Footer */}
            <div className="order-footer">
              <span className="time">{order.time}</span>

              {order.status === "pending" ? (
                <button
                  className="accept-btn"
                  onClick={() => acceptOrder(order.id)}
                >
                  ACCEPT ORDER
                </button>
              ) : (
                <div className="handled">
                  ✅ ORDER HANDLED
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}