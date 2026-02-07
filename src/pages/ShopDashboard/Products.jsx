import { useState, useEffect } from "react";
import NewProductModal from "../../components/Shop/NewProductModal";
import { getProductsAPI } from "../../services/productService";
import "../../styles/Shop/Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProductsAPI();
      setProducts(data);
    } catch (err) {
      console.error("Load Products Failed");
    }
  };

  // 🔥 AFTER ADDING PRODUCT → RELOAD FROM BACKEND
  const addProduct = async () => {
    await loadProducts();
    setOpenModal(false);
  };

  return (
    <div className="products-page">
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

      <div className="products-grid">
        {products.length === 0 && (
          <p style={{ color: "#9ca3af", fontSize: "14px" }}>
            No products yet. Click <strong>NEW PRODUCT</strong> to add.
          </p>
        )}

        {products.map((p) => (
  <div key={p.id} className="product-card">
    <img
      src={`https://mc-platform-3zu9n1qmr-sangeetha-lakshmis-projects.vercel.app/uploads/${p.image}`}
      alt={p.name}
    />

    <div className="product-info">
      <h4>{p.name}</h4>

      <strong>₹{p.final_price}</strong>

      <div className={`live-badge ${p.is_live ? "live" : "off"}`}>
        {p.is_live ? "LIVE" : "OFF"}
      </div>
    </div>
  </div>
))}

      </div>

      <NewProductModal
        open={openModal}
        onClose={() => setOpenModal(false)}
        onDeploy={addProduct}
      />
    </div>
  );
}
