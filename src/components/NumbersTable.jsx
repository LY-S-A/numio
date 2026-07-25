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
    [...Array(6)].map((_, i) => (
        <div className="activity-row" key={i}>
            <div className="activity-left">

                <div className="activity-icon skeleton">
                    <div className="skeleton skeleton-circle" />
                </div>

                <div className="activity-content">
                   <p className="activity-text">
    <span className="skeleton activity-text-skeleton"></span>
</p>
                </div>

            </div>

            <div className="activity-right">
                <span className="skeleton activity-status-skeleton" />
                <small className="skeleton activity-time-skeleton" />
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
