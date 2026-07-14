// import { useEffect, useRef, useState } from "react";
// import axios from "axios";
// import {
//   FaBell,
//   FaWallet,
//   FaBars,
// } from "react-icons/fa";

// import { useBalance } from "../context/BalanceContext";

// import "../styles/topbar.css";

// const API_URL = process.env.REACT_APP_API_URL;

// const Topbar = ({ setSidebarOpen }) => {
//   const { balance } = useBalance();

//   const [username, setUsername] = useState("");
//   const [displayBalance, setDisplayBalance] = useState(0);

//   const previousBalance = useRef(0);

//   // Fetch user profile
//   useEffect(() => {
//     const fetchProfile = async () => {
//       try {
//         const token = localStorage.getItem("token");

//         const { data } = await axios.get(
//           `${API_URL}/api/user/profile`,
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );

//         if (data.success) {
//           setUsername(data.user.username);
//         }
//       } catch (err) {
//         console.error("Failed to fetch profile:", err);
//       }
//     };

//     fetchProfile();
//   }, []);

//   // Animate wallet balance
//   useEffect(() => {
//     const from = previousBalance.current;
//     const to = balance;
//     const duration = 800;

//     const start = performance.now();

//     const animate = (time) => {
//       const progress = Math.min((time - start) / duration, 1);

//       const value = Math.round(
//         from + (to - from) * progress
//       );

//       setDisplayBalance(value);

//       if (progress < 1) {
//         requestAnimationFrame(animate);
//       } else {
//         previousBalance.current = to;
//       }
//     };

//     requestAnimationFrame(animate);
//   }, [balance]);

//   const formattedBalance = new Intl.NumberFormat("en-NG", {
//     style: "currency",
//     currency: "NGN",
//     minimumFractionDigits: 2,
//   }).format(displayBalance);

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
//           <h1>Hi {username || "User"} 👋</h1>
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
import axios from "axios";
import {
  FaBell,
  FaWallet,
  FaBars,
} from "react-icons/fa";

import { useBalance } from "../context/BalanceContext";

import "../styles/topbar.css";

const API_URL = process.env.REACT_APP_API_URL;

const Topbar = ({ setSidebarOpen }) => {
  const { balance } = useBalance();

  const [username, setUsername] = useState("");
  const [loadingProfile, setLoadingProfile] = useState(true);

  const [displayBalance, setDisplayBalance] = useState(0);
  const previousBalance = useRef(0);

  // Fetch authenticated user's profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        const { data } = await axios.get(
          `${API_URL}/api/user/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (data.success) {
          setUsername(data.user.username);
        }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoadingProfile(false);
      }
    };

    fetchProfile();
  }, []);

  // Animate wallet balance
  useEffect(() => {
    const from = previousBalance.current;
    const to = balance;
    const duration = 800;

    const start = performance.now();

    const animate = (time) => {
      const progress = Math.min((time - start) / duration, 1);

      const value = Math.round(from + (to - from) * progress);

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
          <h1>
            {loadingProfile
              ? "Hi..."
              : `Hi ${username || "there"} 👋`}
          </h1>
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
