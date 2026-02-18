import { useState } from "react";
import { Mail, Phone, ArrowLeft, CheckCircle } from "lucide-react";
import ecommerceIllustration from "../assets/ecommerce-illustration.png";
import "../styles/ForgotPass.css";
import { useNavigate } from "react-router-dom";


const ForgotPassword = () => {
  const [mode, setMode] = useState("email");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [emailSent, setEmailSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const navigate = useNavigate();

  const handleSendResetLink = (e) => {
    e.preventDefault();
    if (email) setEmailSent(true);
  };

  const handleSendOtp = (e) => {
    e.preventDefault();
    if (phone) setOtpSent(true);
  };

  const handleVerifyOtp = (e) => {
    e.preventDefault();
    if (otp.every((d) => d !== "")) setOtpVerified(true);
  };

  const handleOtpChange = (index, value) => {
    if (value.length > 1) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      const next = document.getElementById(`otp-${index + 1}`);
      next?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prev = document.getElementById(`otp-${index - 1}`);
      prev?.focus();
    }
  };

  const resetState = () => {
    setOtpSent(false);
    setOtp(["", "", "", "", "", ""]);
    setEmailSent(false);
    setOtpVerified(false);
    setEmail("");
    setPhone("");
  };

  const switchMode = (newMode) => {
    setMode(newMode);
    resetState();
  };

  return (
    <div className="forgot-page">
    <div className="forgot-container">

      {/* LEFT PANEL */}
      <div className="left-panel">
        <div>
          <img
            src={ecommerceIllustration}
            alt="Delivery illustration"
          />
          <h2>Shop with Confidence</h2>
          <p>
            Secure account recovery to get you back to your favorite deals
          </p>
        </div>
      </div>

      {/* RIGHT PANEL */}
      <div className="right-panel">
        <div className="forgot-card">

          {/* Back Button */}
          <button
  onClick={() => navigate("/")}
  className="back-btn"
>
  <ArrowLeft size={18} />
  Back to Login
</button>


          <h1>Forgot Password</h1>
          <p className="subtitle">
            Don't worry! We'll help you recover your account.
          </p>

          {/* TABS */}
          <div className="tab-buttons">
            <button
              onClick={() => switchMode("email")}
              className={mode === "email" ? "active" : ""}
            >
              <Mail /> Reset via Email
            </button>

            <button
              onClick={() => switchMode("phone")}
              className={mode === "phone" ? "active" : ""}
            >
              <Phone /> Reset via Phone
            </button>
          </div>

          {/* EMAIL MODE */}
          {mode === "email" && (
            <>
              {emailSent ? (
                <div style={{ textAlign: "center" }}>
                  <CheckCircle size={50} color="orange" />
                  <h3>Check Your Email</h3>
                  <p>Reset link sent to {email}</p>
                  <button onClick={resetState}>
                    Try Again
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSendResetLink}>
                  <label>Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="input-box"
                  />

                  <button type="submit" className="main-btn">
                    Send Reset Link
                  </button>
                </form>
              )}
            </>
          )}

          {/* PHONE MODE */}
          {mode === "phone" && (
            <>
              {otpVerified ? (
                <div style={{ textAlign: "center" }}>
                  <CheckCircle size={50} color="orange" />
                  <h3>OTP Verified!</h3>
                  <p>You can now reset your password.</p>
                  <button
                    onClick={resetState}
                    className="main-btn"
                  >
                    Set New Password
                  </button>
                </div>
              ) : !otpSent ? (
                <form onSubmit={handleSendOtp}>
                  <label>Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+91 98765 43210"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="input-box"
                  />

                  <button type="submit" className="main-btn">
                    Send OTP
                  </button>
                </form>
              ) : (
                <form onSubmit={handleVerifyOtp}>
                  <p>Enter OTP sent to {phone}</p>

                  <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
                    {otp.map((digit, i) => (
                      <input
                        key={i}
                        id={`otp-${i}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(i, e)}
                        className="input-box"
                        style={{ width: "45px", textAlign: "center" }}
                      />
                    ))}
                  </div>

                  <button type="submit" className="main-btn">
                    Verify OTP
                  </button>

                  <button
                    type="button"
                    onClick={() => setOtpSent(false)}
                  >
                    Resend OTP
                  </button>
                </form>
              )}
            </>
          )}

        </div>
      </div>

    </div>
    </div>
  );
};

export default ForgotPassword;
