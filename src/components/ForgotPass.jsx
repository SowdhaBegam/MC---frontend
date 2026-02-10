import { useState } from "react";

export default function ResetFlow() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

  const handleEmail = () => {
    if (!email) return alert("Enter email");
    setStep(2);
  };

  const handleOTP = () => {
    if (otp.length !== 4) return alert("Enter 4-digit OTP");
    setStep(3);
  };

  const handlePassword = () => {
    if (!password || !confirm) return alert("Fill all fields");
    if (password !== confirm) return alert("Passwords do not match");
    alert("Password reset successful 🎉");
    setStep(1);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">

        {/* STEP 1 — EMAIL */}
        {step === 1 && (
          <>
            <h2>Reset Password</h2>
            <p>Enter your registered email to receive verification code</p>
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button onClick={handleEmail}>Send Code</button>
          </>
        )}

        {/* STEP 2 — OTP */}
        {step === 2 && (
          <>
            <h2>Verify Email</h2>
            <p>Enter the 4-digit code sent to your email</p>
            <input
              type="text"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
            />
            <button onClick={handleOTP}>Verify</button>
          </>
        )}

        {/* STEP 3 — NEW PASSWORD */}
        {step === 3 && (
          <>
            <h2>Create New Password</h2>
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <button onClick={handlePassword}>Save</button>
          </>
        )}

      </div>
    </div>
  );
}
