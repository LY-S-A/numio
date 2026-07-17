// import {
//   FiRefreshCw,
//   FiCopy,
//   FiTrash2,
//   FiInfo,
//   FiChevronRight,
// } from "react-icons/fi";

// import "../styles/buy-number.css";

// const BuyNumber = () => {
  
//   const smsMessages = [];

//   return (
//     <div className="buy-number-page">
//       {/* HEADER */}
//       <div className="page-header">
//         <h1>Buy Number</h1>
//         <p>
//           Get a temporary number to receive SMS
//           verification codes
//         </p>
//       </div>

//       {/* PURCHASE CARD */}
//       <div className="buy-card">
//         {/* STEPS */}
//         <div className="steps-row">
//           <div className="step-item active">
//             <div className="step-circle">1</div>
//             <div>
//               <h4>Select Service</h4>
//               <p>Choose the platform</p>
//             </div>
//           </div>

//           <div className="step-arrow">
//             <FiChevronRight />
//           </div>

//           <div className="step-item active">
//             <div className="step-circle">2</div>
//             <div>
//               <h4>Select Country</h4>
//               <p>Choose the country</p>
//             </div>
//           </div>

//           <div className="step-arrow">
//             <FiChevronRight />
//           </div>

//           <div className="step-item active">
//             <div className="step-circle">3</div>
//             <div>
//               <h4>Get Number</h4>
//               <p>Receive your number</p>
//             </div>
//           </div>
//         </div>

//         {/* FORM */}
//         <div className="buy-form">
//           <div className="field">
//             <label>Service</label>

//             <div className="select-wrapper">
//               <select>
//                 <option>WhatsApp</option>
//                 <option>Telegram</option>
//                 <option>Google</option>
//                 <option>Facebook</option>
//                 <option>Discord</option>
//               </select>
//             </div>
//           </div>

//           <div className="field">
//             <label>Country</label>

//             <div className="select-wrapper">
//               <select>
//                 <option>Nigeria (+234)</option>
//                 <option>United Kingdom (+44)</option>
//                 <option>United States (+1)</option>
//                 <option>Canada (+1)</option>
//               </select>
//             </div>
//           </div>
//         </div>

//         {/* ACTION */}
//         <div className="action-row">
//           <button className="get-number-btn">
//             Get Number
//           </button>

//           <div className="price-box">
//             <span>Estimated Price</span>
//             <h3>$0.30</h3>
//           </div>
//         </div>

//         <div className="notice">
//           <FiInfo />
//           <span>
//             Number will be reserved for 20 minutes.
//             Receive SMS within the time limit.
//           </span>
//         </div>
//       </div>

//       {/* ASSIGNED NUMBER + SMS */}
//       <div className="assigned-wrapper">
//         <div className="assigned-top">
//           <div className="assigned-title">
//             <h3>Assigned Number</h3>

//             <span className="status-badge">
//               <span className="status-dot"></span>
//               Active
//             </span>
//           </div>

//           <button className="refresh-btn">
//             <FiRefreshCw />
//             Refresh
//           </button>
//         </div>

//         <div className="assigned-grid">
//           {/* NUMBER CARD */}
//           <div className="number-card">
//             <div className="number-header">
//               <h2>+234 901 234 5678</h2>

//               <button type="button">
//                 <FiCopy />
//               </button>
//             </div>

//             <p>
//               Expires in <strong>19:42</strong>
//             </p>

//             <button className="cancel-btn">
//               <FiTrash2 />
//               Cancel Number
//             </button>
//           </div>

//           {/* SMS CARD */}
//           <div className="sms-cards">
//             <h3>SMS Inbox</h3>

//             {smsMessages.length > 0 ? (
//               smsMessages.map((sms, index) => (
//                 <div key={index} className="sms-message">
//                   <h4>Verification Code</h4>
//                   <p>{sms.message}</p>
//                 </div>
//               ))
//             ) : (
//               <div className="sms-empty">
//                 <h4>No messages yet</h4>
//                 <p>Waiting for SMS...</p>
//               </div>
//             )}
//           </div>
//         </div>
//       </div>

//       {/* HELP CARD */}
//       <div className="help-card">
//         <div>
//           <h4>Need help?</h4>
//           <p>
//             Check our documentation or contact
//             support.
//           </p>
//         </div>

//         <button className="docs-btn">
//           View Docs
//         </button>
//       </div>
//     </div>
//   );
// };

// export default BuyNumber;

import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import {
  FiRefreshCw,
  FiCopy,
  FiTrash2,
  FiInfo,
  FiChevronRight,
} from "react-icons/fi";

import "../styles/buy-number.css";

