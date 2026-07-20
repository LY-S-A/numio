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

// import { useEffect, useState } from "react";
// import axios from "axios";
// import Select, { components } from "react-select";

// import {
//     FiRefreshCw,
//     FiCopy,
//     FiTrash2,
//     FiInfo,
//     FiChevronRight,
// } from "react-icons/fi";

// import "../styles/buy-number.css";

// const API = process.env.REACT_APP_API_URL;

// const BuyNumber = () => {
//     /* ===========================
//         STATE
//     =========================== */

//     const [services, setServices] = useState([]);
//     const [service, setService] = useState("");

//     const [countries, setCountries] = useState([]);
//     const [country, setCountry] = useState("");

//     const [order, setOrder] = useState(null);

//     const [loading, setLoading] = useState(false);
//     const [refreshing, setRefreshing] = useState(false);

//     const [smsMessages, setSmsMessages] = useState([]);

//     /* ===========================
//         PAGE TITLE
//     =========================== */

//     useEffect(() => {
//         document.title = "Buy Number - Numio";
//     }, []);

//     /* ===========================
//         AUTH
//     =========================== */

//     const getAuthConfig = () => ({
//         headers: {
//             Authorization: `Bearer ${localStorage.getItem("token")}`,
//         },
//     });

//     /* ===========================
//         FETCH COUNTRIES
//     =========================== */

//     useEffect(() => {
//         const fetchCountries = async () => {
//             try {
//                 const res = await axios.get(
//                     `${API}/api/5sim/countries`,
//                     getAuthConfig()
//                 );

//                 setCountries(res.data.countries || []);
//             } catch (err) {
//                 console.log(err.response?.data || err.message);
//             }
//         };

//         fetchCountries();
//     }, []);

//     /* ===========================
//         FETCH SERVICES
//     =========================== */

//     useEffect(() => {
//         if (!country) {
//             setServices([]);
//             setService("");
//             return;
//         }

//         const fetchServices = async () => {
//             try {
//                 const res = await axios.get(
//                     `${API}/api/5sim/services?country=${country}`,
//                     getAuthConfig()
//                 );

//                 setServices(res.data.services || []);
//                 setService("");
//             } catch (err) {
//                 console.log(err.response?.data || err.message);
//                 setServices([]);
//             }
//         };

//         fetchServices();
//     }, [country]);

//     /* ===========================
//         REACT-SELECT OPTIONS
//     =========================== */

//     const countryOptions = countries.map((item) => ({
//         value: item.code,
//         label: item.name.replace(/\b\w/g, (c) => c.toUpperCase()),
//     }));

//     const serviceOptions = services.map((item) => ({
//         value: item.name,
//         label: item.name
//             .replace(/_/g, " ")
//             .replace(/\b\w/g, (c) => c.toUpperCase()),
//         ngnPrice: item.ngnPrice,
//     }));

//     const selectedService =
//         serviceOptions.find(
//             (item) => item.value === service
//         ) || null;

//     /* ===========================
//         REACT-SELECT STYLES
//     =========================== */
//     const isMobile = window.matchMedia("(max-width: 768px)").matches;

//     const selectStyles = {
//         control: (base, state) => ({
//             ...base,
//             minHeight: 46,
//             height: 46,
//             borderRadius: 10,
//             borderColor: state.isFocused
//                 ? "var(--primary)"
//                 : "var(--border)",
//             backgroundColor: "var(--card)",
//             boxShadow: state.isFocused
//                 ? "0 0 0 3px rgba(124,58,237,.15)"
//                 : "none",
//             cursor: "pointer",
//             "&:hover": {
//                 borderColor: "var(--primary)",
//             },
//             paddingLeft: 4,
//             paddingRight: 4,
//         }),

//         valueContainer: (base) => ({
//             ...base,
//             height: 46,
//             padding: "0 14px",
//         }),

//         input: (base) => ({
//             ...base,
//             margin: 0,
//             padding: 0,
//             color: "var(--text)",
//             fontSize: isMobile ? 16 : 13,
//             fontWeight: 500,
//         }),

