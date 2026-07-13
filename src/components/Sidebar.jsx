import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";

import logoDark from "../assets/logo-dark.png";
import logoLight from "../assets/logo-light.png";

import {
  FaHome,
  FaShoppingCart,
  FaEnvelope,
  FaWallet,
  FaExchangeAlt,
  FaHeadset,
  FaUserCircle,
  FaChevronDown,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

import "../styles/sidebar.css";

const Sidebar = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const [showMenu, setShowMenu] =
    useState(false);

  const [isLightTheme, setIsLightTheme] =
    useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const checkTheme = () => {
      setIsLightTheme(
        document.body.classList.contains(
          "light-theme"
        )
      );
    };

    checkTheme();

    const observer =
      new MutationObserver(checkTheme);

    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ["class"],
    });

    return () => observer.disconnect();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setSidebarOpen(false);
    navigate("/");
  };

  const handleNavigate = (path) => {
    navigate(path);
    setSidebarOpen(false);
    setShowMenu(false);
  };

  return (
    <>
      {sidebarOpen && (
        <div
          className="sidebar-overlay"
          onClick={() =>
            setSidebarOpen(false)
          }
        />
      )}

      <aside
        className={`sidebar ${
          sidebarOpen
            ? "sidebar-open"
            : ""
        }`}
      >
        {/* Logo */}
        <div className="sidebar-logo">
          <img
            src={
              isLightTheme
                ? logoLight
                : logoDark
            }
            alt="Numio Logo"
            className="logo-image"
          />
        </div>

        {/* Navigation */}
        <nav>
          <NavLink
            to="/dashboard"
            end
            className={({
              isActive,
            }) =>
              isActive
                ? "menu-item active"
                : "menu-item"
            }
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <FaHome />
            Dashboard
          </NavLink>

          <NavLink
            to="/buy-number"
            className={({
              isActive,
            }) =>
              isActive
                ? "menu-item active"
                : "menu-item"
            }
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <FaShoppingCart />
            Buy Number
          </NavLink>

          <NavLink
            to="/inbox"
            className={({
              isActive,
            }) =>
              isActive
                ? "menu-item active"
                : "menu-item"
            }
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <FaEnvelope />
            Inbox (SMS)
          </NavLink>

          <NavLink
            to="/fund-wallet"
            className={({
              isActive,
            }) =>
              isActive
                ? "menu-item active"
                : "menu-item"
            }
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <FaWallet />
            Fund Wallet
          </NavLink>

          <NavLink
            to="/transactions"
            className={({
              isActive,
            }) =>
              isActive
                ? "menu-item active"
                : "menu-item"
            }
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <FaExchangeAlt />
            Transactions
          </NavLink>

          <NavLink
            to="/support"
            className={({
              isActive,
            }) =>
              isActive
                ? "menu-item active"
                : "menu-item"
            }
            onClick={() =>
              setSidebarOpen(false)
            }
          >
            <FaHeadset />
            Support
          </NavLink>
        </nav>

        {/* User Section */}
        <div className="sidebar-user">
          <div className="user-info">
            <div className="user-avatar">
              <FaUserCircle />
            </div>

            <div className="user-details">
              <div className="user-name">
                User

                <span className="pro-badge">
                  Pro
                </span>
              </div>

              <p>user@numio.com</p>
            </div>

            <button
              className="user-settings"
              onClick={() =>
                setShowMenu(
                  !showMenu
                )
              }
            >
              <FaChevronDown
                className={
                  showMenu
                    ? "chevron-open"
                    : ""
                }
              />
            </button>
          </div>

          {showMenu && (
            <div className="account-menu">
              <button
                className="account-item"
                onClick={() =>
                  handleNavigate(
                    "/settings"
                  )
                }
              >
                <FaCog />
                Settings
              </button>

              <button
                className="account-item signout"
                onClick={
                  handleLogout
                }
              >
                <FaSignOutAlt />
                Sign Out
              </button>
            </div>
          )}
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
