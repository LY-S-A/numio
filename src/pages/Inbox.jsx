import { useState, useEffect, useMemo } from "react";
import axios from "axios";
import {
    FiSearch,
    FiCopy,
    FiRefreshCw,
    FiChevronRight,
} from "react-icons/fi";

import "../styles/inbox.css";

const API = process.env.REACT_APP_API_URL;

const Inbox = () => {
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(true);

    const [search, setSearch] = useState("");
    const [dateFilter, setDateFilter] = useState("all");
    const [appFilter, setAppFilter] = useState("All Apps");

    const copyCode = (code) => {
        navigator.clipboard.writeText(code);
    };

    const loadInbox = async () => {
        try {
            setLoading(true);

            const token = localStorage.getItem("token");

            const { data } = await axios.get(
                `${API}/api/5sim/inbox`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setMessages(data.messages || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadInbox();
    }, []);

    const apps = useMemo(() => {
        return [
            "All Apps",
            ...new Set(messages.map((m) => m.app)),
        ];
    }, [messages]);

    const timeAgo = (date) => {
        if (!date) return "";

        const seconds = Math.floor(
            (Date.now() - new Date(date).getTime()) / 1000
        );

        if (seconds < 60) return `${seconds}s ago`;

        if (seconds < 3600)
            return `${Math.floor(seconds / 60)} min ago`;

        if (seconds < 86400)
            return `${Math.floor(seconds / 3600)} hr ago`;

        return `${Math.floor(seconds / 86400)} day(s) ago`;
    };

    const filteredMessages = useMemo(() => {
        let data = [...messages];

        if (search.trim()) {
            const keyword = search.toLowerCase();

            data = data.filter(
                (msg) =>
                    msg.number
                        ?.toLowerCase()
                        .includes(keyword) ||
                    msg.app
                        ?.toLowerCase()
                        .includes(keyword) ||
                    msg.message
                        ?.toLowerCase()
                        .includes(keyword)
            );
        }

        if (appFilter !== "All Apps") {
            data = data.filter(
                (msg) => msg.app === appFilter
            );
        }

        if (dateFilter === "7") {
            data = data.filter(
                (msg) =>
                    Date.now() -
                        new Date(msg.time).getTime() <=
                    7 * 24 * 60 * 60 * 1000
            );
        }

        if (dateFilter === "30") {
            data = data.filter(
                (msg) =>
                    Date.now() -
                        new Date(msg.time).getTime() <=
                    30 * 24 * 60 * 60 * 1000
            );
        }

        return data;
    }, [messages, search, appFilter, dateFilter]);

    const formatApp = (app = "") =>
    app
        .replace(/[_-]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());

    return (
        <div className="sms-history-page">
            {/* HEADER */}
            <div className="sms-history-header">
                <div>
                    <h1>SMS History</h1>
                    <p>View and manage all received SMS messages</p>
                </div>
            </div>

            {/* FILTERS */}
            <div className="sms-toolbar">
                <div className="search-box">
                    <FiSearch />

                    <input
                        type="text"
                        placeholder="Search by number or app..."
                        value={search}
                        onChange={(e) =>
                            setSearch(e.target.value)
                        }
                    />
                </div>

                <div className="select-wrapper">
                    <select
                        value={dateFilter}
                        onChange={(e) =>
                            setDateFilter(e.target.value)
                        }
                    >
                        <option value="all">All Time</option>
                        <option value="7">Last 7 Days</option>
                        <option value="30">Last 30 Days</option>
                    </select>
                </div>

                <div className="select-wrapper">
                    <select
                        value={appFilter}
                        onChange={(e) =>
                            setAppFilter(e.target.value)
                        }
                    >
                        {apps.map((app) => (
                            <option
                                key={app}
                                value={app}
                                className="app-select"
                            >
                                {app}
                            </option>
                        ))}
                    </select>
                </div>

                <button
                    className="btn-primary"
                    onClick={loadInbox}
                >
                    <FiRefreshCw />
                    <span>Refresh</span>
                </button>
            </div>

            {loading && (
    <div className="sms-table">
        {Array.from({ length: 8 }).map((_, index) => (
            <div
                key={index}
                className="sms-row skeleton-row"
            >
                {/* USER */}
                <div className="sms-user">
                    <div className="app-icon skeleton" />

                    <div className="sms-user-details">
                        <div className="skeleton sms-number-skeleton" />
                        <div className="skeleton sms-app-skeleton" />
                    </div>
                </div>

                {/* MESSAGE */}
                <div className="sms-message">
                    <div className="skeleton sms-line" />
                    <div className="skeleton sms-line w90" />
                    <div className="skeleton sms-line w60" />
                </div>

                {/* OTP */}
                <div className="sms-code">
                    <div className="skeleton otp-skeleton" />

                    <div className="skeleton copy-skeleton" />

                    <div className="sms-meta mobile-meta">
                        <div className="skeleton time-skeleton" />
                    </div>
                </div>

                {/* STATUS */}
                <div className="sms-meta desktop-meta">
                    <div className="skeleton status-skeleton" />
                    <div className="skeleton time-skeleton" />
                </div>
            </div>
        ))}
    </div>
)}
           
            {!loading &&
                filteredMessages.length === 0 && (
                    <div className="empty-history">
                        <h3>No SMS History</h3>
                        <p>
                            Finished orders with received OTPs
                            will appear here.
                        </p>
                    </div>
                )}

            {!loading &&
                filteredMessages.length > 0 && (
                    <div className="sms-table">
                        {filteredMessages.map(
                            (msg, index) => (
                                <div
                                    key={msg.id || index}
                                    className="sms-row"
                                >
                                    {/* LEFT */}
                                    <div className="sms-user">
                                        <div className="app-icon">
                                            {msg.app
                                                ?.charAt(0)
                                                .toUpperCase()}
                                        </div>

                                        <div>
                                            <h4>
                                                {msg.number}
                                            </h4>

                                            <span className="app-tag">
    {formatApp(msg.app)}
</span>
                                        </div>
                                    </div>

                                    {/* MESSAGE */}
                                    <div className="sms-message">
                                        {msg.message}
                                    </div>

                                    {/* OTP */}
                                    <div className="sms-code">
                                        <span>
                                            {msg.code}
                                        </span>

                                        <button
                                            onClick={() =>
                                                copyCode(
                                                    msg.code
                                                )
                                            }
                                        >
                                            <FiCopy />
                                        </button>

                                        <div className="sms-meta mobile-meta">
                                            <span>
                                                {timeAgo(
                                                    msg.time
                                                )}
                                            </span>
                                        </div>
                                    </div>
                                    
                                    {/* STATUS */}
                                    <div className="sms-meta desktop-meta">
                                       
                                        <div className="status read">
                                            Read
                                        </div>

                                         <span>
                                            {timeAgo(msg.time)}
                                        </span>
                                    </div>
                                </div>
                            )
                        )}
                    </div>
                )}

            {/* FOOTER */}
            <div className="sms-footer">
                <div className="pagination">
                    <button className="active">
                        1
                    </button>

                    <button className="next-btn">
                        <FiChevronRight />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Inbox;
