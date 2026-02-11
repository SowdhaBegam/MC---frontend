import React from "react";
import "../../styles/AddProduct.css";


const AddProduct = () => {
  return (
    <div className="addproduct-page">

      {/* 🔥 Banner */}
      <div className="addproduct-banner">
  <div className="banner-content banner-row">

    {/* LEFT SIDE */}
    <div className="banner-left">
      <h1 className="banner-title">Add Product Panel</h1>
    </div>

    {/* RIGHT SIDE */}
    <div className="banner-right">

      <div className="search-group">
        <input
          type="text"
          placeholder="Search Shop Name..."
          className="search-input"
        />
        <span className="search-icon">🔍</span>
      </div>

      <div className="search-group">
        <input
          type="text"
          placeholder="Search Category..."
          className="search-input"
        />
        <span className="search-icon">📂</span>
      </div>

    </div>

  </div>
</div>

     {/* 🔥 State Cards Section */}
<div className="stats-section">

  <div className="stat-card">
    <div className="stat-icon food-icon">
      🍔
    </div>
    <div>
      <p className="stat-label">Food</p>
      <h2 className="stat-number">120</h2>
    </div>
  </div>

  <div className="stat-card">
    <div className="stat-icon grocery-icon">
      🛒
    </div>
    <div>
      <p className="stat-label">Grocery</p>
      <h2 className="stat-number">95</h2>
    </div>
  </div>

  <div className="stat-card">
    <div className="stat-icon pharmacy-icon">
      💊
    </div>
    <div>
      <p className="stat-label">Pharmacy</p>
      <h2 className="stat-number">60</h2>
    </div>
  </div>

  <div className="stat-card">
    <div className="stat-icon electronics-icon">
      💻
    </div>
    <div>
      <p className="stat-label">Electronics & Appliances</p>
      <h2 className="stat-number">40</h2>
    </div>
  </div>

  <div className="stat-card">
    <div className="stat-icon cosmetics-icon">
      💄
    </div>
    <div>
      <p className="stat-label">Cosmetics</p>
      <h2 className="stat-number">75</h2>
    </div>
  </div>

</div>


    </div>
  );
};

export default AddProduct;