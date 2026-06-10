import "../styles/components.css";

const messages = [
  {
    number: "+1 (551) 123-4567",
    code: "612-540",
    app: "WhatsApp",
    time: "2 min ago",
  },
  {
    number: "+44 7700 900123",
    code: "87321",
    app: "Telegram",
    time: "5 min ago",
  },
  {
    number: "+234 901 234 5678",
    code: "G-123456",
    app: "Google",
    time: "15 min ago",
  },
  {
    number: "+1 (415) 987-6543",
    code: "342573",
    app: "Facebook",
    time: "1 hour ago",
  },
];

const SmsPanel = () => {
  return (
    <div className="card sms-card">
      <div className="card-header">
        <h3>Recent SMS</h3>
        <button className="card-btn">View All</button>
      </div>

      {messages.map((msg, index) => (
        <div className="sms-item" key={index}>
          <div className="sms-content">
            <h4>{msg.number}</h4>

            <p className="sms-message">
              <span className="sms-msg">Your {msg.app} code is</span>
              <span className="code">{msg.code}</span>
            </p>
          </div>

          <small>{msg.time}</small>
        </div>
      ))}

      <div className="refresh-row">
        <span>Auto Refresh</span>

        <label className="switch">
          <input type="checkbox" defaultChecked />
          <span className="slider"></span>
        </label>
      </div>
    </div>
  );
};

export default SmsPanel;