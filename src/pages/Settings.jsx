import {
  FiUser,
  FiLock,
  FiMoon,
  FiBell,
  FiShield,
  FiMonitor,
  FiChevronRight,
} from "react-icons/fi";

import { useNavigate } from "react-router-dom";
import "../styles/settings.css";

const settings = [
  {
    icon: <FiUser />,
    title: "Profile",
    desc: "Update your username and email address",
  },
  {
    icon: <FiLock />,
    title: "Password",
    desc: "Change your account password",
  },
  {
    icon: <FiMoon />,
    title: "Appearance",
    desc: "Switch between dark and light mode",
    path: "/appearance",
  },
  {
    icon: <FiBell />,
    title: "Notifications",
    desc: "Manage SMS and email notifications",
  },
  {
    icon: <FiShield />,
    title: "Security",
    desc: "Enable 2FA and account protection",
  },
  {
    icon: <FiMonitor />,
    title: "Sessions",
    desc: "Manage active devices and logins",
  },
];

export default function Settings() {
  const navigate = useNavigate();

  return (
    <div className="settings-page">
      <div className="settings-header">
        <h1>Settings</h1>
        <p>
          Manage your account settings and
          preferences
        </p>
      </div>

      <div className="settings-list">
        {settings.map((item, index) => (
          <button
            key={index}
            className="setting-card"
            onClick={() => {
              if (item.path) {
                navigate(item.path);
              }
            }}
          >
            <div className="setting-left">
              <div className="setting-icon">
                {item.icon}
              </div>

              <div className="setting-info">
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </div>
            </div>

            <FiChevronRight className="arrow" />
          </button>
        ))}
      </div>
    </div>
  );
}