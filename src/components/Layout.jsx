// import { useState } from "react";
// import Sidebar from "./Sidebar";
// import Topbar from "./Topbar";

// const Layout = ({ children }) => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div className="dashboard-layout">
//       <Sidebar
//         sidebarOpen={sidebarOpen}
//         setSidebarOpen={setSidebarOpen}
//       />

//       <div className="dashboard-content">
//         <Topbar setSidebarOpen={setSidebarOpen} />

//         <main className="dashboard-main">
//           {children}
//         </main>
//       </div>
//     </div>
//   );
// };

// export default Layout;

import { useState } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="dashboard-layout">
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      <div className="dashboard-content">
        <Topbar setSidebarOpen={setSidebarOpen} />

        <main className="dashboard-main">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;