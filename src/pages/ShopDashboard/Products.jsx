import { useState, useEffect } from "react";
import NewProductModal from "../../components/Shop/NewProductModal";
import {
  getProductsAPI,
} from "../../services/productService";
import { deleteProductAPI } from "../../services/productService";
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
const deleteProduct = async (id) => {
  try {
    await deleteProductAPI(id);   // 🔥 REAL BACKEND DELETE
    setProducts(products.filter((p) => p.id !== id));
  } catch (err) {
    console.error("Delete failed", err);
  }
};

  const groupBySubCategory = (items) => {
  return items.reduce((acc, item) => {
    const key = item.subcategory || "Others";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
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

      <div className="products-grid-wrapper">
  {Object.entries(
    groupBySubCategory(
      products.filter((p) => {
        const query = search.toLowerCase();
        return (
          p.name?.toLowerCase().includes(query) ||
          p.category?.toLowerCase().includes(query) ||
          p.subcategory?.toLowerCase().includes(query)
        );
      })
    )
  ).map(([subCategory, items]) => (
    <div key={subCategory} className="subcategory-section">

      {/* SUB CATEGORY TITLE */}
      <h3 className="subcategory-title">
        {subCategory}
        <span className="count">({items.length})</span>
      </h3>

      {/* PRODUCTS GRID */}
      <div className="products-grid">
        {items.map((p) => {
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
                  <button className="delete-btn" onClick={() => setDeleteId(p.id)}>
  ❌ 
</button>


                </div>

                {p.final_price < p.price && (
                  <div className="discount-badge">
                    -{Math.round(((p.price - p.final_price) / p.price) * 100)}%
                  </div>
                )}
              </div>

              <div className="card-body">
                <h3>{p.name}</h3>

                <div className="price-row">
                  {p.final_price < p.price && (
                    <span className="mrp">₹{p.price}</span>
                  )}
                  <span className="final-price">₹{p.final_price}</span>
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
    </div>
  ))}
</div>
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