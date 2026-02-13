import API from "../../api/axios";
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
const [dummyProducts, setDummyProducts] = useState([
  {
    id: 1,
    name: "Chicken Biriyani",
    image: "/images/biriyani.jpg",
    price: 220,
    final_price: 180,
    is_live: true,
  },
  {
    id: 2,
    name: "Kerala Parotta",
    image: "/images/parotta.jpg",
    price: 40,
    final_price: 30,
    is_live: false,
  },
  {
    id: 3,
    name: "Masala Dosa",
    image: "/images/dosa.jpg",
    price: 120,
    final_price: 95,
    is_live: true,
  },
]);
const toggleDummyLive = (id) => {
  setDummyProducts((prev) =>
    prev.map((p) =>
      p.id === id ? { ...p, is_live: !p.is_live } : p
    )
  );
};




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

      await API.patch(
        `/api/products/${productId}/live`,
        {
          stock: product.stock,
          is_live: updatedStatus,
          prep_time: product.prep_time || 0,
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

         
        </div>
      </div>

      {/* ===== PRODUCTS BY SUBCATEGORY ===== */}
      <div className="products-grid-wrapper">
        {/* EMPTY STATE */}
{products.length === 0 && (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-8 max-w-5xl">



    {dummyProducts.map((product) => (
   <div
  key={product.id}
  className={`group relative rounded-2xl overflow-hidden
  transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl
  ${product.is_live
    ? "bg-white shadow-md"
    : "bg-gray-200 opacity-60 grayscale"}
  max-w-[350px] w-full

`}
>


        {/* IMAGE */}
        <div className="h-36 overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
          />
        </div>

        {/* BODY */}
        <div className="p-4">

          <h3 className="text-lg font-semibold text-gray-800">
            {product.name}
          </h3>

          {/* PRICE */}
          <div className="flex items-center gap-3 mt-2">
            <span className="text-gray-400 line-through text-sm">
              ₹{product.price}
            </span>

            <span className="px-3 py-1 text-white text-sm font-semibold rounded-full
              bg-gradient-to-r from-orange-500 to-pink-500 shadow-md">
              ₹{product.final_price}
            </span>
          </div>

          {/* LIVE TOGGLE */}
          <div className="flex justify-between items-center mt-5">
            <span className={`text-xs font-semibold
              ${product.is_live ? "text-green-600" : "text-gray-500"}`}>
              {product.is_live ? "LIVE" : "NOT LIVE"}
            </span>

     <button
  onClick={() => toggleDummyLive(product.id)}
  className={`relative w-11 h-6 rounded-full transition-colors duration-300
    ${product.is_live ? "bg-green-500" : "bg-gray-400"}`}
>
  <span
    className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full shadow transition-transform duration-300
      ${product.is_live ? "translate-x-5" : ""}`}
  />
</button>

          </div>

        </div>
      </div>
    ))}

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
                  const IMAGE_BASE = import.meta.env.VITE_IMAGE_URL ; 
                  const imageUrl =
  !p.image || p.image === "default-product.png" || p.image === "image.jpg"
    ? "/image.jpg"
    : `${IMAGE_BASE}/uploads/${p.image}`;



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
