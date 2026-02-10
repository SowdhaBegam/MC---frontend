import axios from "axios";
import { useState, useEffect } from "react";
import NewProductModal from "../../components/Shop/NewProductModal";
import {
  getProductsAPI,
  deleteProductAPI,
} from "../../services/productService";
import "../../styles/Shop/Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [search, setSearch] = useState("");

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

  /* DELETE PRODUCT */
  const deleteProduct = async (id) => {
    try {
      await deleteProductAPI(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (err) {
      console.error("Delete failed", err);
    }
  };

  /* GROUP BY SUBCATEGORY */
  const groupBySubCategory = (items) => {
    return items.reduce((acc, item) => {
      const key = item.subcategory || "Others";
      if (!acc[key]) acc[key] = [];
      acc[key].push(item);
      return acc;
    }, {});
  };

  /* LIVE TOGGLE */
  const toggleLiveStatus = async (product) => {
    try {
      const updatedStatus = !product.is_live;
      const productId = product.id || product._id;

      await axios.patch(
        `https://mc-platform-lvmhp50gy-sangeetha-lakshmis-projects.vercel.app/api/products/${productId}/live`,
        {
          stock: product.stock,
          is_live: updatedStatus,
          prep_time: product.prep_time || 0,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      setProducts((prev) =>
        prev.map((p) =>
          (p.id || p._id) === productId
            ? { ...p, is_live: updatedStatus }
            : p
        )
      );
    } catch (err) {
      console.error("Failed to update live status", err);
      alert("Unable to update product live status");
    }
  };

  /* FILTERED PRODUCTS */
  const filteredProducts = products.filter((p) => {
    const q = search.toLowerCase();
    return (
      p.name?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.subcategory?.toLowerCase().includes(q)
    );
  });

  return (
    <div className="products-page">
      {/* ===== HEADER ===== */}
      <div className="catalog-banner">
        <div>
          <h2>All Products</h2>
          <p>ACTIVE LISTINGS : {products.length} PRODUCTS</p>
        </div>

        <div className="catalog-actions">
          <input
            type="text"
            className="catalog-search"
            placeholder="Search by product"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <button
            className="new-product-btn"
            onClick={() => setOpenModal(true)}
          >
            + NEW PRODUCT
          </button>
        </div>
      </div>

      {/* ===== PRODUCTS BY SUBCATEGORY ===== */}
      <div className="products-grid-wrapper">
        {/* EMPTY STATE */}
{products.length === 0 && (
  <div className="empty-state-pro">
    <div className="empty-content">
      <div className="empty-illustration">
        <svg
          width="120"
          height="120"
          viewBox="0 0 200 200"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="boxGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#ff7a18" />
              <stop offset="100%" stopColor="#ff3d77" />
            </linearGradient>
          </defs>

          {/* Shadow */}
          <ellipse cx="100" cy="165" rx="55" ry="12" fill="#e5e7eb" />

          {/* Box */}
          <rect
            x="45"
            y="70"
            width="110"
            height="70"
            rx="12"
            fill="url(#boxGrad)"
          />

          {/* Box lid */}
          <rect
            x="45"
            y="55"
            width="110"
            height="25"
            rx="10"
            fill="#ffb37a"
          />

          {/* Lines */}
          <line x1="70" y1="95" x2="130" y2="95" stroke="white" strokeWidth="4" strokeLinecap="round"/>
          <line x1="70" y1="110" x2="120" y2="110" stroke="white" strokeWidth="4" strokeLinecap="round"/>
        </svg>
      </div>

      <h2>No Products Yet</h2>
      <p>
        Your product catalog is empty. Add items to start selling and manage your inventory.
      </p>
    </div>
  </div>
)}



        {Object.entries(groupBySubCategory(filteredProducts)).map(
          ([subCategory, items]) => (
            <div key={subCategory} className="subcategory-section">
              <h3 className="subcategory-title">
                {subCategory}
                <span className="count"> ({items.length})</span>
              </h3>

              <div className="products-grid">
                {items.map((p) => {
                  const imageUrl =
                    !p.image ||
                    p.image === "default-product.png" ||
                    p.image === "image.jpg"
                      ? "/image.jpg"
                      : `https://mc-platform-qwzw35zb4-sangeetha-lakshmis-projects.vercel.app/uploads/${p.image}`;

                  return (
                    <div
  key={p.id}
  className={`product-card ${!p.is_live ? "card-off" : ""}`}
>
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
                          <button
                            className="delete-btn"
                            onClick={() => setDeleteId(p.id)}
                          >
                            
🗑️ 
                          </button>
                        </div>

                        {p.final_price < p.price && (
                          <div className="discount-badge">
                            -{Math.round(
                              ((p.price - p.final_price) / p.price) * 100
                            )}
                            %
                          </div>
                        )}
                      </div>

                      <div className="card-body">
                        <h3>{p.name}</h3>

                        <div className="price-row">
                          <span className="final-price">
                            ₹{p.final_price}
                          </span>
                          {p.final_price < p.price && (
                            <span className="mrp">₹{p.price}</span>
                          )}
                        </div>

                        <div className="bottom-row">
                          <div className="stock-section">
  <span className="units-text">
  {p.category === "Food"
    ? `⏱ ${p.preparing_minutes} min`
    : `Available: ${p.stock}`}
</span>


  

                          {/* LIVE TOGGLE */}
                          <button
                            onClick={() => toggleLiveStatus(p)}
                            className={`
                              relative inline-flex h-6 w-11 items-center rounded-full
                              transition-colors duration-300
                              ${p.is_live ? "bg-green-500" : "bg-gray-300"}
                            `}
                          >
                            <span
                              className={`
                                inline-block h-5 w-5 transform rounded-full bg-white shadow
                                transition-transform duration-300
                                ${p.is_live ? "translate-x-5" : "translate-x-1"}
                              `}
                            />
                          </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )
        )}

        {/* NO RESULTS */}
        {products.length > 0 && filteredProducts.length === 0 && (
          <p style={{ color: "#9ca3af", fontSize: "14px" }}>
            No products found for "<strong>{search}</strong>"
          </p>
        )}
      </div>

      {/* DELETE CONFIRM */}
      {deleteId && (
        <div className="confirm-overlay">
          <div className="confirm-box">
            <h3>Delete Product?</h3>
            <p>Are you sure you want to delete this product?</p>

            <div className="confirm-actions">
              <button
                className="cancel-btn"
                onClick={() => setDeleteId(null)}
              >
                No
              </button>

              <button
                className="confirm-btn"
                onClick={async () => {
                  await deleteProduct(deleteId);
                  setDeleteId(null);
                }}
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== MODAL ===== */}
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
