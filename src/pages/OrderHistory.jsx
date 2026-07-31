import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
    FiSearch,
    FiChevronRight,
    FiChevronLeft,
    FiActivity,
} from "react-icons/fi";

import "../styles/transactions.css";
import unknownLogo from "../assets/question-mark.png";

const API_URL = process.env.REACT_APP_API_URL;
const ITEMS_PER_PAGE = 10;

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] =
    useState("All Orders");
    const [dateFilter, setDateFilter] =
        useState("Last 30 Days");

    const [currentPage, setCurrentPage] =
        useState(1);

    useEffect(() => {
       document.title = "Order History - Numio";
       fetchOrders();
    }, []);

 const fetchOrders = async () => {
    try {
        setLoading(true);

        const token = localStorage.getItem("token");

        const { data } = await axios.get(
            `${API_URL}/api/5sim/history`, // <-- Replace with your actual Order History endpoint
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        setOrders(data.orders || []);
    } catch (err) {
        console.error(err);
    } finally {
        setLoading(false);
    }
};

const filteredOrders = useMemo(() => {
    return orders.filter((item) => {
        const matchesSearch =
            item.phone
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase()) ||
            item.reference
                ?.toLowerCase()
                .includes(searchTerm.toLowerCase());

        const matchesStatus =
            statusFilter === "All Orders"
                ? true
                : item.status?.toLowerCase() ===
                  statusFilter.toLowerCase();

        const createdAt = new Date(item.createdAt);
        const now = new Date();

        let matchesDate = true;

        switch (dateFilter) {
            case "Today":
                matchesDate =
                    createdAt.toDateString() ===
                    now.toDateString();
                break;

            case "Last 7 Days":
                matchesDate =
                    now - createdAt <=
                    7 * 24 * 60 * 60 * 1000;
                break;

            case "Last 30 Days":
                matchesDate =
                    now - createdAt <=
                    30 * 24 * 60 * 60 * 1000;
                break;

            case "Last 90 Days":
                matchesDate =
                    now - createdAt <=
                    90 * 24 * 60 * 60 * 1000;
                break;

            case "This Year":
                matchesDate =
                    createdAt.getFullYear() ===
                    now.getFullYear();
                break;

            default:
                matchesDate = true;
        }

        return (
            matchesSearch &&
            matchesStatus &&
            matchesDate
        );
    });
}, [
    orders,
    searchTerm,
    statusFilter,
    dateFilter,
]);

const totalPages = Math.ceil(
    filteredOrders.length / ITEMS_PER_PAGE
);

