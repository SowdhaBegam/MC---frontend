import Login from "../components/Login";
import "../styles/Login.css";


export default function Loginpage() {
  return (
    <div className="register-page">
      <div className="form-container">
        <div className="register-card login-card">
          <Login />
        </div>
      </div>
    </div>
  );
}