//         singleValue: (base) => ({
//             ...base,
//             color: "var(--text)",
//             fontSize: isMobile ? 16 : 13,
//             fontWeight: 500,
//         }),

//         placeholder: (base) => ({
//             ...base,
//             color: "var(--text-secondary)",
//             fontSize: 13,
//             fontWeight: 500,
//         }),

//         indicatorSeparator: () => ({
//             display: "none",
//         }),

//         dropdownIndicator: (base) => ({
//             ...base,
//             color: "var(--text-secondary)",
//             paddingRight: 12,

//             "&:hover": {
//                 color: "var(--text-secondary)",
//             },
//         }),

//         clearIndicator: (base) => ({
//             ...base,
//             color: "var(--text-secondary)",
//         }),

//         menuPortal: (base) => ({
//     ...base,
//     zIndex: 99999,
// }),

// menu: (base) => ({
//     ...base,
//     marginTop: 6,
//     backgroundColor: "var(--card)",
//     border: "1px solid var(--border)",
//     borderRadius: 10,
//     overflow: "hidden",
//     boxShadow: "0 10px 30px rgba(0,0,0,.35)",
// }),

// menuList: (base) => ({
//     ...base,
//     padding: 4,
//     backgroundColor: "var(--card)",
// }),

// option: (base, state) => ({
//     ...base,
//     backgroundColor: state.isSelected
//         ? "var(--primary)"
//         : state.isFocused
//         ? "rgba(124,58,237,.12)"
//         : "var(--card)",

//     color: state.isSelected
//         ? "#fff"
//         : "var(--text)",

//     fontSize: isMobile ? 16 : 13,
//     fontWeight: 500,
//     borderRadius: 8,
//     cursor: "pointer",
//     padding: "10px 12px",

//     ":active": {
//         backgroundColor: "rgba(124,58,237,.18)",
//     },
// }),

//         noOptionsMessage: (base) => ({
//             ...base,
//             color: "var(--text-secondary)",
//             fontSize: 13,
//         }),
//     };

//     const DropdownIndicator = (props) => (
//         <components.DropdownIndicator {...props}>
//             <span
//                 style={{
//                     fontSize: 14,
//                     color: "var(--text-secondary)",
//                     lineHeight: 1,
//                     userSelect: "none",
//                 }}
//             >
//                 ▾
//             </span>
//         </components.DropdownIndicator>
//     );

//     /* ===========================
//         BUY NUMBER
//     =========================== */

//     const buyNumber = async () => {
//         if (!country || !service) return;

//         try {
//             setLoading(true);

//             const res = await axios.post(
//                 `${API}/api/5sim/buy`,
//                 {
//                     country,
//                     service,
//                 },
//                 getAuthConfig()
//             );

//             setOrder(res.data.order);
//             setSmsMessages([]);
//         } catch (err) {
//             alert(
//                 err.response?.data?.message ||
//                 "Unable to buy number."
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     /* ===========================
//         REFRESH SMS
//     =========================== */

//     const refreshSMS = async () => {
//         if (!order) return;

//         try {
//             setRefreshing(true);

//             const res = await axios.get(
//                 `${API}/api/5sim/refresh/${order._id}`,
//                 getAuthConfig()
//             );

//             setOrder(res.data.order);
//             setSmsMessages(res.data.sms || []);
//         } catch (err) {
//             console.log(err.response?.data || err.message);
//         } finally {
//             setRefreshing(false);
//         }
//     };

//     /* ===========================
//         CANCEL NUMBER
//     =========================== */

//     const cancelNumber = async () => {
//         if (!order) return;

//         try {
//             await axios.post(
//                 `${API}/api/5sim/cancel/${order._id}`,
//                 {},
//                 getAuthConfig()
//             );

//             setOrder(null);
//             setSmsMessages([]);
//         } catch (err) {
//             alert(
//                 err.response?.data?.message ||
//                 "Unable to cancel number."
//             );
//         }
//     };

