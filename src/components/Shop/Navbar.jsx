import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";
import ProfileModal from "./ProfileModal";
import UpdateProfileModal from "./updateProfileModal";
import "../../App.css";

export default function Navbar() {
  const [showOfflinePopup, setShowOfflinePopup] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [shopActive, setShopActive] = useState(true);
  

// 🆕 Now profile data comes from localStorage
  const [profileData, setProfileData] = useState(
    JSON.parse(localStorage.getItem("profileData")) || {}
  );

  // 🆕 Listen when profile updates anywhere in app
  useEffect(() => {
    const updateProfile = () => {
      const latest = JSON.parse(localStorage.getItem("profileData"));
      setProfileData(latest);
    };

    window.addEventListener("profileUpdated", updateProfile);

    return () => {
      window.removeEventListener("profileUpdated", updateProfile);
    };
  }, []);

  /* TAB STYLE */
  const tabClass = ({ isActive }) =>
    `px-5 py-2 rounded-full text-sm font-medium transition-all duration-300
    ${
      isActive
        ? shopActive
          ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white shadow-md"
          : "bg-white text-gray-400 shadow"
        : shopActive
        ? "text-gray-500 hover:text-pink-500"
        : "text-gray-300"
    }`;

  return (
    <>
      <header className="h-16 bg-white border-b flex items-center justify-between px-8">

        {/* LEFT */}
        <div className="flex items-center gap-3">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-white transition
            ${
              shopActive
                ? "bg-gradient-to-r from-orange-500 to-pink-500"
                : "bg-gray-300"
            }`}
          >
            {profileData?.owner_name?.charAt(0)?.toUpperCase() || "N"} {/* 🆕 */}
          </div>

          <div>
            <p className="text-sm font-semibold leading-none">
              {profileData?.owner_name || "User"} {/* 🆕 */}
            </p>
          </div>

          <div>
            <p className="text-[11px] text-gray-400">FOOD PORTAL</p>
          </div>
        </div>

        {/* CENTER */}
        <div className="bg-gray-100 rounded-full p-1 flex gap-1">
          <NavLink to="/shop-dashboard" end className={tabClass}>
            Overview
          </NavLink>
          <NavLink to="/shop-dashboard/orders" className={tabClass}>
            Orders
          </NavLink>
          <NavLink to="/shop-dashboard/products" className={tabClass}>
            Products
          </NavLink>
        </div>

        {/* RIGHT */}
        <div className="flex items-center gap-5">

          {/* STATUS TOGGLE */}
          <div className="flex items-center gap-3 text-xs w-[150px] justify-end">

            {/* ✅ TOGGLE (UI RESTORED, LOGIC SAME) */}
            <div
              onClick={() => {
                setShopActive((prev) => {
                  const next = !prev;

                  if (!next) {
                    setShowOfflinePopup(true);
                    setTimeout(() => setShowOfflinePopup(false), 3000);
                  }

                  return next;
                });
              }}
              className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-all duration-300
              ${
                shopActive
                  ? "bg-gradient-to-r from-orange-500 to-pink-500"
                  : "bg-gray-300"
              }`}
            >
              <div
                className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300
                ${shopActive ? "translate-x-5" : "translate-x-0"}`}
              />
            </div>

            <span
              className={`font-medium w-[65px] ${
                shopActive
                  ? "bg-gradient-to-r from-orange-500 to-pink-500 bg-clip-text text-transparent"
                  : "text-gray-400"
              }`}
            >
              {shopActive ? "Active" : "Inactive"}
            </span>
          </div>

          {/* PROFILE */}
          <div
            className={`w-9 h-9 rounded-full flex items-center justify-center font-semibold cursor-pointer transition-all duration-300
            ${
              shopActive
                ? "bg-gradient-to-r from-orange-500 to-pink-500 text-white"
                : "bg-gray-200 text-gray-500"
            }`}
            onClick={() => setOpenProfile(true)}
          >
            {profileData?.owner_name?.charAt(0)?.toUpperCase() || " "} {/* 🆕 */}
          </div>
        </div>
      </header>

      {/* PROFILE MODAL */}
      <ProfileModal
        open={openProfile}
        onClose={() => setOpenProfile(false)}
        onEdit={(data) => {
          setProfileData(data);
          setOpenProfile(false);
          setOpenEdit(true);
        }}
      />

      {/* UPDATE PROFILE */}
      <UpdateProfileModal
        open={openEdit}
        onClose={() => setOpenEdit(false)}
        profile={profileData}
      />

      {/* TOP OFFLINE POPUP */}
      {showOfflinePopup && (
        <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 animate-slide-down">
          <div className="bg-white border border-gray-200 shadow-lg rounded-lg px-6 py-3 flex items-center gap-3">
            <span className="text-orange-500 text-lg">⚠</span>
            <div>
              <p className="font-semibold text-sm text-gray-800">
                You are offline
              </p>
              <p className="text-xs text-gray-500">
                New orders won’t be received while your shop is inactive.
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}