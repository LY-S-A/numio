import {
  FaBell,
  FaWallet,
  FaBars,
} from "react-icons/fa";

import { useBalance } from "../context/BalanceContext";

import "../styles/topbar.css";

const Topbar = ({ setSidebarOpen }) => {
  const { formattedBalance } = useBalance();

  return (
    <header className="topbar">
      <div className="topbar-left">
        <button
          className="hamburger"
          onClick={() => setSidebarOpen(true)}
        >
          <FaBars />
        </button>

        <div className="welcome-text">
          {/* <p>Welcome back,</p> */}
          <h1>Hi Olalekan 👋</h1>
        </div>
      </div>

      <div className="topbar-right">
        <div className="wallet-box">
          <div>
            <span>Wallet Balance</span>
            <h3>{formattedBalance}</h3>
          </div>

          <FaWallet />
        </div>

        <FaBell className="top-icon" />
      </div>
    </header>
  );
};

export default Topbar;
