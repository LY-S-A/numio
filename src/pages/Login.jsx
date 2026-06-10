import {
  FiMail,
  FiLock,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

import logoFavicon from "../assets/logo-favicon.png";
import logoLightText from "../assets/logo-light-text.png";
import logoDarkText from "../assets/logo-dark-text.png";

import "../styles/auth.css";

export default function Login() {
  const { darkMode } = useTheme();

  const navigate = useNavigate();

const handleSubmit = (e) => {
  e.preventDefault();

  // Add your login logic here

  navigate("/dashboard");
};

  return (
    <div className="auth-page">
      {/* Background Glow */}
      <div className="auth-glow auth-glow-1"></div>
      <div className="auth-glow auth-glow-2"></div>

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
          <h2>Welcome Back</h2>

          <p className="auth-subtitle">
            Sign in to access your virtual
            numbers, SMS inbox and account
            dashboard.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Email Address</label>

              <div className="input-wrapper">
                <FiMail />

                <input
                  type="email"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>

              <div className="input-wrapper">
                <FiLock />

                <input
                  type="password"
                  placeholder="••••••••"
                />
              </div>
            </div>

            <div className="form-row">
              <label className="remember-me">
                <input type="checkbox" />
                Remember me
              </label>

              <a href="/">
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="auth-btn"
            >
              Sign In
            </button>
          </form>

          <div className="divider">
            <span>OR</span>
          </div>

          <button className="social-btn">
            <img
              src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
              alt="Google"
            />

            Continue with Google
          </button>

          <p className="auth-footer">
            Don't have an account?{" "}
            <a href="/register">
              Create Account
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}