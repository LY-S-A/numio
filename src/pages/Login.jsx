import { useState } from "react";
import axios from "axios";
import { GoogleLogin } from "@react-oauth/google";
import {
  FiMail,
  FiLock,
  FiEye,
  FiEyeOff,
} from "react-icons/fi";
import {
  Link,
  useNavigate,
} from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

import logoFavicon from "../assets/logo-favicon.png";
import logoLightText from "../assets/logo-light-text.png";
import logoDarkText from "../assets/logo-dark-text.png";

import "../styles/auth.css";

const API_URL = process.env.REACT_APP_API_URL;

export default function Login() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
  setError("");

  setFormData((prev) => ({
    ...prev,
    [e.target.name]: e.target.value,
  }));
};

  // ================= NORMAL LOGIN =================

  const handleSubmit = async (e) => {
  e.preventDefault();

  setError("");

  if (!formData.email || !formData.password) {
    setError("Please fill all fields.");
    return;
  }

  try {
    setLoading(true);

    const res = await axios.post(
      `${API_URL}/api/auth/login`,
      formData
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    navigate("/dashboard");
  } catch (err) {
    setError(
      err.response?.data?.message || "Login failed."
    );
  } finally {
    setLoading(false);
  }
};

  // ================= GOOGLE LOGIN =================
  // const handleGoogleSuccess = async (
  //   credentialResponse
  // ) => {
  //   try {
  //     const res = await axios.post(
  //       `${API_URL}/api/auth/google`,
  //       {
  //         token:
  //           credentialResponse.credential,
  //       }
  //     );

  //     localStorage.setItem(
  //       "token",
  //       res.data.token
  //     );

  //     localStorage.setItem(
  //       "user",
  //       JSON.stringify(res.data.user)
  //     );

  //     navigate("/dashboard");
  //   } catch (err) {
  //     alert(
  //       err.response?.data?.message ||
  //         "Google login failed."
  //     );
  //   }
  // };

  const handleGoogleSuccess = async (credentialResponse) => {
  try {
    setError("");

    const res = await axios.post(
      `${API_URL}/api/auth/google`,
      {
        token: credentialResponse.credential,
      }
    );

    localStorage.setItem("token", res.data.token);
    localStorage.setItem("user", JSON.stringify(res.data.user));

    navigate("/dashboard");
  } catch (err) {
    setError(
      err.response?.data?.message ||
      "Google login failed."
    );
  }
};

  return (
    <div className="auth-page">
      <div className="bg-glow"></div>

      <div className="auth-card">
        <div className="auth-logo">
          <div className="logo-icon">
            <img
              src={logoFavicon}
              alt="logo"
            />
          </div>

          <div className="logo-text">
            <img
              src={
                darkMode
                  ? logoDarkText
                  : logoLightText
              }
              alt="logo-text"
            />

            <p>
              Virtual Numbers & OTP
              Verification
            </p>
          </div>
        </div>

        <div className="auth-content">
          <h2>Welcome Back</h2>

          <p className="auth-subtitle">
            Sign in to access your virtual
            numbers, SMS inbox and account
            dashboard.
          </p>

          {error && (
  <div className="auth-error">
    {error}
  </div>
)}

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>

              <div className="input-wrapper">
                <FiMail />

                <input
                  type="email"
                  name="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-group">
  <label>Password</label>

  <div className="input-wrapper">
    <FiLock />

    <input
      type={showPassword ? "text" : "password"}
      name="password"
      placeholder="••••••••"
      value={formData.password}
      onChange={handleChange}
    />

    <button
      type="button"
      className="password-toggle"
      onClick={() =>
        setShowPassword((prev) => !prev)
      }
      aria-label={
        showPassword
          ? "Hide password"
          : "Show password"
      }
    >
      {showPassword ? (
        <FiEyeOff />
      ) : (
        <FiEye />
      )}
    </button>
  </div>
</div>

            <div className="form-row">
              <label className="remember-me">
                <input type="checkbox" />
                Remember me
              </label>

              <Link to="/forgot-password">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              className="auth-btn"
              disabled={loading}
            >
              {loading
                ? "Signing In..."
                : "Sign In"}
            </button>
          </form>

          <div className="divider">
            <span>OR</span>
          </div>

        <div className="google-btn-wrapper">
  <GoogleLogin
    onSuccess={handleGoogleSuccess}
    onError={() => alert("Google login failed.")}
    theme={darkMode ? "filled_black" : "outline"}
    size="large"
    text="continue_with"
    shape="rectangular"
    width="330"
  />
</div>

          <p className="auth-footer">
            Don't have an account?{" "}
            <Link to="/register">
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
