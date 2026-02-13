export default function RecentShops() {
  const shops = [
    { name: "Fresh Mart", time: "2 mins ago" },
    { name: "Urban Store", time: "15 mins ago" },
    { name: "Style Loft", time: "30 mins ago" }
  ];

  return (
    <div className="card-box">
      <h4>Latest Shop Registrations</h4>
      {shops.map((shop, i) => (
        <div key={i} className="list-row">
          <span>{shop.name}</span>
          <small>{shop.time}</small>
        </div>
      ))}
    </div>
  );
}