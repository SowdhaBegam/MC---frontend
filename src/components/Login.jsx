import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { vendorLogin, adminLogin } from "../services/authService";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [pendingMsg, setPendingMsg] = useState("");
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  const validateLogin = () => {
  let newErrors = {};

  if (!loginData.email) {
    newErrors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(loginData.email)) {
    newErrors.email = "Invalid email format";
  }

  if (!loginData.password) {
    newErrors.password = "Password is required";
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

  // ✅ SINGLE, CLEAN LOGIN FUNCTION
  const handleLogin = async () => {
  if (!validateLogin()) return;
  try {
    let res;

    // 🟢 ADMIN LOGIN
    if (loginData.email === "admin@gmail.com") {
      res = await adminLogin(loginData);

      const token = res.data.token;
      localStorage.setItem("token", token);
      login({ token, role: "admin" });
      navigate("/admin/dashboard");
      return;
    }

    // 🟡 VENDOR LOGIN
    res = await vendorLogin(loginData);

    const token = res.data.token;
    login({ token, role: "vendor" });
    navigate("/shop-dashboard");

  } catch (err) {
  const status = err.response?.status;
  const message = err.response?.data?.message;

  // ⏳ Vendor pending approval
  if (status === 403) {
    setPendingMsg("⏳ Your shop is waiting for admin approval.");
    return;
  }

  setPendingMsg("");

  // 🌐 Network error
  if (!err.response) {
    alert("Network error. Please check your internet connection.");
    return;
  }

  // ❌ Wrong password
  if (status === 401) {
    setErrors({ password: "Incorrect password" });
    return;
  }

  // ❌ Email not found
  if (status === 404) {
    setErrors({ email: "Account not found" });
    return;
  }

  // 💥 Server issue
  if (status === 500) {
    alert("Server error. Please try again later.");
    return;
  }

  // fallback
  alert(message || "Login failed");
}

};

  return (
    <>
      <h1 className="login-title">Login</h1>

      <div className="field">
        <label>Email Address *</label>
        <div className="input-pro">
          <span className="icon">📧</span>
          <input
            type="email"
            placeholder="user@gmail.com"
            value={loginData.email}
            onChange={(e) =>
              setLoginData({ ...loginData, email: e.target.value })
            }
          />
        </div>
        {errors.email && <p className="error">{errors.email}</p>}
      </div>

      <div className="field">
        <label>Password *</label>
        <div className="input-pro">
          <span className="icon">🔒</span>
          <input
            type="password"
            placeholder="••••••••"
            value={loginData.password}
            onChange={(e) =>
              setLoginData({ ...loginData, password: e.target.value })
            }
          />
          
        </div>
        {errors.password && <p className="error">{errors.password}</p>}
      </div>

      <button className="create-btn login-btn" onClick={handleLogin}>
        Sign In to Dashboard →
      </button>

      {pendingMsg && (
        <div style={{ marginTop: "15px", color: "#b45309", fontWeight: "bold" }}>
          {pendingMsg}
        </div>
      )}

      <div className="or-text">OR</div>

      <button
        className="back-btn owner-btn"
        onClick={() => navigate("/register")}
      >
        Become a Shop Owner
      </button>
    </>
  );
}
