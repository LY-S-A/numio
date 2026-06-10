// import { useState } from "react";
// import { useTheme } from "../context/ThemeContext";

// import "../styles/appearance.css";

// export default function Appearance() {
//   const { darkMode, setDarkMode } =
//     useTheme();

//   const [compactMode, setCompactMode] =
//     useState(false);

//   const [animations, setAnimations] =
//     useState(true);

//   return (
//     <div className="appearance-page">
//       <div className="appearance-header">
//         <h1>Appearance</h1>

//         <p>
//           Customize how NUMIO looks and
//           feels.
//         </p>
//       </div>

//       {/* Theme */}
//       <div className="appearance-card">
//         <div className="setting-content">
//           <h4>Theme</h4>

//           <p>
//             {darkMode
//               ? "Dark mode enabled"
//               : "Light mode enabled"}
//           </p>
//         </div>

//         <label className="switch">
//           <input
//             type="checkbox"
//             checked={darkMode}
//             onChange={() =>
//               setDarkMode(!darkMode)
//             }
//           />

//           <span className="slider" />
//         </label>
//       </div>

//       {/* Compact Mode */}
//       <div className="appearance-card">
//         <div className="setting-content">
//           <h4>Compact Mode</h4>

//           <p>
//             Reduce spacing across the
//             dashboard.
//           </p>
//         </div>

//         <label className="switch">
//           <input
//             type="checkbox"
//             checked={compactMode}
//             onChange={() =>
//               setCompactMode(
//                 !compactMode
//               )
//             }
//           />

//           <span className="slider" />
//         </label>
//       </div>

//       {/* Animations */}
//       <div className="appearance-card">
//         <div className="setting-content">
//           <h4>Animations</h4>

//           <p>
//             Enable smooth transitions and
//             interface animations.
//           </p>
//         </div>

//         <label className="switch">
//           <input
//             type="checkbox"
//             checked={animations}
//             onChange={() =>
//               setAnimations(
//                 !animations
//               )
//             }
//           />

//           <span className="slider" />
//         </label>
//       </div>
//     </div>
//   );
// }

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiArrowLeft } from "react-icons/fi";
import { useTheme } from "../context/ThemeContext";

import "../styles/appearance.css";

export default function Appearance() {
  const navigate = useNavigate();

  const { darkMode, setDarkMode } =
    useTheme();

  const [compactMode, setCompactMode] =
    useState(false);

  const [animations, setAnimations] =
    useState(true);

  return (
  <div className="appearance-page">
    <div className="appearance-header">
      <button
        className="back-btn"
        onClick={() => navigate(-1)}
      >
        <FiArrowLeft />
      </button>

      <div className="appearance-title">
        <h1>Appearance</h1>

        <p>
          Customize how NUMIO looks and
          feels.
        </p>
      </div>
    </div>

    {/* Theme */}
    <div className="appearance-card">
      <div className="setting-content">
        <h4>Theme</h4>

        <p>
          {darkMode
            ? "Dark mode enabled"
            : "Light mode enabled"}
        </p>
      </div>

      <label className="switch">
        <input
          type="checkbox"
          checked={darkMode}
          onChange={() =>
            setDarkMode(!darkMode)
          }
        />

        <span className="slider" />
      </label>
    </div>

    {/* Compact Mode */}
    <div className="appearance-card">
      <div className="setting-content">
        <h4>Compact Mode</h4>

        <p>
          Reduce spacing across the
          dashboard.
        </p>
      </div>

      <label className="switch">
        <input
          type="checkbox"
          checked={compactMode}
          onChange={() =>
            setCompactMode(!compactMode)
          }
        />

        <span className="slider" />
      </label>
    </div>

    {/* Animations */}
    <div className="appearance-card">
      <div className="setting-content">
        <h4>Animations</h4>

        <p>
          Enable smooth transitions and
          interface animations.
        </p>
      </div>

      <label className="switch">
        <input
          type="checkbox"
          checked={animations}
          onChange={() =>
            setAnimations(!animations)
          }
        />

        <span className="slider" />
      </label>
    </div>
  </div>
);
}