import "../styles/components.css";

const StatCard = ({ icon, title, value, color }) => {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>
        {icon}
      </div>

      <div className="stats-details">
        <p>{title}</p>
        <h2>{value}</h2>
      </div>
    </div>
  );
};

export default StatCard;