//     /* ===========================
//         HELPERS
//     =========================== */

//     const copyNumber = () => {
//         if (!order?.phone) return;

//         navigator.clipboard.writeText(order.phone);
//     };

//     return (
//         <div className="buy-number-page">

//             {/* ================= HEADER ================= */}

//             <div className="page-header">
//                 <h1>Buy Number</h1>

//                 <p>
//                     Get a temporary number to receive SMS verification codes.
//                 </p>
//             </div>

//             {/* ================= PURCHASE CARD ================= */}

//             <div className="buy-card">

//                 {/* ================= STEPS ================= */}

//                 <div className="steps-row">

//                     <div className={`step-item ${country ? "active" : ""}`}>
//                         <div className="step-circle">1</div>

//                         <div>
//                             <h4>Select Country</h4>
//                             <p>Choose Service Region</p>
//                         </div>
//                     </div>

//                     <div className="step-arrow">
//                         <FiChevronRight />
//                     </div>

//                     <div className={`step-item ${service ? "active" : ""}`}>
//                         <div className="step-circle">2</div>

//                         <div>
//                             <h4>Select Service</h4>
//                             <p>Choose the platform</p>
//                         </div>
//                     </div>

//                     <div className="step-arrow">
//                         <FiChevronRight />
//                     </div>

//                     <div className={`step-item ${order ? "active" : ""}`}>
//                         <div className="step-circle">3</div>

//                         <div>
//                             <h4>Get Number</h4>
//                             <p>Receive SMS instantly</p>
//                         </div>
//                     </div>

//                 </div>

//                 {/* ================= FORM ================= */}

//                 <div className="buy-form">

//                     {/* COUNTRY */}

//                     <div className="field">
//                         <label>Country</label>

//                         <Select
//                             styles={selectStyles}
//                             options={countryOptions}
//                             placeholder="Search Country"
//                             isSearchable
//                           menuPortalTarget={document.body}
//     menuPosition="fixed"
//                             components={{
//                                 DropdownIndicator,
//                                 IndicatorSeparator: () => null,
//                             }}
//                             value={
//                                 countryOptions.find(
//                                     (item) => item.value === country
//                                 ) || null
//                             }
//                             onChange={(option) => {
//                                 setCountry(option.value);
//                             }}
//                         />
//                     </div>

//                     {/* SERVICE */}

//                     <div className="field">
//                         <label>Service</label>

//                         <Select
//                             styles={selectStyles}
//                             options={serviceOptions}
//                             placeholder={
//                                 country
//                                     ? "Search Service"
//                                     : "Choose Country First"
//                             }
//                             isDisabled={!country}
//                             isSearchable
//                           menuPortalTarget={document.body}
//     menuPosition="fixed"
//                             components={{
//                                 DropdownIndicator,
//                                 IndicatorSeparator: () => null,
//                             }}
//                             value={
//                                 serviceOptions.find(
//                                     (item) => item.value === service
//                                 ) || null
//                             }
//                             onChange={(option) => {
//                                 setService(option.value);
//                             }}
//                         />
//                     </div>

//                 </div>

//                 {/* ================= ACTION ================= */}

//                 <div className="action-row">

//                     <button
//                         className="get-number-btn"
//                         onClick={buyNumber}
//                         disabled={
//                             loading ||
//                             !country ||
//                             !service
//                         }
//                     >
//                         {loading
//                             ? "Getting Number..."
//                             : "Get Number"}
//                     </button>

//                     <div className="price-box">

//                         <span>Estimated Price</span>

//                         <h3>
//                             {selectedService
//                                 ? `₦${selectedService.ngnPrice.toLocaleString()}`
//                                 : "₦0"}
//                         </h3>

//                     </div>

//                 </div>

//                 {/* ================= NOTICE ================= */}

//                 <div className="notice">

//                     <FiInfo />

//                     <span>
//                         Number will be reserved for approximately 20 minutes.
//                     </span>

//                 </div>

//             </div>

//             {/* ================= ASSIGNED NUMBER ================= */}
//             <div className="assigned-wrapper">

