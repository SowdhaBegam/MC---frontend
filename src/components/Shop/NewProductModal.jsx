import { useState, useEffect } from "react";
import "../../styles/Shop/newProductModal.css";
import { addProductAPI } from "../../services/productService";

/* ICON MAP */
const categoryIcons = {
  Food: "🍔",
  Grocery: "🛒",
  Pharmacy: "💊",
  Electronics: "📱",
  Cosmetics: "💄",
};

export default function NewProductModal({ open, onClose, onDeploy, product }) {
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [base, setBase] = useState("");
  const [rebate, setRebate] = useState("");
  const [stock, setStock] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("veg");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [preview, setPreview] = useState(null);

  const [showCategory, setShowCategory] = useState(false);
  const [showSub, setShowSub] = useState(false);

  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setDesc(product.description || "");
      setBase(product.price || "");
      setRebate(product.final_price || "");
      setStock(product.stock || 0);
      setCategory(product.category || "");
      setSubCategory(product.subcategory || "");
      setType(product.food_type === "NON-VEG" ? "nonveg" : "veg");
      setPreview(
        product.image && product.image !== "image.jpg"
          ? `https://mc-platform-qwzw35zb4-sangeetha-lakshmis-projects.vercel.app/uploads/${product.image}`
          : "/image.jpg"
      );
    }
  }, [product]);

  useEffect(() => {
    if (category === "Food") setStock("");
  }, [category]);

  const subCategoryMap = {
    Food: [
      { name: "Biryani", icon: "🍚" },
      { name: "Meals", icon: "🍽️" },
      { name: "Snacks", icon: "🍟" },
      { name: "Desserts", icon: "🍰" },
      { name: "Beverages", icon: "🥤" },
    ],
    Grocery: [
      { name: "Vegetables", icon: "🥦" },
      { name: "Fruits", icon: "🍎" },
      { name: "Dairy", icon: "🥛" },
    ],
    Pharmacy: [
      { name: "Tablets", icon: "💊" },
      { name: "Syrups", icon: "🧴" },
    ],
  };

  if (!open) return null;

  const deploy = async () => {
    const mrp = parseInt(base, 10);
    const sp = parseInt(rebate, 10);

    if (!name || isNaN(mrp) || isNaN(sp) || sp > mrp) {
      alert("Check product details");
      return;
    }

    const payload = {
      name,
      description: desc,
      price: mrp,
      final_price: sp,
      discount: mrp - sp,
      stock: stock || 0,
      preparing_minutes: time || 0,
      food_type: type === "veg" ? "VEG" : "NON-VEG",
      category,
      subcategory: subCategory,
      is_live: true,
      image: "image.jpg",
    };

    try {
      await addProductAPI(payload);
      onDeploy();
      onClose();
    } catch {
      alert("Failed to save product");
    }
  };

  return (
    <div className="big-modal-overlay">
      <div className="big-modal-card">
        <div className="big-header">
          <h2>Add New Product</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="big-body">
          <div className="image-section">
            <h4>PRODUCT IMAGE</h4>
            {preview ? (
              <img src={preview} alt="" />
            ) : (
              <label className="upload-box">
                Upload Image
                <input type="file" hidden />
              </label>
            )}
          </div>

          <div className="form-section" id="new-product-modal">
            {/* CATEGORY */}
            <h4>PRODUCT CATEGORY</h4>
            <div className="custom-dropdown">
              <button
                type="button"
                className="dropdown-btn"
                onClick={() => setShowCategory(!showCategory)}
              >
                {category ? (
                  <span>{categoryIcons[category]} {category}</span>
                ) : (
                  <span className="placeholder">Select a Category</span>
                )}
              </button>

              {showCategory && (
                <ul className="dropdown-menu">
                  {Object.keys(categoryIcons).map((cat) => (
                    <li
                      key={cat}
                      onClick={() => {
                        setCategory(cat);
                        setSubCategory("");
                        setShowCategory(false);
                      }}
                    >
                      {categoryIcons[cat]} {cat}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {/* SUB CATEGORY */}
            <h4>SUB CATEGORY</h4>
            <div className="custom-dropdown">
              <button
                type="button"
                className="dropdown-btn"
                onClick={() => setShowSub(!showSub)}
                disabled={!category}
              >
                {subCategory || <span className="placeholder">Select Sub Category</span>}
              </button>

              {showSub && (
                <ul className="dropdown-menu">
                  {subCategoryMap[category]?.map((sub) => (
                    <li
                      key={sub.name}
                      onClick={() => {
                        setSubCategory(sub.name);
                        setShowSub(false);
                      }}
                    >
                      {sub.icon} {sub.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <h4>PRODUCT DETAILS</h4>
            <input placeholder="Product Name" value={name} onChange={e => setName(e.target.value)} />
            <textarea placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} />

            <h4>PRICING</h4>
            <div className="row">
              <input placeholder="MRP" value={base} onChange={e => setBase(e.target.value)} />
              <input placeholder="Selling Price" value={rebate} onChange={e => setRebate(e.target.value)} />
            </div>

            {category === "Food" ? (
              <>
                <h4>PREPARATION TIME</h4>
                <input placeholder="Minutes" value={time} onChange={e => setTime(e.target.value)} />
              </>
            ) : (
              <>
                <h4>STOCK</h4>
                <input placeholder="Stock" value={stock} onChange={e => setStock(e.target.value)} />
              </>
            )}
          </div>
        </div>

        <div className="big-footer">
          <button className="cancel" onClick={onClose}>Cancel</button>
          <button className="deploy" onClick={deploy}>Save Product</button>
        </div>
      </div>
    </div>
  );
}
