import {
    FiSearch,
    FiCopy,
    FiRefreshCw,
    FiChevronRight,
} from "react-icons/fi";

import "../styles/inbox.css";

const messages = [
    {
        number: "+1 (551) 123-4567",
        code: "612-540",
        app: "WhatsApp",
        time: "2 min ago",
        status: "New",
        message:
            "Your WhatsApp code is 612-540. Don't share this code with anyone.",
    },
    {
        number: "+44 7700 900123",
        code: "87321",
        app: "Telegram",
        time: "5 min ago",
        status: "New",
        message:
            "Your Telegram login code is 87321. This code will expire in 10 minutes.",
    },
    {
        number: "+234 901 234 5678",
        code: "G-123456",
        app: "Google",
        time: "15 min ago",
        status: "Read",
        message:
            "G-123456 is your Google verification code. Use this code to verify your account.",
    },
    {
        number: "+1 (415) 987-6543",
        code: "342573",
        app: "Facebook",
        time: "1 hour ago",
        status: "Read",
        message:
            "342573 is your Facebook confirmation code. Enter this code to continue.",
    },
];

const Inbox = () => {
    const copyCode = (code) => {
        navigator.clipboard.writeText(code);
    };

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
                    />
                </div>

                <div className="select-wrapper">
                    <select>
                        <option>May 20 - May 27, 2025</option>
                        <option>Last 7 Days</option>
                        <option>Last 30 Days</option>
                    </select>
                </div>

                <div className="select-wrapper">
                    <select>
                        <option>All Apps</option>
                        <option>WhatsApp</option>
                        <option>Telegram</option>
                        <option>Google</option>
                        <option>Facebook</option>
                    </select>
                </div>

                <button className="btn-primary">
                    <FiRefreshCw />
                    <span>Refresh</span>
                </button>
            </div>

            {/* SMS LIST */}
            <div className="sms-table">
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`sms-row ${msg.status === "New" ? "new" : ""
                            }`}
                    >
                        {/* LEFT */}
                        <div className="sms-user">
                            <div className="app-icon">
                                {msg.app.charAt(0)}
                            </div>

                            <div>
                                <h4>{msg.number}</h4>

                                <span className="app-tag">
                                    {msg.app}
                                </span>
                            </div>
                        </div>

                        {/* MESSAGE */}
                        <div className="sms-message">
                            {msg.message}
                        </div>

                        {/* OTP */}
                        <div className="sms-code">
                            <span>{msg.code}</span>

                            <button
                                onClick={() =>
                                    copyCode(msg.code)
                                }
                            >
                                <FiCopy />
                            </button>

                            <div className="sms-meta mobile-meta">
                                <span>{msg.time}</span>
                            </div>
                        </div>

                        {/* STATUS */}
                        <div className="sms-meta desktop-meta">
                            <span>{msg.time}</span>

                            <div
                                className={`status ${msg.status.toLowerCase()}`}
                            >
                                {msg.status}
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* FOOTER */}
            <div className="sms-footer">
                <div className="pagination">
                    <button className="active">
                        1
                    </button>

                    <button>2</button>

                    <button>3</button>

                    <button className="next-btn">
                        <FiChevronRight />
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Inbox;