//                 <div className="assigned-top">

//                     <div className="assigned-title">
//                         <h3>Assigned Number</h3>

//                         <span className="status-badge">
//                             <span className="status-dot"></span>

//                             {order ? order.status || "Active" : "Inactive"}
//                         </span>
//                     </div>

//                     <button
//                         className="refresh-btn"
//                         onClick={refreshSMS}
//                         disabled={!order || refreshing}
//                     >
//                         <FiRefreshCw />

//                         {refreshing ? "Refreshing..." : "Refresh"}
//                     </button>

//                 </div>

//                 <div className="assigned-grid">

//                     {/* ================= NUMBER CARD ================= */}

//                     <div className="number-card">

//                         <div className="number-header">

//                             <h2>
//                                 {order?.phone || "No Number"}
//                             </h2>

//                             <button
//                                 type="button"
//                                 onClick={copyNumber}
//                                 disabled={!order}
//                                 title="Copy Number"
//                             >
//                                 <FiCopy />
//                             </button>

//                         </div>
//                         <p>
//                             Expires in{" "}
//                             <strong>
//                                 {order?.expires
//                                     ? new Date(order.expires).toLocaleTimeString()
//                                     : "--"}
//                             </strong>
//                         </p>

//                         <button
//                             className="cancel-btn"
//                             onClick={cancelNumber}
//                             disabled={!order}
//                         >
//                             <FiTrash2 />
//                             Cancel Number
//                         </button>

//                     </div>

//                     {/* ================= SMS CARD ================= */}

//                     <div className="sms-cards">

//                         <h3>SMS Inbox</h3>

//                         {smsMessages.length > 0 ? (

//                             smsMessages.map((sms, index) => (

//                                 <div
//                                     key={index}
//                                     className="sms-message"
//                                 >

//                                     <h4>Verification Code</h4>

//                                     {(sms.code || sms.otp) && (
//                                         <strong>
//                                             {sms.code || sms.otp}
//                                         </strong>
//                                     )}

//                                     <p>
//                                         {sms.message ||
//                                             sms.text ||
//                                             "SMS received"}
//                                     </p>

//                                 </div>

//                             ))

//                         ) : (

//                             <div className="sms-empty">
//                                 <h4>No messages yet</h4>

//                                 <p>
//                                     Waiting for SMS...
//                                 </p>

//                             </div>

//                         )}

//                     </div>

//                 </div>

//             </div>

//             {/* ================= HELP CARD ================= */}

//             <div className="help-card">

//                 <div>

//                     <h4>Need help?</h4>

//                     <p>
//                         Check our documentation or contact support
//                         if you're having trouble receiving SMS.
//                     </p>

//                 </div>

//                 <button
//                     className="docs-btn"
//                     onClick={() => window.open("/docs", "_blank")}
//                 >
//                     View Docs
//                 </button>

//             </div>

//         </div>
//     );
// };

// export default BuyNumber;

import { useEffect, useState } from "react";
import axios from "axios";
import Select, { components } from "react-select";

import {
    FiRefreshCw,
    FiCopy,
    FiTrash2,
    FiInfo,
    FiChevronRight,
} from "react-icons/fi";

import "../styles/buy-number.css";

const API = process.env.REACT_APP_API_URL;

