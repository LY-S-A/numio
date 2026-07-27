import { useState, useEffect } from "react";
import {
    FiX,
    FiBell,
    FiSend,
} from "react-icons/fi";

import "../styles/announcement-modal.css";

const AnnouncementModal = () => {
    const [open, setOpen] = useState(false);

    useEffect(() => {
        const hidden = localStorage.getItem("announcement_closed");

        if (!hidden) {
            setOpen(true);
        }
    }, []);

    const closeModal = () => {
        localStorage.setItem("announcement_closed", "true");
        setOpen(false);
    };

    if (!open) return null;

    return (
        <div className="announcement-overlay">
            <div className="announcement-modal">

                <button
                    className="announcement-close"
                    onClick={closeModal}
                >
                    <FiX />
                </button>

                <div className="announcement-icon">
                    <FiBell />
                </div>

                <h2>Welcome to Numio 🎉</h2>

                <p>
                    Join our official Telegram community to receive
                    important announcements, support updates, new
                    countries, services, giveaways and platform news.
                </p>

                <a
                    href="https://t.me/YOUR_CHANNEL"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="telegram-btn"
                >
                    <FiSend />
                    Join Telegram Channel
                </a>

                <button
                    className="announcement-dismiss"
                    onClick={closeModal}
                >
                    Maybe Later
                </button>

            </div>
        </div>
    );
};

export default AnnouncementModal;
