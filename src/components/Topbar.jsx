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

import { useEffect, useRef, useState } from "react";
import {
  FaBell,
  FaWallet,
  FaBars,
} from "react-icons/fa";

import { useBalance } from "../context/BalanceContext";

import "../styles/topbar.css";

const Topbar = ({ setSidebarOpen }) => {
  const { balance } = useBalance();

  const [displayBalance, setDisplayBalance] = useState(0);
  const previousBalance = useRef(0);

  useEffect(() => {
    const from = previousBalance.current;
    const to = balance;
    const duration = 800;

    const start = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - start) / duration, 1);

      const value = Math.round(
        from + (to - from) * progress
      );

      setDisplayBalance(value);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        previousBalance.current = to;
      }
    };

    requestAnimationFrame(animate);
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