const BuyNumber = () => {
    /* ===========================
        STATE
    =========================== */

    const [services, setServices] = useState([]);
    const [service, setService] = useState("");

    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("");
    const [estimatedPrice, setEstimatedPrice] = useState(0);

    const [order, setOrder] = useState(null);

    const [loading, setLoading] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    const [smsMessages, setSmsMessages] = useState([]);

    /* ===========================
        PAGE TITLE
    =========================== */

    useEffect(() => {
        document.title = "Buy Number - Numio";
    }, []);

    /* ===========================
        AUTH
    =========================== */

    const getAuthConfig = () => ({
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    /* ===========================
        FETCH COUNTRIES
    =========================== */

    useEffect(() => {
        const fetchCountries = async () => {
            try {
                const res = await axios.get(
                    `${API}/api/5sim/countries`,
                    getAuthConfig()
                );

                setCountries(res.data.countries || []);
            } catch (err) {
                console.log(err.response?.data || err.message);
            }
        };

        fetchCountries();
    }, []);

    /* ===========================
        FETCH SERVICES
    =========================== */

    useEffect(() => {
        if (!country) {
            // setServices([]);
            // setService("");

          setServices([]);
setService("");
setEstimatedPrice(0);
            return;
        }

        const fetchServices = async () => {
            try {
                const res = await axios.get(
                    `${API}/api/5sim/services?country=${country}`,
                    getAuthConfig()
                );

                // setServices(res.data.services || []);
                // setService("");

              setServices(res.data.services || []);
setEstimatedPrice(
    res.data.estimatedPrice?.ngn || 0
);
setService("");
              
            } catch (err) {
                console.log(err.response?.data || err.message);
                setServices([]);
            }
        };

        fetchServices();
    }, [country]);

    /* ===========================
        REACT-SELECT OPTIONS
    =========================== */

    const countryOptions = countries.map((item) => ({
        value: item.code,
        label: item.name.replace(/\b\w/g, (c) => c.toUpperCase()),
    }));

    const serviceOptions = services.map((item) => ({
        value: item.name,
        label: item.name
            .replace(/_/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase()),
        ngnPrice: item.ngnPrice,
    }));

    const selectedService =
        serviceOptions.find(
            (item) => item.value === service
        ) || null;

    /* ===========================
        REACT-SELECT STYLES
    =========================== */
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    const selectStyles = {
        control: (base, state) => ({
            ...base,
            minHeight: 46,
            height: 46,
            borderRadius: 10,
            borderColor: state.isFocused
                ? "var(--primary)"
                : "var(--border)",
            backgroundColor: "var(--card)",
            boxShadow: state.isFocused
                ? "0 0 0 3px rgba(124,58,237,.15)"
                : "none",
            cursor: "pointer",
            "&:hover": {
                borderColor: "var(--primary)",
            },
            paddingLeft: 4,
            paddingRight: 4,
        }),

        valueContainer: (base) => ({
            ...base,
            height: 46,
            padding: "0 14px",
        }),

        input: (base) => ({
            ...base,
            margin: 0,
            padding: 0,
            color: "var(--text)",
            fontSize: isMobile ? 16 : 13,
            fontWeight: 500,
        }),

        singleValue: (base) => ({
            ...base,
            color: "var(--text)",
            fontSize: isMobile ? 16 : 13,
            fontWeight: 500,
        }),

        placeholder: (base) => ({
            ...base,
            color: "var(--text-secondary)",
            fontSize: 13,
            fontWeight: 500,
        }),

        indicatorSeparator: () => ({
            display: "none",
        }),

        dropdownIndicator: (base) => ({
            ...base,
            color: "var(--text-secondary)",
            paddingRight: 12,

            "&:hover": {
                color: "var(--text-secondary)",
            },
        }),

        clearIndicator: (base) => ({
            ...base,
            color: "var(--text-secondary)",
        }),

        menuPortal: (base) => ({
    ...base,
    zIndex: 99999,
}),

menu: (base) => ({
    ...base,
    marginTop: 6,
    backgroundColor: "var(--card)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    overflow: "hidden",
    boxShadow: "0 10px 30px rgba(0,0,0,.35)",
}),

menuList: (base) => ({
    ...base,
    padding: 4,
    backgroundColor: "var(--card)",
}),

option: (base, state) => ({
    ...base,
    backgroundColor: state.isSelected
        ? "var(--primary)"
        : state.isFocused
        ? "rgba(124,58,237,.12)"
        : "var(--card)",

    color: state.isSelected
        ? "#fff"
        : "var(--text)",

    fontSize: isMobile ? 16 : 13,
    fontWeight: 500,
    borderRadius: 8,
    cursor: "pointer",
    padding: "10px 12px",

    ":active": {
        backgroundColor: "rgba(124,58,237,.18)",
    },
}),

        noOptionsMessage: (base) => ({
            ...base,
            color: "var(--text-secondary)",
            fontSize: 13,
        }),
    };

    const DropdownIndicator = (props) => (
        <components.DropdownIndicator {...props}>
            <span
                style={{
                    fontSize: 14,
                    color: "var(--text-secondary)",
                    lineHeight: 1,
                    userSelect: "none",
                }}
            >
                ▾
            </span>
        </components.DropdownIndicator>
    );

    /* ===========================
        BUY NUMBER
    =========================== */

    const buyNumber = async () => {
        if (!country || !service) return;

        try {
            setLoading(true);

            const res = await axios.post(
                `${API}/api/5sim/buy`,
                {
                    country,
                    service,
                },
                getAuthConfig()
            );

            setOrder(res.data.order);
            setSmsMessages([]);
        } catch (err) {
            alert(
                err.response?.data?.message ||
                "Unable to buy number."
            );
        } finally {
            setLoading(false);
        }
    };

    /* ===========================
        REFRESH SMS
    =========================== */

    const refreshSMS = async () => {
        if (!order) return;

        try {
            setRefreshing(true);

            const res = await axios.get(
                `${API}/api/5sim/refresh/${order._id}`,
                getAuthConfig()
            );

            setOrder(res.data.order);
            setSmsMessages(res.data.sms || []);
        } catch (err) {
            console.log(err.response?.data || err.message);
        } finally {
            setRefreshing(false);
        }
    };

    /* ===========================
        CANCEL NUMBER
    =========================== */

    const cancelNumber = async () => {
        if (!order) return;

        try {
            await axios.post(
                `${API}/api/5sim/cancel/${order._id}`,
                {},
                getAuthConfig()
            );

            setOrder(null);
            setSmsMessages([]);
        } catch (err) {
            alert(
                err.response?.data?.message ||
                "Unable to cancel number."
            );
        }
    };

    /* ===========================
        HELPERS
    =========================== */

    const copyNumber = () => {
        if (!order?.phone) return;

        navigator.clipboard.writeText(order.phone);
    };

    return (
        <div className="buy-number-page">

            {/* ================= HEADER ================= */}

            <div className="page-header">
                <h1>Buy Number</h1>

                <p>
                    Get a temporary number to receive SMS verification codes.
                </p>
            </div>

            {/* ================= PURCHASE CARD ================= */}

            <div className="buy-card">

                {/* ================= STEPS ================= */}

                <div className="steps-row">

                    <div className={`step-item ${country ? "active" : ""}`}>
                        <div className="step-circle">1</div>

                        <div>
                            <h4>Select Country</h4>
                            <p>Choose Service Region</p>
                        </div>
                    </div>

                    <div className="step-arrow">
                        <FiChevronRight />
                    </div>

                    <div className={`step-item ${service ? "active" : ""}`}>
                        <div className="step-circle">2</div>

                        <div>
                            <h4>Select Service</h4>
                            <p>Choose the platform</p>
                        </div>
                    </div>

                    <div className="step-arrow">
                        <FiChevronRight />
                    </div>

                    <div className={`step-item ${order ? "active" : ""}`}>
                        <div className="step-circle">3</div>

                        <div>
                            <h4>Get Number</h4>
                            <p>Receive SMS instantly</p>
                        </div>
                    </div>

                </div>

                {/* ================= FORM ================= */}

                <div className="buy-form">

                    {/* COUNTRY */}

                    <div className="field">
                        <label>Country</label>

                        <Select
                            styles={selectStyles}
                            options={countryOptions}
                            placeholder="Search Country"
                            isSearchable
                          menuPortalTarget={document.body}
    menuPosition="fixed"
                            components={{
                                DropdownIndicator,
                                IndicatorSeparator: () => null,
                            }}
                            value={
                                countryOptions.find(
                                    (item) => item.value === country
                                ) || null
                            }
                            onChange={(option) => {
                                setCountry(option.value);
                            }}
                        />
                    </div>

                    {/* SERVICE */}

                    <div className="field">
                        <label>Service</label>

                        <Select
                            styles={selectStyles}
                            options={serviceOptions}
                            placeholder={
                                country
                                    ? "Search Service"
                                    : "Choose Country First"
                            }
                            isDisabled={!country}
                            isSearchable
                          menuPortalTarget={document.body}
    menuPosition="fixed"
                            components={{
                                DropdownIndicator,
                                IndicatorSeparator: () => null,
                            }}
                            value={
                                serviceOptions.find(
                                    (item) => item.value === service
                                ) || null
                            }
                            onChange={(option) => {
                                setService(option.value);
                            }}
                        />
                    </div>

                </div>

                {/* ================= ACTION ================= */}

                <div className="action-row">

                    <button
                        className="get-number-btn"
                        onClick={buyNumber}
                        disabled={
                            loading ||
                            !country ||
                            !service
                        }
                    >
                        {loading
                            ? "Getting Number..."
                            : "Get Number"}
                    </button>

                    <div className="price-box">

                        <span>Estimated Price</span>

                        {/* <h3>
                            {selectedService
                                ? `₦${selectedService.ngnPrice.toLocaleString()}`
                                : "₦0"}
                        </h3> */}

                      <h3>
    ₦{estimatedPrice.toLocaleString()}
</h3>

                    </div>

                </div>

                {/* ================= NOTICE ================= */}

                <div className="notice">

                    <FiInfo />

                    <span>
                        Number will be reserved for approximately 20 minutes.
                    </span>

                </div>

            </div>

            {/* ================= ASSIGNED NUMBER ================= */}
            <div className="assigned-wrapper">

                <div className="assigned-top">

                    <div className="assigned-title">
                        <h3>Assigned Number</h3>

                        <span className="status-badge">
                            <span className="status-dot"></span>

                            {order ? order.status || "Active" : "Inactive"}
                        </span>
                    </div>

                    <button
                        className="refresh-btn"
                        onClick={refreshSMS}
                        disabled={!order || refreshing}
                    >
                        <FiRefreshCw />

                        {refreshing ? "Refreshing..." : "Refresh"}
                    </button>

                </div>

                <div className="assigned-grid">

                    {/* ================= NUMBER CARD ================= */}

                    <div className="number-card">

                        <div className="number-header">

                            <h2>
                                {order?.phone || "No Number"}
                            </h2>

                            <button
                                type="button"
                                onClick={copyNumber}
                                disabled={!order}
                                title="Copy Number"
                            >
                                <FiCopy />
                            </button>

                        </div>
                        <p>
                            Expires in{" "}
                            <strong>
                                {order?.expires
                                    ? new Date(order.expires).toLocaleTimeString()
                                    : "--"}
                            </strong>
                        </p>

                        <button
                            className="cancel-btn"
                            onClick={cancelNumber}
                            disabled={!order}
                        >
                            <FiTrash2 />
                            Cancel Number
                        </button>

                    </div>

                    {/* ================= SMS CARD ================= */}

                    <div className="sms-cards">

                        <h3>SMS Inbox</h3>

                        {smsMessages.length > 0 ? (

                            smsMessages.map((sms, index) => (

                                <div
                                    key={index}
                                    className="sms-message"
                                >

                                    <h4>Verification Code</h4>

                                    {(sms.code || sms.otp) && (
                                        <strong>
                                            {sms.code || sms.otp}
                                        </strong>
                                    )}

                                    <p>
                                        {sms.message ||
                                            sms.text ||
                                            "SMS received"}
                                    </p>

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

            {/* ================= HELP CARD ================= */}

            <div className="help-card">

                <div>

                    <h4>Need help?</h4>

                    <p>
                        Check our documentation or contact support
                        if you're having trouble receiving SMS.
                    </p>

                </div>

                <button
                    className="docs-btn"
                    onClick={() => window.open("/docs", "_blank")}
                >
                    View Docs
                </button>

            </div>

        </div>
    );
};

export default BuyNumber;

