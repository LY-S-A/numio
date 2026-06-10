import {
  FiUser,
  FiMail,
  FiLock,
} from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

import logoFavicon from "../assets/logo-favicon.png";
import logoLightText from "../assets/logo-light-text.png";
import logoDarkText from "../assets/logo-dark-text.png";

import "../styles/auth.css";

export default function Register() {
  const { darkMode } = useTheme();

  return (
    <div className="auth-page">
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
              Virtual Numbers & OTP Verification
            </p>
          </div>
        </div>

        <div className="auth-content">
          <h2>Create Account</h2>

          <p className="auth-subtitle">
            Join NUMIO and start receiving OTPs
            instantly with secure virtual numbers.
          </p>

          <form>
            <div className="form-group">
              <label>Full Name</label>

              <div className="input-wrapper">
                <FiUser />
                <input
                  type="text"
                  placeholder="John Doe"
                />
              </div>
            </div>

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

            <div className="form-group">
              <label>Confirm Password</label>

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
                I agree to the Terms &
                Conditions
              </label>
            </div>

            <button
              type="submit"
              className="auth-btn"
            >
              Create Account
            </button>
          </form>

          <p className="auth-footer">
            Already have an account?
            <a href="/login"> Login</a>
          </p>
        </div>
      </div>
    </div>
  );
}