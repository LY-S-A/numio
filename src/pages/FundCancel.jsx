import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  FiX,
  FiAlertCircle,
  FiRefreshCw,
  FiArrowLeft,
  FiClock,
} from "react-icons/fi";

import "../styles/fund-cancel.css";

const FundCancel = () => {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(8);

  useEffect(() => {
    document.title = "Payment Cancelled - RealSMS";

    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          navigate("/fund-wallet");
          return 0;
        }

        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <div className="fund-status-page">

      {/* Floating Background */}
      <div className="floating-dots dots-left" />
      <div className="floating-dots dots-right" />

      <div className="fund-status-card cancel">

        {/* Decorative Shapes */}
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
        <div className="shape shape3"></div>

        {/* Cancel Icon */}
        <div className="icon-wrapper">
          <div className="status-icon-cancel">
            <FiX />
          </div>
        </div>

        {/* Title */}
        <h2>
          Payment <span className="cancel-status">Cancelled</span>
        </h2>

        <p>
          Your payment was cancelled or could not be verified.
          <br />
          No funds have been deducted from your wallet.
        </p>

        {/* Warning Box */}
        <div className="warning-box">
          <FiAlertCircle />

          <div>
            <h4>Don't worry!</h4>
            <p>Your wallet balance remains unchanged.</p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="wallet-result-actions">

          <button
            className="wallet-cancel-primary-btn"
            onClick={() => navigate("/fund-wallet")}
          >
            <FiRefreshCw />
            Try Again
          </button>

          <button
            className="wallet-cancel-secondary-btn"
            onClick={() => navigate("/dashboard")}
          >
            <FiArrowLeft />
            Dashboard
          </button>

        </div>

      </div>

      {/* Countdown */}
      <div className="redirect-info">
        <FiClock />
        Redirecting automatically in
        <span className="cancel-countdown">
          {countdown}
        </span>
        seconds...
      </div>

    </div>
  );
};

export default FundCancel;
