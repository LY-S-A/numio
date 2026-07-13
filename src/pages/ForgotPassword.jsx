import { useState } from "react";
import axios from "axios";
import { FiMail } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

import logoFavicon from "../assets/logo-favicon.png";
import logoLightText from "../assets/logo-light-text.png";
import logoDarkText from "../assets/logo-dark-text.png";

import "../styles/auth.css";

const API_URL = process.env.REACT_APP_API_URL;

export default function ForgotPassword() {
  const { darkMode } = useTheme();

  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      return alert("Please enter your email address.");
    }

    try {
      setLoading(true);
      setSuccess("");

      const res = await axios.post(
        `${API_URL}/api/auth/forgot-password`,
        {
          email,
        }
      );

      setSuccess(
        res.data.message ||
          "Password reset link sent successfully."
      );
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to send reset link."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-page">
      {/* Background Glow */}
      <div className="bg-glow"></div>

      {/* Auth Card */}
      <div className="auth-card">
        {/* Logo */}
        <div className="auth-logo">
          <div className="logo-icon">
            <img
              src={logoFavicon}
              alt="numio-favicon"
            />
          </div>

          <div className="logo-text">
            <img
              src={
                darkMode
                  ? logoDarkText
                  : logoLightText
              }
              alt="numio-text"
            />

            <p>
              Virtual Numbers & OTP
              Verification
            </p>
          </div>
        </div>

        {/* Content */}
        <div className="auth-content">
          <h2>Forgot Password</h2>

          <p className="auth-subtitle">
            Enter the email address
            associated with your account.
            We'll send you a secure link to
            reset your password.
          </p>

          {success && (
            <div
              style={{
                background:
                  "rgba(34,197,94,.12)",
                color: "#22c55e",
                border:
                  "1px solid rgba(34,197,94,.25)",
                padding: "12px",
                borderRadius: "10px",
                marginBottom: "18px",
                fontSize: "14px",
              }}
            >
              {success}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>

              <div className="input-wrapper">
                <FiMail />

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                />
              </div>
            </div>

            <button
              type="submit"
              className="auth-btn"
              disabled={loading}
            >
              {loading
                ? "Sending..."
                : "Send Reset Link"}
            </button>
          </form>

          <p className="auth-footer">
            Remember your password?{" "}
            <Link to="/">
              Back to Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
