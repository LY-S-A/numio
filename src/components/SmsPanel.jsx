import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FiCopy, FiCheck } from "react-icons/fi";

import "../styles/components.css";

const API = process.env.REACT_APP_API_URL;

const SmsPanel = () => {
    const [messages, setMessages] = useState([]);
    const [copiedCode, setCopiedCode] = useState(null);
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();

    const copyCode = async (code) => {
        if (!code) return;

        await navigator.clipboard.writeText(code);

        setCopiedCode(code);

        setTimeout(() => {
            setCopiedCode(null);
        }, 2000);
    };

    const timeAgo = (date) => {
        if (!date) return "";

        const diff = Math.floor(
            (Date.now() - new Date(date).getTime()) / 1000
        );

        if (diff < 60) return `${diff}s ago`;

        const mins = Math.floor(diff / 60);
        if (mins < 60) return `${mins}m ago`;

        const hrs = Math.floor(mins / 60);
        if (hrs < 24) return `${hrs}h ago`;

        const days = Math.floor(hrs / 24);
        return `${days}d ago`;
    };

    const loadMessages = async () => {
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

            setMessages((data.messages || []).slice(0, 4));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadMessages();
    }, []);

    return (
        <div className="card sms-card">
            <div className="card-header">
                <h3>Recent SMS</h3>
                <button
                    className="card-btn"
                    onClick={() => navigate("/inbox")}
                >
                    View All
                </button>
            </div>

            <div className="sms-card-content">
                {loading ? (
                    <>
                        {Array.from({ length: 4 }).map((_, index) => (
                            <div
                                key={index}
                                className="sms-item sms-panel-skeleton"
                            >
                                <div className="sms-content">
                                    <div className="skeleton sms-panel-number" />

                                    <div className="sms-message">
                                        <div className="skeleton sms-panel-msg" />

                                        <span className="code-group">
                                            <div className="skeleton sms-panel-code" />
                                            <div className="skeleton sms-panel-copy" />
                                        </span>
                                    </div>
                                </div>

                                <small className="skeleton sms-panel-time"></small>
                            </div>
                        ))}
                    </>
                ) : messages.length === 0 ? (
                    <div className="sms-panel-empty">
                        <div className="sms-panel-empty-icon">📭</div>

                        <h4>No SMS yet</h4>

                        <p>
                            Your verification codes will appear here
                            after you receive an SMS.
                        </p>

                        <button
                            className="sms-panel-empty-btn"
                            onClick={() => navigate("/buy-number")}
                        >
                            Buy Number
                        </button>
                    </div>
                ) : (
                    messages.map((msg, index) => (
                        <div className="sms-item" key={msg.id || index}>
                            <div>
                                <strong>{msg.number}</strong>

                                <p className="sms-message">
                                    <span className="sms-msg">
                                        Your {msg.app} code is
                                    </span>

                                    <span className="code-group">
                                        <span className="code">
                                            {msg.code}
                                        </span>

                                        <button
                                            type="button"
                                            className="copy-btn"
                                            onClick={() => copyCode(msg.code)}
                                            title={
                                                copiedCode === msg.code
                                                    ? "Copied!"
                                                    : "Copy OTP"
                                            }
                                        >
                                            {copiedCode === msg.code ? (
                                                <FiCheck />
                                            ) : (
                                                <FiCopy />
                                            )}
                                        </button>
                                    </span>
                                </p>
                            </div>

                            <small>{timeAgo(msg.time)}</small>
                        </div>
                    ))
                )}
            </div>

            <div className="refresh-row">
                <span>Auto Refresh</span>

                <label className="switch">
                    <input type="checkbox" defaultChecked />
                    <span className="slider"></span>
                </label>
            </div>
        </div>
    );
};

export default SmsPanel;
