import { useEffect, useRef } from "react";
import {
  FiMoreVertical,
  FiPaperclip,
  FiSend,
} from "react-icons/fi";

import "../styles/support.css";

const messages = [
  {
    sender: "user",
    text: "Hi, I'm having trouble resetting my password. Can you help me?",
    time: "10:30 AM",
  },
  {
    sender: "agent",
    text: "Hello! 👋 I'd be happy to help you reset your password. Can you please share the email address associated with your account?",
    time: "10:31 AM",
  },
  {
    sender: "user",
    text: "Sure, it's john.doe@email.com",
    time: "10:32 AM",
  },
  {
    sender: "agent",
    text: "Thanks! I've sent a password reset link to your email. Please check your inbox (and spam folder just in case).",
    time: "10:33 AM",
  },
  {
    sender: "user",
    text: "Got it! Thank you so much.",
    time: "10:34 AM",
  },
  {
    sender: "agent",
    text: "You're welcome! 😊 Let us know if you need anything else.",
    time: "10:35 AM",
  },
];

export default function Support() {
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, []);

  return (
    <div className="support-wrapper">
      <div className="support-page">
        {/* Header */}
        <div className="chat-header">
          <div className="header-left">
            <div className="agent-avatar">🎧</div>

            <div className="agent-profile">
              <h3>Support Agent</h3>
              <span className="online">● Online</span>
            </div>
          </div>

          <button className="icon-btn">
            <FiMoreVertical />
          </button>
        </div>

        {/* Messages */}
        <div className="chat-body">
          <div className="chat-date">Today</div>

          {messages.map((msg, index) => (
            <div
              key={index}
              className={`message-row ${msg.sender}`}
            >
              {msg.sender === "agent" && (
                <div className="msg-avatar">🎧</div>
              )}

              <div className="message-content">
                <div
                  className={`message-bubble ${msg.sender}`}
                >
                  {msg.text}
                </div>

                <div
                  className={`message-time ${msg.sender}`}
                >
                  {msg.time}
                </div>
              </div>
            </div>
          ))}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <div className="chat-input">
          <button className="attach-btn">
            <FiPaperclip />
          </button>

          <input
            type="text"
            placeholder="Type a message..."
          />

          <button className="send-btn">
            <FiSend />
          </button>
        </div>
      </div>
    </div>
  );
}