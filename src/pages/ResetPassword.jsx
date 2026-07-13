import { useState } from "react";
import axios from "axios";
import { FiLock } from "react-icons/fi";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

import logoFavicon from "../assets/logo-favicon.png";
import logoLightText from "../assets/logo-light-text.png";
import logoDarkText from "../assets/logo-dark-text.png";

import "../styles/auth.css";

const API_URL = process.env.REACT_APP_API_URL;

export default function ResetPassword() {
  const { darkMode } = useTheme();

  const navigate = useNavigate();
  const { token } = useParams();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { password, confirmPassword } = formData;

    if (!password || !confirmPassword) {
      return alert("Please fill all fields.");
    }

    if (password.length < 6) {
      return alert(
        "Password must be at least 6 characters."
      );
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match.");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL}/api/auth/reset-password/${token}`,
        {
          password,
        }
      );

      alert(
        res.data.message ||
          "Password reset successful."
      );

      navigate("/");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to reset password."
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

        <div className="auth-content">
          <h2>Reset Password</h2>

          <p className="auth-subtitle">
            Create a new password for your
            account. Make sure it's strong
            and easy for you to remember.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>New Password</label>

              <div className="input-wrapper">
                <FiLock />

                <input
                  type="password"
                  name="password"
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Confirm Password</label>

              <div className="input-wrapper">
                <FiLock />

                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="••••••••"
                  value={
                    formData.confirmPassword
                  }
                  onChange={handleChange}
                />
              </div>
            </div>

            <button
              type="submit"
              className="auth-btn"
              disabled={loading}
            >
              {loading
                ? "Updating Password..."
                : "Reset Password"}
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
