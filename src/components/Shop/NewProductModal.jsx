import { useState,useEffect } from "react";
import "../../styles/Shop/newProductModal.css";
import { addProductAPI } from "../../services/productService";


export default function NewProductModal({ open, onClose, onDeploy, product }) {
  const [imageFile, setImageFile] = useState(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [base, setBase] = useState("");
  const [rebate, setRebate] = useState("");
  const [stock, setStock] = useState("");
  const [time, setTime] = useState("");
  const [type, setType] = useState("veg");
  const [category, setCategory] = useState("Food");
  const [subCategory, setSubCategory] = useState("");
  const [preview, setPreview] = useState(null);
  useEffect(() => {
  if (product) {
    setName(product.name || "");
    setDesc(product.description || "");
    setBase(product.price || "");
    setRebate(product.discount || "");
    setStock(product.stock || 0);
    setCategory(product.category || "Food");
    setSubCategory(product.subcategory || "");
    setType(product.food_type === "NON-VEG" ? "nonveg" : "veg");
    if (product.image && product.image !== "image.jpg") {
  setPreview(`https://mc-platform-qwzw35zb4-sangeetha-lakshmis-projects.vercel.app/uploads/${product.image}`);
} else {
  setPreview("/image.jpg"); // 👈 default image from frontend
}

  }
}, [product]);



  const subCategoryMap = {
  Food: [
    { name: "Biryani", icon: "🍚" },
    { name: "Meals", icon: "🍽️" },
    { name: "Snacks", icon: "🍟" },
    { name: "Desserts", icon: "🍰" },
    { name: "Beverages", icon: "🥤" },
    { name: "Breakfast", icon: "🍳" },
    { name: "Fast Food", icon: "🍔" },
  ],
  Grocery: [
    { name: "Vegetables", icon: "🥦" },
    { name: "Fruits", icon: "🍎" },
    { name: "Dairy", icon: "🥛" },
    { name: "Rice & Grains", icon: "🌾" },
    { name: "Spices", icon: "🧂" },
    { name: "Oil & Masala", icon: "🫒" },
  ],
  Pharmacy: [
    { name: "Tablets", icon: "💊" },
    { name: "Syrups", icon: "🧴" },
    { name: "First Aid", icon: "🩹" },
    { name: "Vitamins", icon: "🍊" },
    { name: "Personal Care", icon: "🧼" },
  ],
  Electronics: [
    { name: "Mobiles", icon: "📱" },
    { name: "Laptops", icon: "💻" },
    { name: "Accessories", icon: "🎧" },
    { name: "Home Appliances", icon: "📺" },
    { name: "Wearables", icon: "⌚" },
  ],
  Cosmetics: [
    { name: "Makeup", icon: "💄" },
    { name: "Skincare", icon: "🧴" },
    { name: "Haircare", icon: "💇‍♀️" },
    { name: "Fragrances", icon: "🌸" },
    { name: "Beauty Tools", icon: "🪞" },
  ],
};

  if (!open) return null;

  const finalPrice = base - (rebate || 0);
  // Map UI category → Backend category
const backendCategoryMap = {
  Food: "Dinner",     // default mapping
  Grocery: "Grocery",
  Pharmacy: "Pharmacy",
  Electronics: "Electronics",
  Cosmetics: "Cosmetics"
};


  const deploy = async () => {
  if (!name || !base) return alert("Fill required fields");

  const formData = new FormData();

  formData.append("name", name);
  formData.append("description", desc);
  formData.append("price", base);
  formData.append("discount", rebate || 0);
  formData.append("stock", stock);
  formData.append("preparing_minutes", time);
  formData.append("food_type", type === "veg" ? "VEG" : "NON-VEG");
  formData.append("category", backendCategoryMap[category]);
  formData.append("subcategory", subCategory);
  formData.append("vendor_id", 13); // TEMP FIX
  formData.append("image", "image.jpg");
 // 🔥 THIS SENDS FILE

  try {
    await addProductAPI(formData);
    alert("✅ Product Added Successfully!");
    onDeploy();
    onClose();
  } catch (error) {
    console.error(error);
    alert("❌ Failed to add product");
  }
};


  return (
    <div className="big-modal-overlay">
      <div className="big-modal-card">

        {/* HEADER */}
        <div className="big-header">
          <h2>Add New Product</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="big-body">

          {/* LEFT IMAGE */}
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
          setImageFile(file);        // file for backend
          setPreview(URL.createObjectURL(file)); // preview
        }}
      />
    </label>
  )}
  {category === "Food" && (
  <>
    <h4>PREPARATION DETAILS</h4>

    
      <div className="field">
        <label>Preparation Time (MIN)</label>
        <input
        className="food-input"
          placeholder="Enter preparation time in minutes"
          value={time}
          onChange={(e)=>setTime(e.target.value)}
        />
      </div>

      <div className="field">
        <h4>FOOD TYPE</h4>
        <div className="toggle">
          <button
            type="button"
            className={type==="veg" ? "active":""}
            onClick={()=>setType("veg")}
          >
            VEG
          </button>
          <button
            type="button"
            className={type==="nonveg" ? "active":""}
            onClick={()=>setType("nonveg")}
          >
            NON-VEG
          </button>
        </div>
      </div>

    
  </>
)}
</div>

          {/* RIGHT FORM */}
          <div className="form-section">
            <div className="row two-col">
  <div className="field">
    <h4>PRODUCT CATEGORY</h4>
    <select
      className="category"
      value={category}
      onChange={(e) => {
        setCategory(e.target.value);
        setSubCategory("");
      }}
    >
      <option value="Grocery">Select a Category</option>
      <option value="Food">🍔 Food</option>
      <option value="Grocery">🛒 Grocery</option>
      <option value="Pharmacy">💊 Pharmacy</option>
      <option value="Electronics">📱 Appliances & Electronics</option>
      <option value="Cosmetics">💄 Cosmetics</option>
    </select>
  </div>

  <div className="field">
    <h4>SUB-CATEGORY</h4>
    <select
      className="category"
      value={subCategory}
      onChange={(e) => setSubCategory(e.target.value)}
    >
      <option value="">Select a Sub Category</option>
      {subCategoryMap[category]?.map((sub, index) => (
        <option key={index} value={sub.name}>
          {sub.icon} {sub.name}
        </option>
      ))}
    </select>
  </div>
</div>


            <h4>PRODUCT DETAILS</h4>
            <input
              placeholder="Product Name (e.g.Dum Biryani)"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              placeholder="Product Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />

            <h4>PRICING DETAILS</h4>
            <div className="row">
              <input placeholder="Base MRP ₹" value={base} onChange={(e)=>setBase(e.target.value)} />
              <input placeholder="Discount ₹" value={rebate} onChange={(e)=>setRebate(e.target.value)} />
              <input className="final-price" value={`₹ ${finalPrice || 0}`} disabled />
            </div>
            <h4>AVAILABLE STOCK</h4>

<div className="stock-wrapper">

  <input
    type="number"
    placeholder="Enter available stock"
    value={stock}
    onChange={(e) => setStock(e.target.value)}
  />
</div>


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
