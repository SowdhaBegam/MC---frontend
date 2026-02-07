import { useState } from "react";
import "../../styles/Shop/newProductModal.css";
import { addProductAPI } from "../../services/productService";


export default function NewProductModal({ open, onClose, onDeploy }) {
  const [image, setImage] = useState(null);
  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [base, setBase] = useState("");
  const [rebate, setRebate] = useState("");
  const [stock, setStock] = useState(50);
  const [time, setTime] = useState(25);
  const [type, setType] = useState("veg");
  const [category, setCategory] = useState("Food");


  if (!open) return null;

  const finalPrice = base - (rebate || 0);

  const deploy = async () => {
  if (!name || !base) return alert("Fill required fields");

  const payload = {
    name,
    description: desc,
    image,
    price: Number(base),
    discount: Number(rebate || 0),
    stock: Number(stock),
    is_live: true,
    prep_time: Number(time),
    food_type: type === "veg" ? "VEG" : "NON-VEG",
    category, // default until you connect dropdown
  };

  try {
    const res = await addProductAPI(payload);
    alert("✅ Product Added Successfully!");

    onDeploy(); // 🔥 THIS SENDS PRODUCT TO PRODUCTS PAGE
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
          <h2>Modify Listing</h2>
          <button onClick={onClose}>✕</button>
        </div>

        <div className="big-body">

          {/* LEFT IMAGE */}
          <div className="image-section">
            {image ? (
              <img src={image} alt="" />
            ) : (
              <label className="upload-box">
                Upload Image
                <input
                  type="file"
                  accept="image/*"
                  hidden
                  onChange={(e) =>
                    setImage(URL.createObjectURL(e.target.files[0]))
                  }
                />
              </label>
            )}
          </div>

          {/* RIGHT FORM */}
          <div className="form-section">

            <h4>CATEGORY</h4>
            <select
  className="category"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="Food">🍔 Food</option>
  <option value="Grocery">🛒 Grocery</option>
  <option value="Pharmacy">💊 Pharmacy</option>
  <option value="Electronics">📱 Appliances & Electronics</option>
  <option value="Cosmetics">💄 Cosmetics</option>
</select>


            <h4>PROFILE & NARRATIVE</h4>
            <input
              placeholder="Product Title"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <textarea
              placeholder="Contextual Description"
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />

            <h4>FINANCIAL STRATEGY</h4>
            <div className="row">
              <input placeholder="Base MRP ₹" value={base} onChange={(e)=>setBase(e.target.value)} />
              <input placeholder="Net Rebate ₹" value={rebate} onChange={(e)=>setRebate(e.target.value)} />
              <input className="final-price" value={`₹ ${finalPrice || 0}`} disabled />
            </div>

            <h4>INVENTORY LOGIC</h4>
            <div className="row">
              <input value={stock} onChange={(e)=>setStock(e.target.value)} />
              <input value={time} onChange={(e)=>setTime(e.target.value)} />
            </div>

            <h4>CATEGORY SETTINGS</h4>
            <div className="toggle">
              <button className={type==="veg" ? "active":""} onClick={()=>setType("veg")}>VEG</button>
              <button className={type==="nonveg" ? "active":""} onClick={()=>setType("nonveg")}>NON-VEG</button>
            </div>

          </div>
        </div>

        <div className="big-footer">
          <button className="cancel" onClick={onClose}>Cancel</button>
          <button className="deploy" onClick={deploy}>UPDATE PRODUCT DETAILS</button>
        </div>

      </div>
    </div>
  );
}
