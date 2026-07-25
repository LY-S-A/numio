// import "../styles/components.css";

// const activities = [
//   {
//     service: "WhatsApp",
//     number: "+1 (551) 123-4567",
//     country: "United States",
//     status: "Active",
//     time: "2 min ago",
//   },
//   {
//     service: "Telegram",
//     number: "+44 7700 900123",
//     country: "United Kingdom",
//     status: "Active",
//     time: "5 min ago",
//   },
//   {
//     service: "Google",
//     number: "+234 901 234 5678",
//     country: "Nigeria",
//     status: "Expiring Soon",
//     time: "15 min ago",
//   },
//   {
//     service: "Deposit",
//     number: "₦5,000 Added",
//     country: "Transaction",
//     status: "Success",
//     time: "30 min ago",
//   },
//   {
//     service: "Facebook",
//     number: " +1 (415) 987-6543",
//     country: "United States",
//     status: "Active",
//     time: "1 hour ago",
//   },
//   {
//     service: "Signal",
//     number: "+44 9751 9005987",
//     country: "United Kingdom",
//     status: "Expired",
//     time: "2 hour ago",
//   },
// ];

// const RecentActivity = () => {
//   const getStatusClass = (status) => {
//     switch (status) {
//       case "Active":
//         return "success";
//       case "Expiring Soon":
//         return "warning";
//       case "Success":
//         return "info";
//       default:
//         return "danger";
//     }
//   };

//   return (
//     <div className="card">
//       <div className="card-header">
//         <h3>Recent Activity</h3>
//         <button>See All</button>
//       </div>

//       <div className="activity-list">
//         {activities.map((item, index) => (
//           <div className="activity-item" key={index}>
//             <div className="activity-info">
//               <h4>{item.service}</h4>
//               <p>{item.number}</p>
//             </div>

//             <div className="activity-country">
//               {item.country}
//             </div>

//             <div className="activity-status">
//               <span className={`status ${getStatusClass(item.status)}`}>
//                 {item.status}
//               </span>
//             </div>

//             <div className="activity-time">
//               {item.time}
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RecentActivity;

import { useEffect, useState } from "react";
import axios from "axios";
import {
    FiMessageSquare,
    FiShield,
} from "react-icons/fi";
import { FaWallet } from "react-icons/fa";

import "../styles/components.css";

const API = process.env.REACT_APP_API_URL;

const maskEmail = (email) => {
    if (!email || !email.includes("@")) return "*****";

    const [name, domain] = email.split("@");

    if (name.length <= 2) {
        return `${name[0]}***@${domain}`;
    }

    return `${name.slice(0, 2)}${"*".repeat(
        Math.max(2, name.length - 3)
    )}${name.slice(-1)}@${domain}`;
};

const RecentActivity = () => {
    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);

    const timeAgo = (date) => {
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

    const loadActivities = async () => {
        try {
            const token = localStorage.getItem("token");

            const { data } = await axios.get(
                `${API}/api/activity/live`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            setActivities((data || []).slice(0, 6));
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        loadActivities();

        const interval = setInterval(loadActivities, 60000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="card">
            <div className="card-header">
                <h3>Recent Activity</h3>

                <button className="card-btn">
                    See All
                </button>
            </div>

            <div className="activity-list">
                {loading ? (
                    [...Array(4)].map((_, i) => (
                        <div className="activity-row" key={i}>
                            <div className="activity-left">
                                <div className="activity-icon skeleton-circle" />

                                <div className="activity-content">
                                    <div className="skeleton activity-main" />
                                    <div className="skeleton activity-sub" />
                                </div>
                            </div>

                            <div className="activity-right">
                                <div className="skeleton skeleton-pill" />
                                <div className="skeleton time" />
                            </div>
                        </div>
                    ))
                ) : (
                    activities.map((activity, index) => (
                        <div
                            key={activity._id || index}
                            className="activity-row"
                        >
                            <div className="activity-left">
                                <div
                                    className={`activity-icon ${
                                        activity.type === "wallet"
                                            ? "wallet-icon"
                                            : activity.type === "sms"
                                            ? "sms-icon"
                                            : "vpn-icon"
                                    }`}
                                >
                                    {activity.type === "wallet" && (
                                        <FaWallet />
                                    )}

                                    {activity.type === "sms" && (
                                        <FiMessageSquare />
                                    )}

                                    {activity.type === "vpn" && (
                                        <FiShield />
                                    )}
                                </div>

                                <div className="activity-content">
                                    <p className="activity-text">
                                        <span className="activity-email-inline">
                                            {maskEmail(activity.email)}
                                        </span>{" "}
                                        {activity.action}
                                    </p>
                                </div>
                            </div>

                            <div className="activity-right">
                                <span
                                    className={
                                        activity.success
                                            ? "activity-status success"
                                            : "activity-status failed"
                                    }
                                >
                                    {activity.status}
                                </span>

                                <small className="activity-time">
                                    {timeAgo(activity.createdAt)}
                                </small>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default RecentActivity;
