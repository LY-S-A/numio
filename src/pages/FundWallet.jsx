import {
  FiInfo,
  FiRefreshCw,
  FiChevronRight,
} from "react-icons/fi";

import flutterwaveLogo from "../assets/flutterwave.png";
import korapayLogo from "../assets/korapay.png";

import "../styles/fund-wallet.css";

const FundWallet = () => {
  return (
  
      <div className="wallet-page">

        {/* HEADER */}
        <div className="wallet-header">
          <h1>Fund Wallet</h1>
          <p>
            Add funds to your account using available payment gateways.
          </p>
        </div>

        {/* FUND CARD */}
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

            <div className="wallet-field">
              <label>Amount</label>

              <div className="wallet-amount-input">
                <span>₦</span>

                <input
                  type="number"
                  placeholder="5000"
                />
              </div>
            </div>

            <div className="wallet-field">
              <label>Min: ₦1,000 • Max: ₦500,000</label>

              <div className="wallet-quick-amounts">
                <button type="button">₦1,000</button>

                <button
                  type="button"
                  className="active"
                >
                  ₦5,000
                </button>

                <button type="button">₦10,000</button>

                <button type="button">₦50,000</button>
              </div>
            </div>

            <div className="wallet-field">
              <label>Payment Gateway</label>

              <div className="wallet-gateway-grid">

                <div className="wallet-gateway-card active">

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

                  <div className="wallet-radio active">
                    <span></span>
                  </div>

                </div>

                <div className="wallet-gateway-card">

                  <div className="wallet-gateway-left">

                    <img
                      src={korapayLogo}
                      alt="Korapay"
                      className="wallet-gateway-logo"
                    />

                    <div>
                      <h4>Korapay</h4>
                      <p>Card • Transfer</p>
                    </div>

                  </div>

                  <div className="wallet-radio">
                    <span></span>
                  </div>

                </div>

              </div>
            </div>

          </div>

          {/* ACTION */}
          <div className="wallet-action-row">

            <button className="wallet-fund-btn">
              Fund Wallet
            </button>

          </div>

          <div className="wallet-notice">
            <FiInfo />

            <span>
              Payments are securely processed through
              payment gateways.
            </span>
          </div>

        </div>

        {/* BALANCE CARD */}
        <div className="wallet-balance-card">

          <div className="wallet-balance-header">

            <h3>Wallet Balance</h3>

            <button className="wallet-refresh-btn">
              <FiRefreshCw />
              Refresh
            </button>

          </div>

          <div className="wallet-balance-amount">
            ₦100,900.00
          </div>

          <p>
            Available balance for purchasing
            your numbers.
          </p>

        </div>

        {/* TRANSACTIONS */}
        <div className="wallet-transactions-card">

          <div className="wallet-transactions-header">

            <h3>Recent Deposits</h3>

            <button type="button">
              View All
            </button>

          </div>

          <div className="wallet-transaction-item">

            <div>
              <h4>Flutterwave Deposit</h4>
              <p>Today • 11:35 AM</p>
            </div>

            <div className="wallet-transaction-right">
              <span className="wallet-success">
                Success
              </span>

              <h4>+₦5,000</h4>
            </div>

          </div>

          <div className="wallet-transaction-item">

            <div>
              <h4>Korapay Deposit</h4>
              <p>Yesterday • 4:12 PM</p>
            </div>

            <div className="wallet-transaction-right">
              <span className="wallet-success">
                Success
              </span>

              <h4>+₦10,000</h4>
            </div>

          </div>

          <div className="wallet-transaction-item">

            <div>
              <h4>Flutterwave Deposit</h4>
              <p>Jun 05 • 08:45 AM</p>
            </div>

            <div className="wallet-transaction-right">
              <span className="wallet-pending">
                Pending
              </span>

              <h4>+₦2,500</h4>
            </div>

          </div>

        </div>

        {/* HELP CARD */}
        <div className="wallet-help-card">

          <div>
            <h4>Need help funding?</h4>

            <p>
              Contact support if your payment
              hasn't reflected in your wallet.
            </p>
          </div>

          <button className="wallet-docs-btn">
            Contact Support
          </button>

        </div>

      </div>
  );
};

export default FundWallet;