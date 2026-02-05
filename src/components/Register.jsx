import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { vendorRegister } from "../services/authService";



export default function Register() {
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false);

  const [formData, setFormData] = useState({
    shopName: "",
    category: "",
    phone: "",
    fullName: "",
    email: "",
    password: "",
    address: "",
    opensAt: "10:00",
    closesAt: "22:00",
  });

  const next = () => setStep(step + 1);
  const prev = () => setStep(step - 1);

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    const payload = {
        shop_name: formData.shopName,
        owner_name: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
        business_type: formData.category,
        address: formData.address,
        opening_time: formData.opensAt,
        closing_time: formData.closesAt,
      };
    const res = await vendorRegister(payload);

    console.log("API Success:", res.data);

    // ✅ Show success popup
    setShowPopup(true);

    // 🔄 Redirect to login after 2 sec
    setTimeout(() => {
      navigate("/");
    }, 2000);

  } catch (err) {
      console.error("API Error:", err.response?.data || err.message);

    alert(
      err.response?.data?.message ||
      "Registration failed. Please try again."
    );
  }
};


  return (
    <div className="register-card">
      <div className="step-header">
        <div className={`step ${step >= 1 ? "active" : ""}`}>Shop Info</div>
        <div className={`step ${step >= 2 ? "active" : ""}`}>Account</div>
        <div className={`step ${step >= 3 ? "active" : ""}`}>Operations</div>
        <div className={`step ${step >= 4 ? "active" : ""}`}>Confirm</div>
      </div>

      {step === 1 && (
        <>
          <h3>Tell us about your shop</h3>
          <p className="step-sub">
            This information will be visible to your future customers.
          </p>

          <div className="field-row">
            <div className="field">
              <label>SHOP NAME</label>
              <div className="input-icon">
                <span className="icon">🏬</span>
                <input
                  type="text"
                  placeholder="e.g.Urban Grocers"
                  value={formData.shopName}
                  onChange={(e) =>
                    setFormData({ ...formData, shopName: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="field">
              <label>CATEGORY</label>
              <div className="input-icon">
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                >
                  <option>Food</option>
                  <option>Grocery</option>
                  <option>Pharmacy</option>
                  <option>Electronics</option>
                  <option>Cosmetics</option>
                </select>
              </div>
            </div>
          </div>

          <div className="field">
            <label>BUSINESS CONTACT</label>
            <div className="input-icon">
              <span className="icon">📞</span>
              <input
                type="text"
                placeholder="+91 12548-26544"
                value={formData.phone}
                onChange={(e) =>
                  setFormData({ ...formData, phone: e.target.value })
                }
              />
            </div>
          </div>

          <button className="create-btn" onClick={next}>
            Continue to Account →
          </button>
          <p className="text-center text-sm text-gray-500 mt-4">
  Already have an account?{" "}
  <span
    onClick={() => navigate("/")}
    className="text-orange-500 font-semibold cursor-pointer hover:underline"
  >
    Log in
  </span>
</p>
        </>
      )}

      {step === 2 && (
        <>
          <h3>Security & Ownership</h3>

          <div className="field">
            <label>FULL NAME</label>
            <div className="input-pro">
              <span className="icon">👤</span>
              <input
                type="text"
                placeholder="e.g.Sarah"
                value={formData.fullName}
                onChange={(e) =>
                  setFormData({ ...formData, fullName: e.target.value })
                }
              />
            </div>
          </div>

          <div className="field">
            <label>EMAIL ADDRESS</label>
            <div className="input-pro">
              <span className="icon">✉️</span>
              <input
                type="email"
                placeholder="sarah@urban-grocers.com"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
              />
            </div>
          </div>

          <div className="field">
            <label>PASSWORD</label>
            <div className="input-pro">
              <span className="icon">🔒</span>
              <input
                type="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
              />
            </div>
          </div>

          <div className="btn-row">
            <button className="back-btn" onClick={prev}>← Back</button>
            <button className="create-btn" onClick={next}>Continue to Operations→</button>
          </div>
        </>
      )}

      {step === 3 && (
        <>
          <h3>Location & Hours</h3>

          <div className="field">
            <label>PHYSICAL ADDRESS</label>
            <div className="input-pro">
              <span className="icon">📍</span>
              <input
                type="text"
                placeholder="123,Market Square,Downtown"
                value={formData.address}
                onChange={(e) =>
                  setFormData({ ...formData, address: e.target.value })
                }
              />
            </div>
          </div>

          <div className="field-row">
            <div className="field">
              <label>OPENS AT</label>
              <div className="input-pro">
                <input
                  type="time"
                  value={formData.opensAt}
                  onChange={(e) =>
                    setFormData({ ...formData, opensAt: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="field">
              <label>CLOSES AT</label>
              <div className="input-pro">
                <input
                  type="time"
                  value={formData.closesAt}
                  onChange={(e) =>
                    setFormData({ ...formData, closesAt: e.target.value })
                  }
                />
              </div>
            </div>
          </div>

          <div className="btn-row">
            <button className="back-btn" onClick={prev}>← Back</button>
            <button className="create-btn" onClick={next}>Continue →</button>
          </div>
        </>
      )}

      {step === 4 && (
        <>
          <div className="success-icon">✓</div>
          <h2>Everything looks great!</h2>
          <p className="confirm-sub"> Review your shop card preview before submitting for approval. </p>

          <div className="preview-card">
            <div className="preview-img">
              <span>🏪</span>
              <div className="status-tag">REVIEWING</div>
            </div>

            <div className="preview-body">
              <h3>{formData.shopName}</h3>
              <p className="category">{formData.category}</p>
              <div className="preview-meta">
                <span>📍 {formData.address}</span>
                <span>🕒 {formData.opensAt} – {formData.closesAt}</span>
              </div>
            </div>
          </div>
          {/* INFO BOX */} <div className="info-box"> ℹ Our team usually reviews new shop applications within <b> 24–48 hours.</b> You will receive an email notification as soon as your shop is ready to go live. </div>

          <div className="btn-row">
            <button className="back-btn" onClick={() => setStep(3)}>← Back</button>
            <button className="submit-btn" onClick={handleSubmit}>
              Finish & Submit Application ✈
            </button>
          </div>
        </>
      )}

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup-box">
            ✅ Application Submitted Successfully!
          </div>
        </div>
      )}
    </div>
  );
}
