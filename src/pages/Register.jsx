// import {
//   FiUser,
//   FiMail,
//   FiLock,
// } from "react-icons/fi";
// import { useTheme } from "../context/ThemeContext";

// import logoFavicon from "../assets/logo-favicon.png";
// import logoLightText from "../assets/logo-light-text.png";
// import logoDarkText from "../assets/logo-dark-text.png";

// import "../styles/auth.css";

// export default function Register() {
//   const { darkMode } = useTheme();

//   return (
//     <div className="auth-page">
//       <div className="auth-card">
//         <div className="auth-logo">
//           <div className="logo-icon">
//             <img
//               src={logoFavicon}
//               alt="numio-favicon"
//             />
//           </div>

//           <div className="logo-text">
//             <img
//               src={
//                 darkMode
//                   ? logoDarkText
//                   : logoLightText
//               }
//               alt="numio-text"
//             />

//             <p>
//               Virtual Numbers & OTP Verification
//             </p>
//           </div>
//         </div>

//         <div className="auth-content">
//           <h2>Create Account</h2>

//           <p className="auth-subtitle">
//             Join NUMIO and start receiving OTPs
//             instantly with secure virtual numbers.
//           </p>

//           <form>
//             <div className="form-group">
//               <label>Full Name</label>

//               <div className="input-wrapper">
//                 <FiUser />
//                 <input
//                   type="text"
//                   placeholder="John Doe"
//                 />
//               </div>
//             </div>

//             <div className="form-group">
//               <label>Email Address</label>

//               <div className="input-wrapper">
//                 <FiMail />
//                 <input
//                   type="email"
//                   placeholder="you@example.com"
//                 />
//               </div>
//             </div>

//             <div className="form-group">
//               <label>Password</label>

//               <div className="input-wrapper">
//                 <FiLock />
//                 <input
//                   type="password"
//                   placeholder="••••••••"
//                 />
//               </div>
//             </div>

//             <div className="form-group">
//               <label>Confirm Password</label>

//               <div className="input-wrapper">
//                 <FiLock />
//                 <input
//                   type="password"
//                   placeholder="••••••••"
//                 />
//               </div>
//             </div>

//             <div className="form-row">
//               <label className="remember-me">
//                 <input type="checkbox" />
//                 I agree to the Terms &
//                 Conditions
//               </label>
//             </div>

//             <button
//               type="submit"
//               className="auth-btn"
//             >
//               Create Account
//             </button>
//           </form>

//           <p className="auth-footer">
//             Already have an account?
//             <a href="/login"> Login</a>
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import axios from "axios";
import {
  FiUser,
  FiMail,
  FiLock,
} from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../context/ThemeContext";

import logoFavicon from "../assets/logo-favicon.png";
import logoLightText from "../assets/logo-light-text.png";
import logoDarkText from "../assets/logo-dark-text.png";

import "../styles/auth.css";

const API_URL = process.env.REACT_APP_API_URL;

export default function Register() {
  const { darkMode } = useTheme();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    agree: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      username,
      email,
      password,
      confirmPassword,
      agree,
    } = formData;

    if (!username || !email || !password || !confirmPassword) {
      return alert("Please fill all fields.");
    }

    if (password !== confirmPassword) {
      return alert("Passwords do not match.");
    }

    if (!agree) {
      return alert("Please accept the Terms & Conditions.");
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${API_URL}/auth/register`,
        {
          username,
          email,
          password,
        }
      );

      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      navigate("/dashboard");
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Registration failed."
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
          <h2>Create Account</h2>

          <p className="auth-subtitle">
            Join NUMIO and start receiving
            OTPs instantly with secure
            virtual numbers.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Username</label>

              <div className="input-wrapper">
                <FiUser />

                <input
                  type="text"
                  name="username"
                  placeholder="johndoe"
                  value={formData.username}
                  onChange={handleChange}
                />
              </div>
            </div>

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
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="form-row">
              <label className="remember-me">
                <input
                  type="checkbox"
                  name="agree"
                  checked={formData.agree}
                  onChange={handleChange}
                />
                I agree to the Terms &
                Conditions
              </label>
            </div>

            <button
              type="submit"
              className="auth-btn"
              disabled={loading}
            >
              {loading
                ? "Creating Account..."
                : "Create Account"}
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
