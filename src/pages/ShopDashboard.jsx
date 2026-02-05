import React from "react";

const ShopDashboard = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center">
        <h1 className="text-3xl font-bold text-indigo-600 mb-4">
          Shopkeeper Dashboard
        </h1>
        <p className="text-slate-600 mb-2">Welcome, {user?.name}</p>
        <p className="text-green-600 font-semibold">
          Your shop is approved ✅
        </p>
      </div>
    </div>
  );
};

export default ShopDashboard;