const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
);
    
    const formatDate = (date) => {
        return new Date(date).toLocaleDateString(
            "en-NG",
            {
                day: "2-digit",
                month: "short",
                year: "numeric",
            }
        );
    };

    const formatRelativeTime = (date) => {
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

    const formatService = (service = "") =>
    service
        .replace(/[_-]/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase());
    
    return (
        <div className="tx-page">

            {/* HEADER */}
            <div className="tx-header">

                <div>
                    <h1>Order History</h1>

                    <p>
                        View all purchased virtual numbers, completed orders and SMS activity
                    </p>
                </div>

            </div>

            {/* STATS */}
            <div className="tx-stats">

                <div className="tx-stat-card">
                    <div className="tx-stat-icon purple">
                        <FiSmartphone />
                    </div>

                    <div>
                        <span>Total Orders</span>

                        <h3>{orders.length}</h3>

                        <small>
                            Lifetime purchases
                        </small>
                    </div>
                </div>

                <div className="tx-stat-card">
                    <div className="tx-stat-icon green">
                        <FiActivity />
                    </div>

                    <div>
                        <span>Active Numbers</span>

                        <h3>
                            {
                                orders.filter(
                                    item => item.status === "ACTIVE"
                                ).length
                            }
                        </h3>

                        <small>
                            Awaiting SMS
                        </small>
                    </div>
                </div>

            </div>

            {/* FILTERS */}
            <div className="tx-filters">

                <div className="tx-search">

                    <FiSearch />

                    <input
                        type="text"
                        placeholder="Search phone number or reference..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1);
                        }}
                    />
                </div>

                <div className="select-wrapper">

                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setCurrentPage(1);
                        }}
                    >
                        <option>All Orders</option>
                        <option>ACTIVE</option>
                        <option>COMPLETED</option>
                        <option>CANCELLED</option>
                        <option>EXPIRED</option>
                    </select>

                </div>

                <div className="select-wrapper">

                    <select
                        value={dateFilter}
                        onChange={(e) => {
                            setDateFilter(
                                e.target.value
                            );
                            setCurrentPage(1);
                        }}
                    >
                        <option>
                            Last 30 Days
                        </option>
                        <option>
                            Today
                        </option>
                        <option>
                            Last 7 Days
                        </option>
                        <option>
                            Last 90 Days
                        </option>
                        <option>
                            This Year
                        </option>
                    </select>

                </div>

            </div>

            {/* TABLE */}
            <div className="tx-table">

                <div className="tx-table-head">
                    <span>Number</span>
                    <span>Status</span>
                    <span>Price</span>
                    <span>Date</span>
                </div>
                {loading ? (
                    Array.from({ length: 8 }).map((_, index) => (
                        <div className="tx-row skeleton-row" key={index}>
                            <div className="tx-info">
                                <div className="tx-icon skeleton skeleton-circle" />

                                <div className="tx-text">
                                    <div className="skeleton skeleton-title" />
                                    <div className="skeleton skeleton-subtitle" />
                                </div>
                            </div>

                            <div className="tx-status-wrapper">
                                <div className="skeleton skeleton-status" />
                            </div>

                            <div className="tx-amount">
                                <div className="skeleton skeleton-amount" />
                            </div>

                            <div className="tx-date">
                                <div className="skeleton skeleton-date" />
                                <div className="skeleton skeleton-time" />
                            </div>

                            <div className="skeleton skeleton-arrow" />
                        </div>
                    ))
                ) : paginatedOrders.length === 0 ? (
                    <div className="empty-history">

                        <div className="empty-icon">
                            <FiSmartphone />
                        </div>

                        <h3>No Orders Yet</h3>

                        <p>
                            Purchased virtual numbers will appear here after your first order.
                        </p>

                        <span className="empty-tip">
                            Buy your first number to start receiving SMS messages.
                        </span>

                    </div>
                ) : (
                    paginatedOrders.map((item) => (
                        <div
                            className="tx-row"
                            key={item._id}
                        >

                            <div className="tx-info">

                                <div className="tx-icon purchase">
    <img
        src={`https://cdn.simpleicons.org/${(item.service || "").toLowerCase()}`}
        alt={formatService(item.service)}
        loading="lazy"
        onError={(e) => {
            e.currentTarget.src = unknownLogo;
            e.currentTarget.onerror = null;
        }}
    />
</div>

                                <div>

                                    <h4>{item.phone}</h4>

                                    <p>
    {item.country} • {formatService(item.service)}
</p>
                                </div>

                            </div>

                            <div className="tx-status-wrapper">

                                <span
                                    className={`tx-status ${item.status.toLowerCase()}`}
                                >
                                    {item.status}
                                </span>

                            </div>

                            <div className="tx-amount debit">

                                -₦
                                {Number(item.price).toLocaleString("en-NG")}

                            </div>

                            <div className="tx-date">

                                <span>
                                    {formatDate(item.createdAt)}
                                </span>

                                <small>
                                    {formatRelativeTime(item.createdAt)}
                                </small>

                            </div>

                            <FiChevronRight className="tx-arrow" />

                        </div>
                    ))
                )}

                {/* PAGINATION */}
                {!loading &&
                    filteredOrders.length >
                    0 && (
                        <div className="tx-pagination">
                            <p className="pagination-text">
                                Showing{" "}
                                {(currentPage - 1) *
                                    ITEMS_PER_PAGE +
                                    1}{" "}
                                to{" "}
                                {Math.min(
                                    currentPage *
                                    ITEMS_PER_PAGE,
                                    filteredOrders.length
                                )}{" "}
                                of{" "}
                                {filteredOrders.length}{" "}
                                deposits
                            </p>

                            <div className="tx-pages">
                                <button
                                    disabled={
                                        currentPage ===
                                        1
                                    }
                                    onClick={() =>
                                        setCurrentPage(
                                            currentPage - 1
                                        )
                                    }
                                >
                                    <FiChevronLeft />
                                </button>

                                {Array.from(
                                    {
                                        length:
                                            totalPages,
                                    },
                                    (_, index) => (
                                        <button
                                            key={index}
                                            className={
                                                currentPage ===
                                                    index + 1
                                                    ? "active"
                                                    : ""
                                            }
                                            onClick={() =>
                                                setCurrentPage(
                                                    index + 1
                                                )
                                            }
                                        >
                                            {index + 1}
                                        </button>
                                    )
                                )}

                                <button
                                    className="next-btn"
                                    disabled={
                                        currentPage ===
                                        totalPages
                                    }
                                    onClick={() =>
                                        setCurrentPage(
                                            currentPage + 1
                                        )
                                    }
                                >
                                    <FiChevronRight />
                                </button>
                            </div>
                        </div>
                    )}

            </div>
        </div>
    );
};

export default OrderHistory;
