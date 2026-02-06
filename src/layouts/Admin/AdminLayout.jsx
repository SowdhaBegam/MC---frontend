import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  return (
    <div className="admin-layout">
      <Sidebar />
      <div className="admin-content">
        <Outlet />   {/* loads Dashboard / Shops / Orders / Settings */}
      </div>
    </div>
  );
};

export default AdminLayout;
