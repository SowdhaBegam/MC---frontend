import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "../../styles/AdminShopProducts.css";
import NewProductModal from "../../components/Shop/NewProductModal";

const AdminShopProducts = () => {
  const [products, setProducts] = useState([
  {
    name: "Chicken Biryani",
    category: "Food",
    price: 200,
    preparationTime: "20 mins",
    foodType: "Non-Veg",
  },
  {
    name: "Laptop",
    category: "Electronics",
    price: 50000,
    availableStock: 10,
  },
]);

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
      
      {/* 🔥 PRODUCTS TABLE SECTION */}
<div className="products-table-section">
  <h3 className="table-title">Product List</h3>

  <table className="products-table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Category</th>
        <th>Price</th>

        {/* If any product is Food */}
        {products.some(p => p.category === "Food") && (
          <>
            <th>Preparation Time</th>
            <th>Food Type</th>
          </>
        )}

        {/* If any product is NOT Food */}
        {products.some(p => p.category !== "Food") && (
          <th>Available Stock</th>
        )}

        <th>Action</th>
      </tr>
    </thead>

    <tbody>
      {products.map((product, index) => (
        <tr key={index}>
          <td>{product.name}</td>
          <td>{product.category}</td>
          <td>₹ {product.price}</td>

          {product.category === "Food" ? (
            <>
              <td>{product.preparationTime}</td>
              <td>{product.foodType}</td>
            </>
          ) : (
            <td>{product.availableStock}</td>
          )}

          <td>
            <button className="edit-btn">Edit</button>
            <button className="delete-btn">Delete</button>
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