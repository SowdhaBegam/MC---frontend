import { useState, useEffect } from "react";
import NewProductModal from "../components/NewProductModal";
import "../styles/products.css";

export default function Products({ products, setProducts }) {

  const [openModal, setOpenModal] = useState(false);

  // ✅ STEP 1: App.jsx-la irundhu vandha products
  // page refresh aanaal localStorage-la irundhu restore
  useEffect(() => {
    const saved = localStorage.getItem("products");
    if (saved && products.length === 0) {
      setProducts(JSON.parse(saved));
    }
  }, []);

  // ✅ STEP 2: products change aanaal localStorage update
  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(products));
  }, [products]);

  // 🔥 modal-la irundhu product add
  const addProduct = (product) => {
    setProducts(prev => [...prev, product]);
    setOpenModal(false);
  };

  return (
    <div className="products-page">

      {/* 🔥 Gradient Header */}
      <div className="catalog-banner">
        <div>
          <h2>Master Catalog</h2>
          <p>ACTIVE LISTINGS : {products.length} PRODUCTS</p>
        </div>

        <button
          className="new-product-btn"
          onClick={() => setOpenModal(true)}
        >
          + NEW PRODUCT
        </button>
      </div>

      {/* 🧾 Products Grid */}
      <div className="products-grid">
        {products.length === 0 && (
          <p style={{ color: "#9ca3af", fontSize: "14px" }}>
            No products yet. Click <strong>NEW PRODUCT</strong> to add.
          </p>
        )}

        {products.map((p) => (
          <div key={p.id} className="product-card">
            <img src={p.image} alt={p.name} />

            <div className="product-info">
              <h4>{p.name}</h4>
              <strong>₹{p.finalPrice}</strong>

              <div className="live-badge">LIVE</div>
            </div>
          </div>
        ))}
      </div>

      {/* 🪟 Modal */}
      <NewProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onDeploy={addProduct}
      />
    </div>
  );
}