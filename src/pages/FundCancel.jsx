import React from "react";
import { useNavigate } from "react-router-dom";
import {
  FiXCircle,
  FiRefreshCw,
  FiArrowLeft,
} from "react-icons/fi";

import "../styles/fund-result.css";

const FundCancel = () => {
  const navigate = useNavigate();

  return (
    <div className="wallet-page">

      <div className="wallet-header">
        <h1>Payment Cancelled</h1>
        <p>Your wallet was not funded.</p>
      </div>

      <div className="wallet-result-card cancel">

        <div className="wallet-result-icon cancel">
          <FiXCircle />
        </div>

        <h2>Payment Failed or Cancelled</h2>

        <p>
          The payment was cancelled or could not be
          verified. No funds have been deducted from
          your wallet.
        </p>

        <div className="wallet-result-info">

          <div className="wallet-result-row">
            <span>Status</span>
            <strong className="cancel-text">
              Cancelled
            </strong>
          </div>

          <div className="wallet-result-row">
            <span>Wallet</span>
            <strong>No Changes</strong>
          </div>

        </div>

        <div className="wallet-result-actions">

          <button
            className="wallet-primary-btn"
            onClick={() => navigate("/fund-wallet")}
          >
            <FiRefreshCw />
            Try Again
          </button>

          <button
            className="wallet-secondary-btn"
            onClick={() => navigate("/dashboard")}
          >
            <FiArrowLeft />
            Dashboard
          </button>

        </div>

      </div>

    </div>
  );
};

export default FundCancel;
