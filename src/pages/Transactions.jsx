import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import {
  FiSearch,
  FiChevronRight,
  FiChevronLeft,
} from "react-icons/fi";

import {
  FaArrowDown,
  FaWallet,
} from "react-icons/fa";

import flutterwaveLogo from "../assets/flutterwave.png";
import paystackLogo from "../assets/paystack.png";

import { useBalance } from "../context/BalanceContext";
import "../styles/transactions.css";

const API_URL = process.env.REACT_APP_API_URL;
const ITEMS_PER_PAGE = 10;

const DepositHistory = () => {
  const { formattedBalance } = useBalance();

  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] =
    useState("All Deposits");
  const [dateFilter, setDateFilter] =
    useState("Last 30 Days");

  const [totalDeposited, setTotalDeposited] =
    useState(0);

  const [currentPage, setCurrentPage] =
    useState(1);

  useEffect(() => {
    document.title = "Deposit History - Numio";
    fetchDeposits();
  }, []);

  const fetchDeposits = async () => {
    try {
      setLoading(true);

      const token = localStorage.getItem("token");

      const { data } = await axios.get(
        `${API_URL}/api/transaction/deposits-history`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setDeposits(data.deposits || []);
      setTotalDeposited(
        data.totalDeposited || 0
      );
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredDeposits = useMemo(() => {
    return deposits.filter((item) => {
      const matchesSearch =
        item.reference
          ?.toLowerCase()
          .includes(
            searchTerm.toLowerCase()
          );

      const matchesStatus =
        statusFilter === "All Deposits"
          ? true
          : item.status?.toLowerCase() ===
            statusFilter.toLowerCase();

      const createdAt = new Date(
        item.createdAt
      );

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
    deposits,
    searchTerm,
    statusFilter,
    dateFilter,
  ]);

  const totalPages = Math.ceil(
    filteredDeposits.length /
      ITEMS_PER_PAGE
  );

  const paginatedDeposits =
    filteredDeposits.slice(
      (currentPage - 1) *
        ITEMS_PER_PAGE,
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

  const formatTime = (date) => {
    return new Date(date).toLocaleTimeString(
      "en-NG",
      {
        hour: "2-digit",
        minute: "2-digit",
      }
    );
  };

  return (
    <div className="tx-page">

      {/* HEADER */}
      <div className="tx-header">

        <div>
          <h1>Deposit History</h1>

          <p>
            View all wallet funding
            transactions and deposit
            records
          </p>
        </div>

      </div>

      {/* STATS */}
      <div className="tx-stats">

        <div className="tx-stat-card">

          <div className="tx-stat-icon green">
            <FaArrowDown />
          </div>

          <div>
            <span>Total Deposited</span>

           <h3>
  ₦
  {Number(totalDeposited).toLocaleString("en-NG", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}
</h3>
            <small>
              Lifetime deposits
            </small>
          </div>

        </div>

        <div className="tx-stat-card">

          <div className="tx-stat-icon purple">
            <FaWallet />
          </div>

          <div>
            <span>Current Balance</span>

            <h3>
              {formattedBalance}
            </h3>

            <small>
              Available wallet balance
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
            placeholder="Search deposit reference..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(
                e.target.value
              );
              setCurrentPage(1);
            }}
          />

        </div>

        <div className="select-wrapper">

          <select
            value={statusFilter}
            onChange={(e) => {
              setStatusFilter(
                e.target.value
              );
              setCurrentPage(1);
            }}
          >
            <option>
              All Deposits
            </option>
            <option>
              Success
            </option>
            <option>
              Pending
            </option>
            <option>
              Failed
            </option>
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
          <span>Gateway</span>
          <span>Status</span>
          <span>Amount</span>
          <span>Date</span>
        </div>
                {loading ? (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              color: "var(--text-secondary)",
            }}
          >
            Loading deposit history...
          </div>
        ) : paginatedDeposits.length === 0 ? (
          <div
            style={{
              padding: "40px",
              textAlign: "center",
              color: "var(--text-secondary)",
            }}
          >
            No deposit history found.
          </div>
        ) : (
          paginatedDeposits.map((item) => (
            <div
              className="tx-row"
              key={item._id}
            >
              <div className="tx-info">
                <div className="tx-icon deposit gateway-icon">
  <img
    src={
      item.provider === "FLUTTERWAVE"
        ? flutterwaveLogo
        : item.provider === "PAYSTACK"
        ? paystackLogo
        : flutterwaveLogo
    }
    alt={item.provider}
  />
</div>

                <div>
                  <h4>
  {item.provider === "FLUTTERWAVE"
    ? "Flutterwave Deposit"
    : item.provider === "PAYSTACK"
    ? "Paystack Deposit"
    : "Wallet Deposit"}
</h4>

                  <p>
  {item.reference?.length > 17
    ? `${item.reference.substring(0, 17)}...`
    : item.reference}
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

              <div className="tx-amount credit">
                +₦
                {Number(
                  item.amount
                ).toLocaleString()}
              </div>

              <div className="tx-date">
                <span>
                  {formatDate(
                    item.createdAt
                  )}
                </span>

                <small>
                  {formatTime(
                    item.createdAt
                  )}
                </small>
              </div>

              <FiChevronRight className="tx-arrow" />
            </div>
          ))
        )}

        {/* PAGINATION */}
        {!loading &&
          filteredDeposits.length >
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
                  filteredDeposits.length
                )}{" "}
                of{" "}
                {filteredDeposits.length}{" "}
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

export default DepositHistory;
