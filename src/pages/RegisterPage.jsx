import Register from "../components/Register";
import "../styles/Register.css";
import deliveryImg from "../assets/Scootyedit.jpeg";

export default function Registerpage() {
  return (
    <div
      className="register-page"
      style={{ backgroundImage: `url(${deliveryImg})` }}
    >
      <div className="form-container">
        <Register />
      </div>
    </div>
  );
}
