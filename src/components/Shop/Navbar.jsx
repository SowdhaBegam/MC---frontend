import { NavLink } from "react-router-dom";
import { useState } from "react";
import ProfileModal from "./ProfileModal";
import UpdateProfileModal from "./updateProfileModal";

export default function Navbar() {
  const [openProfile, setOpenProfile] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);

  const tabClass = ({ isActive }) =>
    `px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
     ${
       isActive
         ? "bg-white text-indigo-600 shadow-md"
         : "text-gray-500 hover:text-indigo-500"
     }`;

  return (
    <>
      <header className="h-16 bg-white border-b flex items-center justify-between px-8">

        {/* LEFT : LOGO + NAME */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-indigo-600 text-white 
                          flex items-center justify-center font-bold">
            N
          </div>
          <div>
            <p className="text-sm font-semibold leading-none">suresh</p>
            <p className="text-[11px] text-gray-400">FOOD PORTAL</p>
          </div>
        </div>

        {/* CENTER : TABS */}
        <div className="bg-gray-100 rounded-full p-1 flex gap-1">
         <NavLink to="/shop-dashboard" end className={tabClass}>
  Overview
</NavLink>


          <NavLink to="/shop-dashboard/orders"
            className={tabClass}
          >
            Orders
          </NavLink>

          <NavLink to="/shop-dashboard/products"
            className={tabClass}
          >
            Catalog
          </NavLink>
        </div>

        {/* RIGHT : STATUS + PROFILE */}
        <div className="flex items-center gap-5">

          {/* STATUS */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-gray-400">STATUS</span>
            <span className="flex items-center gap-1 text-green-600 font-medium">
              Active
              <span className="w-2 h-2 rounded-full bg-green-500"></span>
            </span>
          </div>

          {/* PROFILE */}
          <div
            className="w-9 h-9 rounded-full bg-indigo-100 text-indigo-600 
                       flex items-center justify-center font-semibold cursor-pointer"
            onClick={() => setOpenProfile(true)}
          >
            S
          </div>
        </div>
      </header>

      {/* PROFILE MODAL */}
      <ProfileModal
        open={openProfile}
        onClose={() => setOpenProfile(false)}
        onEdit={() => {
          setOpenProfile(false);
          setOpenEdit(true);
        }}
      />

      {/* UPDATE PROFILE MODAL */}
      <UpdateProfileModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
      />
    </>
  );
}