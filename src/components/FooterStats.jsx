// import "../styles/components.css";

// const FooterStats = () => {
//   return (
//     <div className="footer-stats">
//       <div>
//         <span>System Status</span>
//         <h4>All Systems Operational</h4>
//       </div>

//       <div>
//         <span>SMS Delivery</span>
//         <h4>98.7%</h4>
//       </div>

//       <div>
//         <span>Numbers Available</span>
//         <h4>125,000+</h4>
//       </div>

//       <div>
//         <span>Average Delivery</span>
//         <h4>3.2s</h4>
//       </div>
//     </div>
//   );
// };

// export default FooterStats;

import "../styles/components.css";

const FooterStats = () => {
  return (
    <div className="footer-stats">
      <div className="footer-stat ">
        <span>System Status</span>
        <h4 className="success-text">All Systems Operational</h4>
      </div>

      <div className="footer-stat">
        <span>SMS Delivery</span>
        <h4 className="green-text">98.7%</h4>
      </div>

      <div className="footer-stat">
        <span>Numbers Available</span>
        <h4 className="purple-text">125,000+</h4>
      </div>

      <div className="footer-stat">
        <span>Average Delivery Time</span>
        <h4 className="blue-text">3.2s</h4>
      </div>
    </div>
  );
};

export default FooterStats;