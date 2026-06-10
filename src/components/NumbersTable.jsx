import "../styles/components.css";

const activities = [
  {
    service: "WhatsApp",
    number: "+1 (551) 123-4567",
    country: "United States",
    status: "Active",
    time: "2 min ago",
  },
  {
    service: "Telegram",
    number: "+44 7700 900123",
    country: "United Kingdom",
    status: "Active",
    time: "5 min ago",
  },
  {
    service: "Google",
    number: "+234 901 234 5678",
    country: "Nigeria",
    status: "Expiring Soon",
    time: "15 min ago",
  },
  {
    service: "Deposit",
    number: "₦5,000 Added",
    country: "Transaction",
    status: "Success",
    time: "30 min ago",
  },
  {
    service: "Facebook",
    number: " +1 (415) 987-6543",
    country: "United States",
    status: "Active",
    time: "1 hour ago",
  },
  {
    service: "Signal",
    number: "+44 9751 9005987",
    country: "United Kingdom",
    status: "Expired",
    time: "2 hour ago",
  },
];

const RecentActivity = () => {
  const getStatusClass = (status) => {
    switch (status) {
      case "Active":
        return "success";
      case "Expiring Soon":
        return "warning";
      case "Success":
        return "info";
      default:
        return "danger";
    }
  };

  return (
    <div className="card">
      <div className="card-header">
        <h3>Recent Activity</h3>
        <button>See All</button>
      </div>

      <div className="activity-list">
        {activities.map((item, index) => (
          <div className="activity-item" key={index}>
            <div className="activity-info">
              <h4>{item.service}</h4>
              <p>{item.number}</p>
            </div>

            <div className="activity-country">
              {item.country}
            </div>

            <div className="activity-status">
              <span className={`status ${getStatusClass(item.status)}`}>
                {item.status}
              </span>
            </div>

            <div className="activity-time">
              {item.time}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentActivity;

