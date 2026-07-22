import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import Select, { components } from "react-select";
import { useBalance } from "../context/BalanceContext";

import {
    FiRefreshCw,
    FiCopy,
    FiTrash2,
    FiInfo,
    FiChevronRight,
    FiCheckCircle,
} from "react-icons/fi";

import "../styles/buy-number.css";

const API = process.env.REACT_APP_API_URL;

const BuyNumber = () => {

    const { setBalance } = useBalance();

    /* ===========================
        STATE
    =========================== */

    const [services, setServices] = useState([]);
    const [service, setService] = useState("");

    const [countries, setCountries] = useState([]);
    const [country, setCountry] = useState("");
    const [estimatedPrice, setEstimatedPrice] = useState(null);

    const [timeLeft, setTimeLeft] = useState("--");
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

  useEffect(() => {
    if (!order?.expires || smsMessages.length > 0) {
        setTimeLeft("--");
        return;
    }

    const calculateTime = () => {
        const now = new Date().getTime();
        const expiry = new Date(order.expires).getTime();

        const difference = expiry - now;

        if (difference <= 0) {
            setTimeLeft("Expired");
            return;
        }

        const minutes = Math.floor(
            (difference % (1000 * 60 * 60)) / (1000 * 60)
        );

        const seconds = Math.floor(
            (difference % (1000 * 60)) / 1000
        );

        setTimeLeft(
            `${minutes}m ${seconds < 10 ? "0" : ""}${seconds}s`
        );
    };

    calculateTime();

    const timer = setInterval(calculateTime, 1000);

    return () => clearInterval(timer);

}, [order, smsMessages]);

    /* ===========================
        AUTH
    =========================== */

    const getAuthConfig = () => ({
        headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
    });

    /* ===========================
      LOAD ACTIVE ORDER
  =========================== */

    const loadActiveOrder = useCallback(async () => {
        try {
            const res = await axios.get(
                `${API}/api/5sim/active`,
                getAuthConfig()
            );

            if (res.data.order) {
                setOrder(res.data.order);
                setSmsMessages(res.data.sms || []);
            } else {
                setOrder(null);
                setSmsMessages([]);
            }
        } catch (err) {
            console.log(err.response?.data || err.message);
        }
    }, []);

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
        LOAD ACTIVE ORDER
    =========================== */

    useEffect(() => {
        loadActiveOrder();
    }, [loadActiveOrder]);

    /* ===========================
        FETCH SERVICES
    =========================== */

    useEffect(() => {
        if (!country) {
            setServices([]);
            setService("");
            setEstimatedPrice(null);
            return;
        }

        const fetchServices = async () => {
            try {
                const res = await axios.get(
                    `${API}/api/5sim/services?country=${country}`,
                    getAuthConfig()
                );

                setServices(res.data.services || []);
                setService("");
                setEstimatedPrice(null);

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

            // Update wallet instantly
            if (typeof res.data.wallet !== "undefined") {
                setBalance(res.data.wallet);
            }

            // Load latest active order from backend
            await loadActiveOrder();

        } catch (err) {
            alert(
                err.response?.data?.message ||
                "Unable to buy number."
            );
        } finally {
            setLoading(false);
        }
    };


    //   /* ===========================
    //     REFRESH SMS
    // =========================== */

    const refreshSMS = async () => {
        if (!order) return;

        try {
            setRefreshing(true);

            await axios.get(
                `${API}/api/5sim/refresh/${order._id}`,
                getAuthConfig()
            );

            // Reload latest order & SMS
            await loadActiveOrder();

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

        const confirmed = window.confirm(
            "Are you sure you want to cancel this number?"
        );

        if (!confirmed) return;

        try {
            const res = await axios.post(
                `${API}/api/5sim/cancel/${order._id}`,
                {},
                getAuthConfig()
            );

            // Update wallet if refunded
            if (typeof res.data.wallet !== "undefined") {
                setBalance(res.data.wallet);
            }

            // Reload order state from backend
            await loadActiveOrder();

        } catch (err) {
            alert(
                err.response?.data?.message ||
                "Unable to cancel number."
            );
        }
    };

   /* ===========================
      FINISH ORDER
  =========================== */

  const finishOrder = async () => {
    if (!order) return;

    try {
        const res = await axios.post(
            `${API}/api/5sim/finish/${order._id}`,
            {},
            getAuthConfig()
        );

        if (typeof res.data.wallet !== "undefined") {
            setBalance(res.data.wallet);
        }

        // Remove active order from UI
        setOrder(null);
        setSmsMessages([]);
        setTimeLeft("--");

        // Reload active order (should return null)
        await loadActiveOrder();

    } catch (err) {
        alert(
            err.response?.data?.message ||
            "Unable to finish order."
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

    const copyOTP = (otp) => {
    if (!otp) return;

    navigator.clipboard.writeText(otp);
};

    /* ===========================
      AUTO REFRESH ACTIVE ORDER
  =========================== */

    useEffect(() => {
        if (!order) return;

        const interval = setInterval(() => {
            loadActiveOrder();
        }, 10000);

        return () => clearInterval(interval);
    }, [order, loadActiveOrder]);

  const hasSms = smsMessages.length > 0;
  
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
                                setEstimatedPrice(option.ngnPrice);
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

                        <h3>
                            {estimatedPrice !== null
                                ? `₦${estimatedPrice.toLocaleString()}`
                                : "--"}
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
                    <p className="number-status">
    {hasSms ? (
        <span className="sms-received">
            SMS Received <span className="sms-check">✓</span>
        </span>
    ) : (
        <>
            Expires in <strong>{timeLeft}</strong>
        </>
    )}
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
        <>
            {smsMessages.map((sms, index) => (
                <div
                    key={index}
                    className="sms-message"
                >
                    <h4>Verification Code</h4>

                    {(sms.code || sms.otp) && (
    <div className="otp-row">
        <strong>
            {sms.code || sms.otp}
        </strong>

        <button
            type="button"
            className="copy-otp-btn"
            onClick={() => copyOTP(sms.code || sms.otp)}
            title="Copy OTP"
        >
            <FiCopy />
        </button>
    </div>
)}

                    <p>
                        {sms.message ||
                            sms.text ||
                            "SMS received"}
                    </p>
                </div>
            ))}

            <button
                className="finish-btn"
                onClick={finishOrder}
            >
                <FiCheckCircle />
    Complete Order
            </button>
        </>
    ) : (
        <div className="sms-empty">
            <h4>No messages yet</h4>
            <p>Waiting for SMS...</p>
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

