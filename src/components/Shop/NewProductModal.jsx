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

  /* PREFILL WHEN EDITING */
  useEffect(() => {
    if (product) {
      setName(product.name || "");
      setDesc(product.description || "");
      setBase(product.price || "");
      setRebate(product.final_price || "");
      setStock(product.stock || "");
      setCategory(product.category || "");
      setSubCategory(product.subcategory || "");
      setType(product.food_type === "NON-VEG" ? "nonveg" : "veg");

      if (product.image && product.image !== "image.jpg") {
        setPreview(
          `https://mc-platform-qwzw35zb4-sangeetha-lakshmis-projects.vercel.app/uploads/${product.image}`
        );
      } else {
        setPreview("/image.jpg");
      }
    }
  }, [product]);

  /* RESET STOCK FOR FOOD */
  useEffect(() => {
    if (category === "Food") setStock("");
  }, [category]);

  if (!open) return null;

  /* SAVE PRODUCT */
  const deploy = async () => {
    if (!name || !base || !rebate) {
      alert("Fill required fields");
      return;
    }

    const mrp = parseInt(base, 10);
    const sp = parseInt(rebate, 10);

    if (isNaN(mrp) || isNaN(sp) || sp > mrp) {
      alert("Check pricing details");
      return;
    }

    const payload = {
      name,
      description: desc,
      price: mrp,
      final_price: sp,
      discount: mrp - sp,
      stock: category === "Food" ? 0 : stock || 0,
      preparing_minutes: category === "Food" ? time || 0 : 0,
      food_type: category === "Food" ? (type === "veg" ? "VEG" : "NON-VEG") : "",
      category,
      subcategory: subCategory || "",
      is_live: true,
      image: "image.jpg",
    };

    try {
      await addProductAPI(payload);
      onDeploy();
      onClose();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to save product");
    }
  };

  return (
    <div className="big-modal-overlay">
      <div className="big-modal-card">
        <div className="big-header">
          <h2>{product ? "Edit Product" : "Add New Product"}</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="big-body">
          {/* IMAGE */}
          <div className="image-section">
            <h4>PRODUCT IMAGE</h4>

            {preview ? (
              <img src={preview} alt="" />
            ) : (
              <label className="upload-box">
                Click to Upload Product Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) => {
                    const file = e.target.files[0];
                    setImageFile(file);
                    setPreview(URL.createObjectURL(file));
                  }}
                />
              </label>
            )}
          </div>

          {/* FORM */}
          <div className="form-section">
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

            {/* DETAILS */}
            <h4>PRODUCT DETAILS</h4>
            <input
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <textarea
              placeholder="Product Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />

            {/* PRICING */}
            <h4>PRICING</h4>
            <div className="row">
              <input placeholder="MRP ₹" value={base} onChange={(e) => setBase(e.target.value)} />
              <input placeholder="Selling Price ₹" value={rebate} onChange={(e) => setRebate(e.target.value)} />
            </div>

            {/* DYNAMIC */}
            {category === "Food" ? (
              <>
                <h4>PREPARATION DETAILS</h4>
                <input
                  placeholder="Preparation Time (min)"
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />

                <div className="toggle">
                  <button
                    type="button"
                    className={type === "veg" ? "active" : ""}
                    onClick={() => setType("veg")}
                  >
                    VEG
                  </button>
                  <button
                    type="button"
                    className={type === "nonveg" ? "active" : ""}
                    onClick={() => setType("nonveg")}
                  >
                    NON-VEG
                  </button>
                </div>
              </>
            ) : (
              <>
                <h4>AVAILABLE STOCK</h4>
                <input
                  type="number"
                  placeholder="Enter stock"
                  value={stock}
                  onChange={(e) => setStock(e.target.value)}
                />
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
