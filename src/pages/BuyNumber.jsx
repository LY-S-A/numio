import {
  FiRefreshCw,
  FiCopy,
  FiTrash2,
  FiInfo,
  FiChevronRight,
} from "react-icons/fi";

import "../styles/buy-number.css";

const BuyNumber = () => {
  // waiting | received | expired | refunded
  const status = "waiting";

  const smsMessages = [];

  return (
    <div className="buy-number-page">
      {/* HEADER */}
      <div className="page-header">
        <h1>Buy Number</h1>
        <p>
          Get a temporary number to receive SMS
          verification codes
        </p>
      </div>

      {/* PURCHASE CARD */}
      <div className="buy-card">
        {/* STEPS */}
        <div className="steps-row">
          <div className="step-item active">
            <div className="step-circle">1</div>
            <div>
              <h4>Select Service</h4>
              <p>Choose the platform</p>
            </div>
          </div>

          <div className="step-arrow">
            <FiChevronRight />
          </div>

          <div className="step-item active">
            <div className="step-circle">2</div>
            <div>
              <h4>Select Country</h4>
              <p>Choose the country</p>
            </div>
          </div>

          <div className="step-arrow">
            <FiChevronRight />
          </div>

          <div className="step-item active">
            <div className="step-circle">3</div>
            <div>
              <h4>Get Number</h4>
              <p>Receive your number</p>
            </div>
          </div>
        </div>

        {/* FORM */}
        <div className="buy-form">
          <div className="field">
            <label>Service</label>

            <div className="select-wrapper">
              <select>
                <option>WhatsApp</option>
                <option>Telegram</option>
                <option>Google</option>
                <option>Facebook</option>
                <option>Discord</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label>Country</label>

            <div className="select-wrapper">
              <select>
                <option>Nigeria (+234)</option>
                <option>United Kingdom (+44)</option>
                <option>United States (+1)</option>
                <option>Canada (+1)</option>
              </select>
            </div>
          </div>

          <div className="field">
            <label>Quantity (Optional)</label>

            <div className="qty-box">
              <button type="button">−</button>
              <span>1</span>
              <button type="button">+</button>
            </div>
          </div>
        </div>

        {/* ACTION */}
        <div className="action-row">
          <button className="get-number-btn">
            Get Number
          </button>

          <div className="price-box">
            <span>Estimated Price</span>
            <h3>$0.30</h3>
          </div>
        </div>

        <div className="notice">
          <FiInfo />
          <span>
            Number will be reserved for 20 minutes.
            Receive SMS within the time limit.
          </span>
        </div>
      </div>

      {/* ASSIGNED NUMBER + SMS */}
      <div className="assigned-wrapper">
        <div className="assigned-top">
          <div className="assigned-title">
            <h3>Assigned Number</h3>

            <span className="status-badge">
              <span className="status-dot"></span>
              Active
            </span>
          </div>

          <button className="refresh-btn">
            <FiRefreshCw />
            Refresh
          </button>
        </div>

        <div className="assigned-grid">
          {/* NUMBER CARD */}
          <div className="number-card">
            <div className="number-header">
              <h2>+234 901 234 5678</h2>

              <button type="button">
                <FiCopy />
              </button>
            </div>

            <p>
              Expires in <strong>19:42</strong>
            </p>

            <button className="cancel-btn">
              <FiTrash2 />
              Cancel Number
            </button>
          </div>

          {/* SMS CARD */}
          <div className="sms-cards">
            <h3>SMS Inbox</h3>

            {smsMessages.length > 0 ? (
              smsMessages.map((sms, index) => (
                <div key={index} className="sms-message">
                  <h4>Verification Code</h4>
                  <p>{sms.message}</p>
                </div>
              ))
            ) : (
              <div className="sms-empty">
                <h4>No messages yet</h4>
                <p>Waiting for SMS...</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* HELP CARD */}
      <div className="help-card">
        <div>
          <h4>Need help?</h4>
          <p>
            Check our documentation or contact
            support.
          </p>
        </div>

        <button className="docs-btn">
          View Docs
        </button>
      </div>
    </div>
  );
};

export default BuyNumber;
