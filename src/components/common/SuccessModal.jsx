import "../../styles/common/successModal.css";

export default function SuccessModal({ open, message, onClose }) {
  if (!open) return null;

  return (
    <div className="success-overlay">
      <div className="success-card">
        <div className="success-icon">✅</div>

        <h3>Success</h3>
        <p>{message}</p>

        <button onClick={onClose}>Okay</button>
      </div>
    </div>
  );
}