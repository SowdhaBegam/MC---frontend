import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/AdminShopProducts.css";
import NewProductModal from "../../components/Shop/NewProductModal";

const AdminShopProducts = () => {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const handleDeploy = () => {
    setOpenModal(false);
  };
  const { id } = useParams();
console.log("Shop ID:", id);


  return (
    <div className="admin-products-page">

      {/* 🔥 HEADER SECTION (NO BANNER) */}
      <div className="products-header">

        {/* LEFT SIDE */}
        <div>
          <h1 className="products-title">
            Seetha Foods
          </h1>

          <p className="products-subtitle">
            ACTIVE LISTINGS : {products.length} PRODUCTS
          </p>
        </div>

        {/* RIGHT SIDE */}
        <div className="products-actions">
          <input
            type="text"
            placeholder="Search by product"
            className="product-search"
          />

          <button
            className="new-product-btn"
            onClick={() => setOpenModal(true)}
          >
            + NEW PRODUCT
          </button>
        </div>
      </div>
      {/* 🔥 FOOD SUB CATEGORY SECTION ADDED HERE */}
      <div className="category-section">
        <h3 className="category-title">Food Categories</h3>

        <div className="category-cards">
          {[
            { name: "Fruits", icon: "🍎" },
            { name: "Vegetables", icon: "🥦" },
            { name: "Dairy", icon: "🥛" },
            { name: "Snacks", icon: "🍟" },
            { name: "Beverages", icon: "🥤" },
            { name: "Spices", icon: "🌶️" },
            { name: "Bakery", icon: "🍞" },
            { name: "Meat", icon: "🍗" },
          ].map((item, index) => (
            <div key={index} className="category-card">
              <div className="category-icon">{item.icon}</div>
              <span>{item.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 🔥 Modal */}
      <NewProductModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditProduct(null);
        }}
        onDeploy={handleDeploy}
        product={editProduct}
      />

    </div>
  );
};

export default AdminShopProducts;