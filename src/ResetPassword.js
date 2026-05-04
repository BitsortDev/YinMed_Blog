import { useState } from "react";
import { auth } from "./firebase";
import { sendPasswordResetEmail } from "firebase/auth";

const ResetPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleReset = async (e) => {
    e.preventDefault();

    if (!email) return;

    setLoading(true);
    setMessage("");

    try {
      await sendPasswordResetEmail(auth, email);
      setMessage("Password reset link sent to your email.");
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="AccountContainer">
      <div className="AccountLeft">
        <h2>Reset Password</h2>

        <p className="subAccHead">
          Enter your email to receive a reset link
        </p>

        {message && <div className="successPopup">{message}</div>}

        <form className="AccountForm" onSubmit={handleReset}>
          <div className="AccountInput">
            <span className="material-symbols-outlined">
              mark_email_unread
            </span>

            <input
              type="email"
              required
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Sending..." : "Reset Password"}
          </button>
        </form>
      </div>

      <div className="AccountRight"></div>
    </div>
  );
};

export default ResetPassword; 
