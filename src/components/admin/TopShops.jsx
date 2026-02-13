export default function TopShops() {
  const shops = [
    { name: "Tech Haven", sales: 90 },
    { name: "Urban Store", sales: 75 },
    { name: "Style Loft", sales: 60 }
  ];

  return (
    <div className="card-box">
      <h4>Top Selling Shops</h4>
      {shops.map((shop, i) => (
        <div key={i} className="bar-row">
          <span>{shop.name}</span>
          <div className="bar">
            <div
              className="bar-fill"
              style={{ width: `${shop.sales}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}