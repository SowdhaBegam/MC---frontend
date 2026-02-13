export default function LatestOrders() {
  const orders = [
    { id: "#ORD-456", amount: "₹2,400", status: "Completed" },
    { id: "#ORD-455", amount: "₹780", status: "Pending" },
    { id: "#ORD-454", amount: "₹1,520", status: "Completed" }
  ];

  return (
    <div className="card-box">
      <h4>Latest Orders</h4>
      {orders.map((order, i) => (
        <div key={i} className="list-row">
          <span>{order.id} - {order.amount}</span>
          <small>{order.status}</small>
        </div>
      ))}
    </div>
  );
}