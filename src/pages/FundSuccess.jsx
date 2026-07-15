import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiCheck,
  FiCheckCircle,
  FiArrowRight,
  FiHome,
  FiClock,
} from "react-icons/fi";

import "../styles/fund-result.css";

const FundSuccess = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(8);

  useEffect(() => {
    document.title = "Funding Successful - RealSMS";

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate("/dashboard");
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="fund-status-page">

      <div className="floating-dots dots-left" />
      <div className="floating-dots dots-right" />

      <div className="fund-status-card fund-success">

        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
        <div className="shape shape3"></div>

        <div className="icon-wrapper">
          <div className="status-icon success-icon">
            <FiCheck />
          </div>
        </div>

        <h2>
          Payment <span className="success-status">Successful</span>
        </h2>

        <p>
          Your wallet has been funded successfully.
          <br />
          Your balance is available immediately.
        </p>

        <div className="success-box">
          <FiCheckCircle />

          <div>
            <h4>Wallet Credited</h4>
            <p>Your payment has been confirmed successfully.</p>
          </div>
        </div>

        <div className="wallet-result-actions">

          <button
            className="wallet-primary-btn"
            onClick={() => navigate("/dashboard")}
          >
            <FiHome />
            Dashboard
          </button>

          <button
            className="wallet-secondary-btn"
            onClick={() => navigate("/buy-number")}
          >
            Buy Number
            <FiArrowRight />
          </button>

        </div>

      </div>

      <div className="redirect-info">
        <FiClock />
        Redirecting automatically in
        <span className="success-countdown">
          {countdown}
        </span>
        seconds...
      </div>

    </div>
  );
};

export default FundSuccess;