const BuyNumber = () => {
  const token = localStorage.getItem("token");

  const [service, setService] = useState("whatsapp");
  const [country, setCountry] = useState("nigeria");

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [order, setOrder] = useState(null);
  const [smsMessages, setSmsMessages] = useState([]);

  const [timeLeft, setTimeLeft] = useState("");

  /*
  ========================================
  LOAD ACTIVE ORDER
  ========================================
  */

  const loadActiveOrder = useCallback(async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/5sim/active`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success && data.orders.length > 0) {
        setOrder(data.orders[0]);
        setSmsMessages(data.orders[0].sms || []);
      } else {
        setOrder(null);
        setSmsMessages([]);
      }
    } catch (error) {
      console.error(error);
    }
  }, [token]);

  /*
  ========================================
  BUY NUMBER
  ========================================
  */

  const buyNumber = async () => {
    try {
      setLoading(true);

      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/5sim/buy`,
        {
          service,
          country,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setOrder(data.order);
      setSmsMessages(data.order.sms || []);

      alert(data.message);
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to purchase number."
      );
    } finally {
      setLoading(false);
    }
  };

  /*
  ========================================
  REFRESH SMS
  ========================================
  */

  const refreshSMS = useCallback(async () => {
    if (!order) return;

    try {
      setRefreshing(true);

      const { data } = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/5sim/refresh/${order._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.success) {
        setOrder(data.order);
        setSmsMessages(data.sms || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setRefreshing(false);
    }
  }, [order, token]);

  /*
  ========================================
  CANCEL NUMBER
  ========================================
  */

  const cancelNumber = async () => {
    if (!order) return;

    const confirmed = window.confirm(
      "Are you sure you want to cancel this number?"
    );

    if (!confirmed) return;

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/5sim/cancel/${order._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(data.message);

      setOrder(null);
      setSmsMessages([]);
      setTimeLeft("");

      loadActiveOrder();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to cancel number."
      );
    }
  };

  /*
  ========================================
  COPY NUMBER
  ========================================
  */

  const copyNumber = () => {
    if (!order) return;

    navigator.clipboard.writeText(order.phone);

    alert("Number copied successfully.");
  };

  /*
  ========================================
  FINISH ORDER (OPTIONAL)
  ========================================
  */

  const finishOrder = async () => {
    if (!order) return;

    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/5sim/finish/${order._id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert(data.message);

      loadActiveOrder();
    } catch (error) {
      alert(
        error.response?.data?.message ||
          "Unable to finish order."
      );
    }
  };

   /*
  ========================================
  PAGE LOAD
  ========================================
  */

  useEffect(() => {
    document.title = "Buy Number - Numio";
    loadActiveOrder();
  }, [loadActiveOrder]);

  /*
  ========================================
  COUNTDOWN TIMER
  ========================================
  */

  useEffect(() => {
    if (!order?.expires) {
      setTimeLeft("");
      return;
    }

    const updateCountdown = () => {
      const diff =
        new Date(order.expires).getTime() - Date.now();

      if (diff <= 0) {
        setTimeLeft("Expired");
        return;
      }

      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);

      setTimeLeft(
        `${minutes}:${seconds
          .toString()
          .padStart(2, "0")}`
      );
    };

    updateCountdown();

    const interval = setInterval(updateCountdown, 1000);

    return () => clearInterval(interval);
  }, [order]);

  /*
  ========================================
  AUTO REFRESH SMS
  ========================================
  */

  useEffect(() => {
    if (!order) return;

    const interval = setInterval(() => {
      refreshSMS();
    }, 10000);

    return () => clearInterval(interval);
  }, [order, refreshSMS]);

  return (
    <div className="buy-page">

      {/* HEADER */}

      <div className="buy-header">
        <h1>Buy Number</h1>

        <p>
          Get a temporary number to receive
          SMS verification codes.
        </p>
      </div>

      {/* PURCHASE CARD */}

      <div className="buy-card">

        {/* STEPS */}

        <div className="steps-row">

          <div className="step-item active">
            <div className="step-circle">
              1
            </div>

            <div>
              <h4>Select Service</h4>

              <p>
                Choose the platform
              </p>
            </div>
          </div>

          <div className="step-arrow">
            <FiChevronRight />
          </div>

          <div className="step-item active">
            <div className="step-circle">
              2
            </div>

            <div>
              <h4>Select Country</h4>

              <p>
                Choose the country
              </p>
            </div>
          </div>

          <div className="step-arrow">
            <FiChevronRight />
          </div>

          <div className="step-item active">
            <div className="step-circle">
              3
            </div>

            <div>
              <h4>Get Number</h4>

              <p>
                Receive your number
              </p>
            </div>
          </div>

        </div>

        {/* FORM */}

        <div className="buy-form">

          <div className="field">

            <label>Service</label>

            <div className="select-wrapper">

              <select
                value={service}
                onChange={(e) =>
                  setService(
                    e.target.value
                  )
                }
              >
                <option value="whatsapp">
                  WhatsApp
                </option>

                <option value="telegram">
                  Telegram
                </option>

                <option value="google">
                  Google
                </option>

                <option value="facebook">
                  Facebook
                </option>

                <option value="discord">
                  Discord
                </option>

              </select>

            </div>

          </div>

          <div className="field">

            <label>Country</label>

            <div className="select-wrapper">

              <select
                value={country}
                onChange={(e) =>
                  setCountry(
                    e.target.value
                  )
                }
              >
                <option value="nigeria">
                  Nigeria (+234)
                </option>

                <option value="england">
                  United Kingdom (+44)
                </option>

                <option value="usa">
                  United States (+1)
                </option>

                <option value="canada">
                  Canada (+1)
                </option>

              </select>

            </div>

          </div>

        </div>

        {/* ACTION */}

        <div className="action-row">

          <button
            className="get-number-btn"
            onClick={buyNumber}
            disabled={
              loading || order
            }
          >
            {loading
              ? "Purchasing..."
              : order
              ? "Active Number Exists"
              : "Get Number"}
          </button>

          <div className="price-box">
            <span>
              Estimated Price
            </span>

            <h3>Auto</h3>
          </div>

        </div>

        <div className="notice">

          <FiInfo />

          <span>
            Your number will remain
            reserved until it expires or
            you manually finish/cancel
            the order.
          </span>

        </div>

      </div>

            {/* ASSIGNED NUMBER */}

      {order && (
        <div className="assigned-wrapper">

          <div className="assigned-top">

            <div className="assigned-title">
              <h3>Assigned Number</h3>

              <span className="status-badge">
                <span className="status-dot"></span>
                {order.status}
              </span>
            </div>

            <button
              className="refresh-btn"
              onClick={refreshSMS}
              disabled={refreshing}
            >
              <FiRefreshCw />

              {refreshing
                ? "Refreshing..."
                : "Refresh"}
            </button>

          </div>

          <div className="assigned-grid">

            {/* NUMBER CARD */}

            <div className="number-card">

              <div className="number-header">

                <h2>{order.phone}</h2>

                <button
                  type="button"
                  onClick={copyNumber}
                  title="Copy Number"
                >
                  <FiCopy />
                </button>

              </div>

              <p>
                Expires in{" "}
                <strong>{timeLeft}</strong>
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "20px",
                  flexWrap: "wrap",
                }}
              >

                <button
                  className="cancel-btn"
                  onClick={cancelNumber}
                >
                  <FiTrash2 />
                  Cancel
                </button>

                {(order.status === "RECEIVED" ||
                  smsMessages.length > 0) && (
                  <button
                    className="finish-btn"
                    onClick={finishOrder}
                  >
                    Finish
                  </button>
                )}

              </div>

            </div>

            {/* SMS CARD */}

            <div className="sms-cards">

              <h3>SMS Inbox</h3>

              {smsMessages.length > 0 ? (
                smsMessages.map((sms, index) => (
                  <div
                    key={index}
                    className="sms-message"
                  >
                    <h4>
                      {sms.code
                        ? `Verification Code: ${sms.code}`
                        : "Incoming SMS"}
                    </h4>

                    <p>{sms.text}</p>

                    {sms.sender && (
                      <small>
                        <strong>Sender:</strong>{" "}
                        {sms.sender}
                      </small>
                    )}

                    {sms.createdAt && (
                      <small
                        style={{
                          display: "block",
                          marginTop: "8px",
                          opacity: 0.7,
                        }}
                      >
                        {new Date(
                          sms.createdAt
                        ).toLocaleString()}
                      </small>
                    )}

                  </div>
                ))
              ) : (
                <div className="sms-empty">
                  <h4>No messages yet</h4>

                  <p>
                    Waiting for SMS...
                  </p>
                </div>
              )}

            </div>

          </div>

        </div>
      )}

      {/* HELP CARD */}

      <div className="help-card">

        <div>

          <h4>Need help?</h4>

          <p>
            Check our documentation or
            contact support if you
            experience any issues while
            purchasing numbers or
            receiving SMS.
          </p>

        </div>

        <button
          className="docs-btn"
          onClick={() => {
            // Replace with your docs/support route
            window.location.href = "/support";
          }}
        >
          View Docs
        </button>

      </div>

    </div>
  );
};

export default BuyNumber;
