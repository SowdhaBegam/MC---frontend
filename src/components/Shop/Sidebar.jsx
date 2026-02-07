export default function Sidebar() {
  return (
    <aside className="w-56 bg-white border-r min-h-screen p-6">
      <ul className="space-y-4 text-sm">
        <li className="font-semibold text-indigo-600">Dashboard</li>
        <li className="text-gray-600">Orders</li>
        <li className="text-gray-600">Products</li>
        <li className="text-gray-600">Customers</li>
      </ul>
    </aside>
  );
}