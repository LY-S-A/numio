// import "../styles/components.css";

// const messages = [
//   {
//     number: "+1 (551) 123-4567",
//     code: "612-540",
//     app: "WhatsApp",
//     time: "2 min ago",
//   },
//   {
//     number: "+44 7700 900123",
//     code: "87321",
//     app: "Telegram",
//     time: "5 min ago",
//   },
//   {
//     number: "+234 901 234 5678",
//     code: "G-123456",
//     app: "Google",
//     time: "15 min ago",
//   },
//   {
//     number: "+1 (415) 987-6543",
//     code: "342573",
//     app: "Facebook",
//     time: "1 hour ago",
//   },
// ];

// const SmsPanel = () => {
//   return (
//     <div className="card sms-card">
//       <div className="card-header">
//         <h3>Recent SMS</h3>
//         <button className="card-btn">View All</button>
//       </div>

//       {messages.map((msg, index) => (
//         <div className="sms-item" key={index}>
//           <div className="sms-content">
//             <h4>{msg.number}</h4>

//             <p className="sms-message">
//               <span className="sms-msg">Your {msg.app} code is</span>
//               <span className="code">{msg.code}</span>
//             </p>
//           </div>

//           <small>{msg.time}</small>
//         </div>
//       ))}

//       <div className="refresh-row">
//         <span>Auto Refresh</span>

//         <label className="switch">
//           <input type="checkbox" defaultChecked />
//           <span className="slider"></span>
//         </label>
//       </div>
//     </div>
//   );
// };

// export default SmsPanel;

import { useEffect, useState } from "react";
import axios from "axios";

import "../styles/components.css";

const API = process.env.REACT_APP_API_URL;

const SmsPanel = () => {
    const [messages, setMessages] = useState([]);

    const timeAgo = (date) => {
        if (!date) return "";

        const seconds = Math.floor(
            (Date.now() - new Date(date).getTime()) / 1000
        );

        if (seconds < 60)
            return `${seconds} second${seconds === 1 ? "" : "s"} ago`;

        const minutes = Math.floor(seconds / 60);

        if (minutes < 60)
            return `${minutes} minute${minutes === 1 ? "" : "s"} ago`;

        const hours = Math.floor(minutes / 60);

        if (hours < 24)
            return `${hours} hour${hours === 1 ? "" : "s"} ago`;

        const days = Math.floor(hours / 24);

        if (days < 30)
            return `${days} day${days === 1 ? "" : "s"} ago`;

        const months = Math.floor(days / 30);

        if (months < 12)
            return `${months} month${months === 1 ? "" : "s"} ago`;

        const years = Math.floor(months / 12);

        return `${years} year${years === 1 ? "" : "s"} ago`;
    };

    const loadMessages = async () => {
        try {
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
        }
    };

    useEffect(() => {
        loadMessages();
    }, []);

    return (
        <div className="sms-panel">
            <div className="panel-header">
                <h3>Recent SMS</h3>
                <a href="/inbox">View All</a>
            </div>

            {messages.map((msg, index) => (
                <div className="sms-item" key={msg.id || index}>
                    <div className="sms-content">
                        <h4>{msg.number}</h4>

                        <p className="sms-message">
                            <span className="sms-msg">
                                Your {msg.app} code is
                            </span>

                            <span className="code">
                                {msg.code}
                            </span>
                        </p>
                    </div>

                    <small>{timeAgo(msg.time)}</small>
                </div>
            ))}

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
