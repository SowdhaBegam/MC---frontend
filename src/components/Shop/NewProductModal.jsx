import { useState } from "react";
import "../styles/newProductModal.css";

export default function NewProductModal({ open, onClose, onDeploy }) {
  const [preview, setPreview] = useState(null);
  const [name, setName] = useState("");
  const [base, setBase] = useState("");
  const [discount, setDiscount] = useState("");
  const [stock, setStock] = useState("");

  if (!open) return null;

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const deployProduct = () => {
    if (!name || !base || !preview) {
      alert("Fill required fields");
      return;
    }

    const finalPrice = base - (discount || 0);

    onDeploy({
      id: Date.now(),
      name,
      image: preview,
      finalPrice,
      stock,
    });

    // reset
    setName("");
    setBase("");
    setDiscount("");
    setStock("");
    setPreview(null);
    onClose();
  };

  return (
    <div className="npm-overlay">
      <div className="npm-card">

        {/* Header */}
        <div className="npm-header">
          <div>
            <h3>Create Listing</h3>
            <p>NICHE · FOOD MARKETPLACE</p>
          </div>
          <button onClick={onClose}>✕</button>
        </div>

        {/* Body */}
        <div className="npm-body">

          <div className="image-upload">
            {preview ? (
              <img src={preview} alt="preview" />
            ) : (
              <label>
                <input type="file" accept="image/*" onChange={handleImage} />
                <span>📷 Upload Image</span>
              </label>
            )}
          </div>

          <input
            placeholder="Product Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <textarea placeholder="Tell the story..." />

          <div className="price-row">
            <input
              placeholder="Base Price ₹"
              value={base}
              onChange={(e) => setBase(e.target.value)}
            />
            <input
              placeholder="Discount ₹"
              value={discount}
              onChange={(e) => setDiscount(e.target.value)}
            />
            <input
              className="final-price"
              placeholder="Final ₹"
              value={base - (discount || 0)}
              disabled
            />
          </div>

          <input
            placeholder="Units in Stock"
            value={stock}
            onChange={(e) => setStock(e.target.value)}
          />
        </div>

        {/* Footer */}
        <div className="npm-footer">
          <button className="cancel" onClick={onClose}>Cancel</button>
          <button className="deploy" onClick={deployProduct}>
            DEPLOY TO STOREFRONT
          </button>
        </div>

      </div>
    </div>
  );
}