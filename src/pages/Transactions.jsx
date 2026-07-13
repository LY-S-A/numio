import {
  FiSearch,
  FiChevronRight,
} from "react-icons/fi";

import {
  FaArrowDown,
  FaWallet,
} from "react-icons/fa";

import { useBalance } from "../context/BalanceContext";
import "../styles/transactions.css";

const deposits = [
  {
    title: "Flutterwave Deposit",
    reference: "NUM-56435",
    amount: "+₦2,000.00",
    status: "Success",
    date: "Jun 08, 2025",
    time: "02:31 PM",
  },
  {
    title: "Flutterwave Deposit",
    reference: "NUM-90642",
    amount: "+₦8,000.00",
    status: "Success",
    date: "Jun 08, 2025",
    time: "12:30 PM",
  },
  {
    title: "Flutterwave Deposit",
    reference: "NUM-79314",
    amount: "+₦15,000.00",
    status: "Success",
    date: "Jun 08, 2025",
    time: "11:35 AM",
  },
  {
    title: "Korapay Deposit",
    reference: "NUM-51084",
    amount: "+₦10,000.00",
    status: "Success",
    date: "Jun 07, 2025",
    time: "04:12 PM",
  },
  {
    title: "Korapay Deposit",
    reference: "NUM-34890",
    amount: "+₦5,000.00",
    status: "Pending",
    date: "Jun 07, 2025",
    time: "09:40 AM",
  },
];

const DepositHistory = () => {

  const { formattedBalance } = useBalance();
  
  return (
    <div className="tx-page">

      {/* HEADER */}
      <div className="tx-header">
        <div>
          <h1>Deposit History</h1>
          <p>
            View all wallet funding transactions and deposit records
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
            <h3>₦120,000.00</h3>
            <small>Lifetime deposits</small>
          </div>
        </div>

        <div className="tx-stat-card">
          <div className="tx-stat-icon purple">
            <FaWallet />
          </div>

          <div>
            <span>Current Balance</span>
            <h3>{formattedBalance}</h3>
            <small>Available wallet balance</small>
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
          />
        </div>

        <div className="select-wrapper">
          <select>
            <option>All Deposits</option>
            <option>Successful</option>
            <option>Pending</option>
            <option>Failed</option>
          </select>
        </div>

        <div className="select-wrapper">
          <select>
            <option>Last 30 Days</option>
            <option>Today</option>
            <option>Last 7 Days</option>
            <option>Last 90 Days</option>
            <option>This Year</option>
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

        {deposits.map((item, index) => (
          <div
            className="tx-row"
            key={index}
          >

            <div className="tx-info">

              <div className="tx-icon deposit">
                <FaArrowDown />
              </div>

              <div>
                <h4>{item.title}</h4>
                <p>{item.reference}</p>
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
              {item.amount}
            </div>

            <div className="tx-date">
              <span>{item.date}</span>
              <small>{item.time}</small>
            </div>

            <FiChevronRight className="tx-arrow" />

          </div>
        ))}

        {/* PAGINATION */}
        <div className="tx-pagination">

          <p className="pagination-text">
            Showing 1 to 5 of 25 deposits
          </p>

          <div className="tx-pages">
            <button className="active">1</button>
            <button>2</button>
            <button>3</button>
            <button className="next-btn">
              <FiChevronRight />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};

export default DepositHistory;
