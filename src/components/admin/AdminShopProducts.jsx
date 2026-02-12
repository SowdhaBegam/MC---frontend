import React, { useState } from "react";
import { useParams,useLocation } from "react-router-dom";
import "../../styles/AdminShopProducts.css";
import NewProductModal from "../../components/Shop/NewProductModal";

const AdminShopProducts = () => {
  const [products, setProducts] = useState([
  {
    name: "Chicken Biryani",
    category: "Food",
    subcategory: "Rice",
    final_price: 200,
    mrp: 250,
    preparation_time: 20,
    food_type: "Non-Veg",
    is_active: true
  },
  {
    name: "Falooda",
    category: "Food",
    subcategory: "Desserts",
    final_price: 150,
    mrp: 200,
    preparation_time: 15,
    food_type: "veg",
    is_active: true
  },
  {
    name: "Veg Fried Rice",
    category: "Food",
    subcategory: "Rice",
    final_price: 120,
    mrp: 160,
    preparation_time: 18,
    food_type: "Veg",
    is_active: true
  },
  {
    name: "Mutton Curry",
    category: "Food",
    subcategory: "Gravy",
    final_price: 280,
    mrp: 320,
    preparation_time: 30,
    food_type: "Non-Veg",
    is_active: false
  },
  {
    name: "Paneer Butter Masala",
    category: "Food",
    subcategory: "Gravy",
    final_price: 220,
    mrp: 260,
    preparation_time: 25,
    food_type: "Veg",
    is_active: true
  },
  {
    name: "Chicken 65",
    category: "Food",
    subcategory: "Starters",
    final_price: 180,
    mrp: 220,
    preparation_time: 20,
    food_type: "Non-Veg",
    is_active: true
  },
  {
    name: "Ice Cream Sundae",
    category: "Food",
    subcategory: "Desserts",
    final_price: 130,
    mrp: 170,
    preparation_time: 10,
    food_type: "Veg",
    is_active: false
  }
]);


  const [openModal, setOpenModal] = useState(false);
  const [editProduct, setEditProduct] = useState(null);

  const handleDeploy = () => {
    setOpenModal(false);
  };
  const { id } = useParams();
console.log("Shop ID:", id);
const location = useLocation();
const shopCategory = location.state?.category || "Food"; 


const handleEdit = (product) => {
  setEditProduct(product);
  setOpenModal(true);
};

const handleDelete = (id) => {
  setProducts(products.filter((p, index) => index !== id));
};

const handleToggle = (index) => {
  const updated = [...products];
  updated[index].is_active = !updated[index].is_active;
  setProducts(updated);
};

  return (
    <div className="admin-products-page">
        {/* 🔵 BIG TOP BANNER */}
<div className="shop-banner">

  <div className="shop-banner-content">

    {/* LEFT SIDE */}
    <div>
      <h1 className="shop-banner-title">
        Seetha Foods
      </h1>

      <p className="shop-banner-subtitle">
        TOTAL PRODUCTS: {products.length} 
      </p>
    </div>

    {/* RIGHT SIDE */}
    <div className="shop-banner-actions">
      <input
        type="text"
        placeholder="Search by product"
        className="shop-search"
      />

      <button
        className="shop-new-btn"
        onClick={() => setOpenModal(true)}
      >
        + NEW PRODUCT
      </button>
    </div>

  </div>

</div>


      {/* 🔥 PRODUCTS TABLE SECTION */}
<div className="products-table-section">
  <h3 className="table-title">Product List</h3>

  <table className="products-table">
    <thead>
  <tr>
    <th>S.No</th>
    <th>Product Name</th>
    <th>Category</th>
    <th>Subcategory</th>
    <th>Final Price</th>
    <th>MRP</th>

    {shopCategory === "Food" ? (
      <>
        <th>Preparation Min</th>
        <th>Food Type</th>
      </>
    ) : (
      <th>Available Stock</th>
    )}

    <th>Status</th>
    <th>Actions</th>
  </tr>
</thead>


<tbody>
  {products.map((product, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{product.name}</td>
      <td>{product.category}</td>
      <td>{product.subcategory}</td>
      <td>₹ {product.final_price}</td>
      <td>₹ {product.mrp}</td>
      {shopCategory === "Food" ? (
  <>
    <td>{product.preparation_time} mins</td>
    <td>{product.food_type}</td>
  </>
) : (
  <td>{product.available_stock || 0}</td>
)}


      {/* 🔥 Toggle Button */}
      <td>
        <label className="switch">
          <input
            type="checkbox"
            checked={product.is_active}
            onChange={() => handleToggle(index)}
          />
          <span className="slider"></span>
        </label>
      </td>

      {/* 🔥 Action Buttons */}
      <td className="action-buttons">
  <button
    className="icon-btn edit-icon"
    onClick={() => handleEdit(product)}
    title="Edit"
  >
    ✏️
  </button>

  <button
    className="icon-btn delete-icon"
    onClick={() => handleDelete(index)}
    title="Delete"
  >
    🗑️
  </button>
</td>


    </tr>
  ))}
</tbody>

  </table>
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