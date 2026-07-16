import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  FiInfo,
  FiChevronRight,
} from "react-icons/fi";

import flutterwaveLogo from "../assets/flutterwave.png";
import paystackLogo from "../assets/paystack.png";

import "../styles/fund-wallet.css";

const API_URL = process.env.REACT_APP_API_URL;

const quickAmounts = [1000, 5000, 10000, 50000];

const FundWallet = () => {
  const [amount, setAmount] = useState("");
  const [gateway, setGateway] = useState("flutterwave");
  const [loading, setLoading] = useState(false);
  const [recentDeposits, setRecentDeposits] = useState([]);
  const [loadingDeposits, setLoadingDeposits] = useState(true);

  useEffect(() => {
  const gatewayName =
    gateway === "flutterwave" ? "Flutterwave" : "Paystack";

  document.title = `Fund Wallet (${gatewayName}) - Numio`;
}, [gateway]);

  const handleQuickAmount = (value) => {
    setAmount(value);
  };

  const handleFundWallet = async () => {
    if (!amount || Number(amount) < 1000) {
      return alert("Minimum deposit is ₦1,000");
    }

    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const endpoint =
        gateway === "flutterwave"
          ? `${API_URL}/api/flutterwave/init`
          : `${API_URL}/api/paystack/init`;

      const { data } = await axios.post(
        endpoint,
        {
          amount: Number(amount),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      window.location.href = data.paymentUrl;
    } catch (err) {
      alert(
        err.response?.data?.message ||
          "Unable to initialize payment."
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchRecentDeposits = async () => {
  try {
    setLoadingDeposits(true);

    const token = localStorage.getItem("token");

    const { data } = await axios.get(
      `${API_URL}/api/transaction/deposits`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    setRecentDeposits(data.deposits || []);
  } catch (err) {
    console.error(err);
  } finally {
    setLoadingDeposits(false);
  }
};

useEffect(() => {
  fetchRecentDeposits();
}, []);
  
  const formatDate = (date) => {
  return new Date(date).toLocaleString("en-NG", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "2-digit",
  });
};

  return (
    <div className="wallet-page">

      {/* HEADER */}
      <div className="wallet-header">
        <h1>Fund Wallet</h1>

        <p>
          Add funds to your account using a secure payment gateway.
        </p>
      </div>

      {/* CARD */}
      <div className="wallet-card">

        {/* STEPS */}
        <div className="wallet-steps">

          <div className="wallet-step active">
            <div className="wallet-step-circle">1</div>

            <div>
              <h4>Enter Amount</h4>
              <p>Choose amount to fund</p>
            </div>
          </div>

          <div className="wallet-step-arrow">
            <FiChevronRight />
          </div>

          <div className="wallet-step active">
            <div className="wallet-step-circle">2</div>

            <div>
              <h4>Select Gateway</h4>
              <p>Choose payment method</p>
            </div>
          </div>

          <div className="wallet-step-arrow">
            <FiChevronRight />
          </div>

          <div className="wallet-step active">
            <div className="wallet-step-circle">3</div>

            <div>
              <h4>Complete Payment</h4>
              <p>Secure checkout</p>
            </div>
          </div>

        </div>

        {/* FORM */}
        <div className="wallet-form">

          {/* Amount */}
          <div className="wallet-field">
            <label>Amount</label>

            <div className="wallet-amount-input">
              <span>₦</span>

              <input
                type="number"
                placeholder="5000"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
              />
            </div>
          </div>

          {/* Quick Amounts */}
          <div className="wallet-field">

            <label>
              Min: ₦1,000 • Max: ₦500,000
            </label>

            <div className="wallet-quick-amounts">

              {quickAmounts.map((value) => (

                <button
                  key={value}
                  type="button"
                  className={
                    Number(amount) === value
                      ? "active"
                      : ""
                  }
                  onClick={() =>
                    handleQuickAmount(value)
                  }
                >
                  ₦{value.toLocaleString()}
                </button>

              ))}

            </div>

          </div>

          {/* Payment Gateway */}
          <div className="wallet-field">

            <label>Payment Gateway</label>

            <div className="wallet-gateway-grid">
                            {/* Flutterwave */}
              <div
                className={`wallet-gateway-card ${
                  gateway === "flutterwave" ? "active" : ""
                }`}
                onClick={() => setGateway("flutterwave")}
              >
                <div className="wallet-gateway-left">
                  <img
                    src={flutterwaveLogo}
                    alt="Flutterwave"
                    className="wallet-gateway-logo"
                  />

                  <div>
                    <h4>Flutterwave</h4>
                    <p>Card • Transfer • USSD</p>
                  </div>
                </div>

                <div
                  className={`wallet-radio ${
                    gateway === "flutterwave" ? "active" : ""
                  }`}
                >
                  <span />
                </div>
              </div>

              {/* Paystack */}
              <div
                className={`wallet-gateway-card ${
                  gateway === "paystack" ? "active" : ""
                }`}
                onClick={() => setGateway("paystack")}
              >
                <div className="wallet-gateway-left">
                  <img
                    src={paystackLogo}
                    alt="Paystack"
                    className="wallet-gateway-logo"
                  />

                  <div>
                    <h4>Paystack</h4>
                    <p>Card • Bank Transfer • USSD</p>
                  </div>
                </div>

                <div
                  className={`wallet-radio ${
                    gateway === "paystack" ? "active" : ""
                  }`}
                >
                  <span />
                </div>
              </div>

            </div>
          </div>

        </div>

        {/* ACTION */}
        <div className="wallet-action-row">

          <button
            className="wallet-fund-btn"
            onClick={handleFundWallet}
            disabled={loading}
          >
            {loading
              ? "Redirecting..."
              : `Fund via ${
                  gateway === "flutterwave"
                    ? "Flutterwave"
                    : "Paystack"
                }`}
          </button>

        </div>

        {/* NOTICE */}
        <div className="wallet-notice">
          <FiInfo />

          <span>
            Payments are securely processed through payment gateways.
          </span>
        </div>

      </div>

      {/* RECENT DEPOSITS */}
     <div className="wallet-transactions-card">

  <div className="wallet-transactions-header">
    <h3>Recent Deposits</h3>

    <button type="button">
      View All
    </button>
  </div>

  {loadingDeposits ? (
    <p className="wallet-empty">
      Loading...
    </p>
  ) : recentDeposits.length === 0 ? (
    <p className="wallet-empty">
      No deposits yet.
    </p>
  ) : (
    recentDeposits.slice(0, 5).map((deposit) => (
      <div
        className="wallet-transaction-item"
        key={deposit._id}
      >
        <div>
          <h4>
            {deposit.gateway === "flutterwave"
              ? "Flutterwave Deposit"
              : "Paystack Deposit"}
          </h4>

          <p>{formatDate(deposit.createdAt)}</p>
        </div>

        <div className="wallet-transaction-right">
          <span
            className={
              deposit.status === "success"
                ? "wallet-success"
                : deposit.status === "pending"
                ? "wallet-pending"
                : "wallet-failed"
            }
          >
            {deposit.status}
          </span>

          <h4>
            +₦{Number(deposit.amount).toLocaleString()}
          </h4>
        </div>
      </div>
    ))
  )}

</div>
            
      {/* HELP CARD */}
      <div className="wallet-help-card">

        <div>
          <h4>Need help funding?</h4>

          <p>
            Contact our support team if your payment
            hasn't reflected in your wallet after a
            successful transaction.
          </p>
        </div>

        <button
          className="wallet-docs-btn"
          onClick={() => window.location.href = "/support"}
        >
          Contact Support
        </button>

      </div>

    </div>
  );
};

export default FundWallet;
