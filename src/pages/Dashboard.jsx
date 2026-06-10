// import StatCard from "../components/StatCard";
// import NumbersTable from "../components/NumbersTable";
// import SmsPanel from "../components/SmsPanel";
// import FooterStats from "../components/FooterStats";

// import {
//   FaMobileAlt,
//   FaCommentDots,
//   FaChartLine,
//   FaCalendarAlt,
// } from "react-icons/fa";

// import "../styles/dashboard.css";

// const Dashboard = () => {
//   return (
//     <>
//       <div className="stats-grid">
//         <StatCard
//           icon={<FaMobileAlt />}
//           title="Active Numbers"
//           value="12"
//           color="purple"
//         />

//         <StatCard
//           icon={<FaCommentDots />}
//           title="SMS Received"
//           value="48"
//           color="green"
//         />

//         <StatCard
//           icon={<FaChartLine />}
//           title="Total Spent"
//           value="₦5,152.35"
//           color="orange"
//         />

//         <StatCard
//           icon={<FaCalendarAlt />}
//           title="Number Expiring"
//           value="3"
//           color="blue"
//         />
//       </div>

//       <div className="content-grid">
//         <NumbersTable />
//         <SmsPanel />
//       </div>

//       <FooterStats />
//     </>
//   );
// };

// export default Dashboard;

import StatCard from "../components/StatCard";
import NumbersTable from "../components/NumbersTable";
import SmsPanel from "../components/SmsPanel";
import FooterStats from "../components/FooterStats";

import {
  FaMobileAlt,
  FaCommentDots,
  FaChartLine,
  FaCalendarAlt,
} from "react-icons/fa";

import "../styles/dashboard.css";

const Dashboard = () => {
  return (
    <div className="dashboard-page">
      <div className="stats-grid">
        <StatCard
          icon={<FaMobileAlt />}
          title="Active Numbers"
          value="12"
          color="purple"
        />

        <StatCard
          icon={<FaCommentDots />}
          title="SMS Received"
          value="48"
          color="green"
        />

        <StatCard
          icon={<FaChartLine />}
          title="Total Spent"
          value="₦5,152.35"
          color="orange"
        />

        <StatCard
          icon={<FaCalendarAlt />}
          title="Number Expiring"
          value="3"
          color="blue"
        />
      </div>

      <div className="content-grid">
        <NumbersTable />
        <SmsPanel />
      </div>

      <FooterStats />
    </div>
  );
};

export default Dashboard;