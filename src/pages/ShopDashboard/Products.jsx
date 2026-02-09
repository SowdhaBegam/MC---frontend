import axios from "axios";
import { useState, useEffect } from "react";
import NewProductModal from "../../components/Shop/NewProductModal";
import {
  getProductsAPI
} from "../../services/productService";
import "../../styles/Shop/Products.css";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [openModal, setOpenModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);
  
  
  const toggleLiveStatus = async (product) => {
  try {
    const updatedStatus = !product.is_live;
    const productId = product.id || product._id;

    console.log("TOGGLING PRODUCT:", product);

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

    // ✅ Update UI instantly
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
        <div className="catalog-actions">
          {/* 🔍 SEARCH BAR */}
          <input
            type="text"
            className="catalog-search"
            placeholder="Search by category"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />


        <button className="new-product-btn" onClick={() => setOpenModal(true)}>
          + NEW PRODUCT
        </button>
      </div>
      </div>

      <div className="products-grid">
        {products.length === 0 && (
          <p style={{ color: "#9ca3af", fontSize: "14px" }}>
            No products yet. Click <strong>NEW PRODUCT</strong> to add.
          </p>
        )}

        {products
          .filter((p) => {
            const query = search.toLowerCase();

            return (
              p.name?.toLowerCase().includes(query) ||
              p.category?.toLowerCase().includes(query) ||
              p.subcategory?.toLowerCase().includes(query)
            );
          })
          .map((p) => {
            const imageUrl =
              !p.image ||
              p.image === "default-product.png" ||
              p.image === "image.jpg"
                ? "/image.jpg"
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

                {p.final_price < p.price && (
  <div className="discount-badge">
    -{Math.round(((p.price - p.final_price) / p.price) * 100)}% OFF
  </div>
)}

              </div>

              <div className="card-body">
                <h3>{p.name}</h3>

                <div className="price-row">
  {p.final_price < p.price && (
    <span className="mrp">₹{p.price}</span>
  )}

  <span className="final-price">
    ₹{p.final_price}
  </span>
</div>

                <div className="bottom-row">
                  <span className="stock-dot"></span>
                  <span>{p.stock} Units</span>

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
          );
        })}
        {/* 🔍 NO RESULTS STATE */}
        {products.length > 0 &&
          products.filter((p) => {
            const query = search.toLowerCase();
            return (
              p.name?.toLowerCase().includes(query) ||
              p.category?.toLowerCase().includes(query) ||
              p.subcategory?.toLowerCase().includes(query)
            );
          }).length === 0 && (
            <p style={{ color: "#9ca3af", fontSize: "14px" }}>
              No products found for "<strong>{search}</strong>"
            </p>
          )}
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
