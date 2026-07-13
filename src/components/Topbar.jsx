// import {
//   FaBell,
//   FaWallet,
//   FaBars,
// } from "react-icons/fa";

// import { useBalance } from "../context/BalanceContext";

// import "../styles/topbar.css";

// const Topbar = ({ setSidebarOpen }) => {
//   const { formattedBalance } = useBalance();

//   return (
//     <header className="topbar">
//       <div className="topbar-left">
//         <button
//           className="hamburger"
//           onClick={() => setSidebarOpen(true)}
//         >
//           <FaBars />
//         </button>

//         <div className="welcome-text">
//           {/* <p>Welcome back,</p> */}
//           <h1>Hi Olalekan 👋</h1>
//         </div>
//       </div>

//       <div className="topbar-right">
//         <div className="wallet-box">
//           <div>
//             <span>Wallet Balance</span>
//             <h3>{formattedBalance}</h3>
//           </div>

//           <FaWallet />
//         </div>

//         <FaBell className="top-icon" />
//       </div>
//     </header>
//   );
// };

// export default Topbar;

import {
  FaBell,
  FaWallet,
  FaBars,
} from "react-icons/fa";
import { useEffect, useState } from "react";

import { useBalance } from "../context/BalanceContext";

import "../styles/topbar.css";

const Topbar = ({ setSidebarOpen }) => {
  const { balance } = useBalance();

  const [displayBalance, setDisplayBalance] = useState(0);

  useEffect(() => {
    let start = displayBalance;
    const end = balance;

    if (start === end) return;

    const duration = 800; // ms
    const increment = (end - start) / (duration / 16);

    const timer = setInterval(() => {
      start += increment;

      if (
        (increment > 0 && start >= end) ||
        (increment < 0 && start <= end)
      ) {
        start = end;
        clearInterval(timer);
      }

      setDisplayBalance(Math.round(start));
    }, 16);

    return () => clearInterval(timer);
  }, [balance]);

  const formattedBalance = new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    minimumFractionDigits: 2,
  }).format(displayBalance);

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
