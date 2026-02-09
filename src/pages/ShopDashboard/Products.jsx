import { useState, useEffect } from "react";
import NewProductModal from "../../components/Shop/NewProductModal";
import { getProductsAPI } from "../../services/productService";
import "../../styles/Shop/Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async () => {
    try {
      const data = await getProductsAPI();
      console.log("🔥 API PRODUCTS RESPONSE:", data);
      setProducts(data);
    } catch (err) {
      console.error("Load Products Failed", err);
    }
  };

  const addProduct = async () => {
    await loadProducts();
    setOpenModal(false);
  };

  const deleteProduct = async (id) => {
    try {
      await fetch(
        `https://mc-platform-qwzw35zb4-sangeetha-lakshmis-projects.vercel.app/products/${id}`,
        { method: "DELETE" }
      );
      setProducts(products.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  return (
    <div className="products-page">
      <div className="catalog-banner">
        <div>
          <h2>All Products</h2>
          <p>ACTIVE LISTINGS : {products.length} PRODUCTS</p>
        </div>

        <button className="new-product-btn" onClick={() => setOpenModal(true)}>
          + NEW PRODUCT
        </button>
      </div>

      <div className="products-grid">
        {products.length === 0 && (
          <p style={{ color: "#9ca3af", fontSize: "14px" }}>
            No products yet. Click <strong>NEW PRODUCT</strong> to add.
          </p>
        )}

        {products.map((p) => {
          const imageUrl =
  !p.image || p.image === "default-product.png" || p.image === "image.jpg"
    ? "/image.jpg" // from public/image.jpg
    : `https://mc-platform-qwzw35zb4-sangeetha-lakshmis-projects.vercel.app/uploads/${p.image}`;

         
          return (
            <div key={p.id} className="product-card">
              <div className="img-wrapper">
                <img src={imageUrl} alt={p.name} />

                <div className="card-actions">
                  <button
                    onClick={() => {
                      setEditProduct(p);
                      setOpenModal(true);
                    }}
                  >
                    ✏️
                  </button>
                  <button onClick={() => deleteProduct(p.id)}>🗑️</button>
                </div>

                {p.discount > 0 && (
                  <div className="discount-badge">
                    -{Math.round((p.discount / p.price) * 100)}% OFF
                  </div>
                )}
              </div>

              <div className="card-body">
                <h3>{p.name}</h3>

                <div className="price-row">
                  {p.discount > 0 && (
                    <span className="mrp">₹{p.price}</span>
                  )}
                  <span className="final-price">
                    ₹{p.price - p.discount}
                  </span>
                </div>

                <div className="bottom-row">
                  <span className="stock-dot"></span>
                  <span>{p.stock} Units</span>

                  <span className={`status ${p.is_live ? "live" : "off"}`}>
                    {p.is_live ? "LIVE" : "OFF"}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <NewProductModal
        open={openModal}
        onClose={() => {
          setOpenModal(false);
          setEditProduct(null);
        }}
        onDeploy={addProduct}
        product={editProduct}
      />
    </div>
  );
}
