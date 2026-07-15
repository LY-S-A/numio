import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiCheckCircle,
  FiArrowRight,
  FiHome,
} from "react-icons/fi";

import "../styles/fund-result.css";

const FundSuccess = () => {
  const navigate = useNavigate();

  return (
    <div className="wallet-page">

      <div className="wallet-header">
        <h1>Wallet Funded</h1>
        <p>Your payment was processed successfully.</p>
      </div>

      <div className="wallet-result-card success">

        <div className="wallet-result-icon success">
          <FiCheckCircle />
        </div>

        <h2>Payment Successful</h2>

        <p>
          Your wallet has been credited successfully.
          You can now purchase numbers or use your
          balance immediately.
        </p>

        <div className="wallet-result-info">

          <div className="wallet-result-row">
            <span>Status</span>
            <strong className="success-text">
              Successful
            </strong>
          </div>

          <div className="wallet-result-row">
            <span>Wallet</span>
            <strong>Credited Automatically</strong>
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

    </div>
  );
};

export default FundSuccess;
