import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FiArrowRight,
    FiGlobe,
    FiMenu,
    FiX,
    FiMessageSquare,
    FiZap,
    FiGrid,
    FiShield,
    FiSmartphone,
    FiTrendingUp,
    FiPhone,
    FiDatabase,
} from "react-icons/fi";
import { motion } from "framer-motion";
import logo from "../assets/logo-favicon.png";
import { FaFacebookF, FaTwitter, FaInstagram, FaLinkedinIn, FaGithub, } from "react-icons/fa";
import "../styles/landing.css";
import hero from "../assets/hero-dashboard.png";

export default function LandingPage() {

    const heroRef = useRef(null);
    const servicesRef = useRef(null);
    const whySectionRef = useRef(null);
    const howSectionRef = useRef(null);
    const footerRef = useRef(null);

    const [menuOpen, setMenuOpen] = useState(false);

    const navigate = useNavigate();

    const fadeUp = {
        hidden: {
            opacity: 0,
            y: 60,
        },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: "easeOut",
            },
        },
    };

    const fadeLeft = {
        hidden: {
            opacity: 0,
            x: -80,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.7,
            },
        },
    };

    const fadeRight = {
        hidden: {
            opacity: 0,
            x: 80,
        },
        visible: {
            opacity: 1,
            x: 0,
            transition: {
                duration: 0.7,
            },
        },
    };

    return (
        <div className="landing">

            {/* NAVBAR */}

            <nav className="navbar">

                <div className="logo">
                    <img src={logo} alt="RealSMS" />
                </div>

                {/* Desktop Navigation */}

                <ul className="nav-links">

                    <li onClick={() =>
                        heroRef.current?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        })
                    }>
                        Discover
                    </li>

                    <li onClick={() =>
                        whySectionRef.current?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        })
                    }>
                        Why Choose Us
                    </li>

                    <li onClick={() =>
                        servicesRef.current?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        })
                    }>
                        Our Services
                    </li>

                    <li onClick={() =>
                        howSectionRef.current?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        })
                    }>
                        Overview
                    </li>

                    <li onClick={() =>
                        footerRef.current?.scrollIntoView({
                            behavior: "smooth",
                            block: "start",
                        })
                    }>
                        Reach Us
                    </li>

                </ul>

                <div className="nav-buttons">

                    <button
                        className="landing-login-btn"
                        onClick={() => navigate("/login")}
                    >
                        Log in
                    </button>

                    <button
                        className="signup-btn"
                        onClick={() => navigate("/register")}
                    >
                        Sign up
                    </button>

                </div>

                {/* Mobile Hamburger */}

                <button
                    className="mobile-menu-btn"
                    onClick={() => setMenuOpen(true)}
                >
                    <FiMenu />
                </button>

            </nav>

            {/* Mobile Sidebar */}

            <div
                className={`mobile-overlay ${menuOpen ? "show" : ""}`}
                onClick={() => setMenuOpen(false)}
            ></div>

            <aside className={`mobile-sidebar ${menuOpen ? "open" : ""}`}>

                <button
                    className="mobile-close"
                    onClick={() => setMenuOpen(false)}
                >
                    <FiX />
                </button>

                <ul className="mobile-nav-links">

                    <li
                        onClick={() => {
                            heroRef.current?.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                            });
                            setMenuOpen(false);
                        }}
                    >
                        Discover
                    </li>

                    <li
                        onClick={() => {
                            servicesRef.current?.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                            });
                            setMenuOpen(false);
                        }}
                    >
                        Our Services
                    </li>

                    <li
                        onClick={() => {
                            whySectionRef.current?.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                            });
                            setMenuOpen(false);
                        }}
                    >
                        Why Choose Us
                    </li>

                    <li
                        onClick={() => {
                            howSectionRef.current?.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                            });
                            setMenuOpen(false);
                        }}
                    >
                        Overview
                    </li>

                    <li
                        onClick={() => {
                            footerRef.current?.scrollIntoView({
                                behavior: "smooth",
                                block: "start",
                            });
                            setMenuOpen(false);
                        }}
                    >
                        Reach Us
                    </li>

                </ul>

                <div className="mobile-sidebar-buttons">

                    <button
                        className="landing-login-btn mobile-login-button"
                        onClick={() => navigate("/login")}
                    >
                        Log in
                    </button>

                    <button
                        className="signup-btn"
                        onClick={() => navigate("/register")}
                    >
                        Sign up
                    </button>

                </div>

            </aside>

            {/* HERO */}

            <motion.section
                ref={heroRef}
                className="hero"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.25 }}
            >

                <motion.div
                    className="hero-left"
                    variants={fadeLeft}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >

                    <div className="hero-badge">
                        Virtual Numbers for SMS Verification
                    </div>

                    <h1>
                        Buy Virtual Phone Numbers
                        <br />
                        for OTP Verification
                        <br />
                        <span>in 100+ Countries</span>
                    </h1>

                    <p>
                        Numio provides instant virtual phone numbers 
                        for SMS verification, OTP activation, and online
                        account verification across 100+ countries. 
                        Fast delivery, secure payments, affordable pricing, 
                        and reliable SMS reception for WhatsApp, Telegram, 
                        Google, Facebook, TikTok, Discord, Binance, and thousands 
                        of other services.
                    </p>

                    <div className="hero-buttons">

                        <button
                            className="primary-btn"
                            onClick={() => navigate("/register")}
                        >
                            Get Started Now
                            <FiArrowRight />
                        </button>

                        <button
                            className="secondary-btn"
                            onClick={() =>
                                servicesRef.current?.scrollIntoView({
                                    behavior: "smooth",
                                    block: "start",
                                })
                            }
                        >
                            <FiGrid />
                            Explore Services
                        </button>

                    </div>

                    <div className="hero-stats">

                        <div className="stat">

                            <div className="icon">
                                <FiGlobe />
                            </div>

                            <div>
                                <h3>100+</h3>
                                <p>Countries</p>
                            </div>

                        </div>

                        <div className="stat">

                            <div className="icon">
                                <FiMessageSquare />
                            </div>

                            <div>
                                <h3>Instant</h3>
                                <p>OTP Delivery</p>
                            </div>

                        </div>

                    </div>

                </motion.div>

                <motion.div
                    className="hero-right"
                    variants={fadeRight}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >

                    <div className="dashboard-card">

                        <img
                            src={hero}
                            alt="Dashboard"
                        />

                    </div>

                </motion.div>

            </motion.section>

            {/* ======================================
SERVICES
====================================== */}

            <motion.section
                ref={servicesRef}
                className="landing-services"
                variants={fadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
            >
                <div className="landing-services-header">

                    <span className="landing-services-badge">
                        Our Services
                    </span>

                    <h2>
                        Everything you need for SMS Verification
                    </h2>

                    <p>
                       Purchase virtual phone numbers for OTP verification from more than 100 countries. 
                       Receive SMS verification codes instantly for popular online services using our 
                       fast and reliable platform.
                    </p>

                </div>

                <div className="landing-services-grid">

                    <motion.div
                        className="landing-service-card"
                        whileHover={{ y: -8 }}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >

                        <div className="landing-service-icon">
                            <FiPhone />
                        </div>

                        <h3>Virtual Phone Numbers</h3>

                        <p>
                            Purchase virtual phone numbers from over 100 countries
                            for WhatsApp, Telegram, Google, Facebook, Instagram,
                            TikTok and hundreds of other online services with
                            instant SMS delivery.
                        </p>

                    </motion.div>

                    <motion.div
                        className="landing-service-card"
                        whileHover={{ y: -8 }}
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >

                        <div className="landing-service-icon landing-service-icon-purple">
                            <FiDatabase />
                        </div>

                        <h3>Virtual Phone Numbers</h3>

                        <p>
                            Buy temporary virtual phone numbers for SMS verification on 
                            WhatsApp, Telegram, Google, Facebook, Instagram, TikTok, Discord, 
                            Microsoft, Binance, Uber, Amazon, and thousands of supported services.
                        </p>

                    </motion.div>

                </div>

            </motion.section>

            {/* ======================================
WHY CHOOSE REALSMS
====================================== */}

            <motion.section
                ref={whySectionRef}
                className="why-realsms"
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
                viewport={{ once: true, amount: 0.2 }}
            >

                <motion.div
                    className="why-header"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >

                    <span className="why-badge">
                        Why Choose RealSMS
                    </span>

                    <h2>
                        Everything you need for fast,
                        secure virtual numbers and
                        SMS verification.
                    </h2>

                    <p>
                        Built for developers, businesses and individuals who need
                        reliable virtual phone numbers, instant SMS delivery and
                        access to social media logs.
                    </p>

                </motion.div>

                <motion.div
                    className="why-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.15,
                            },
                        },
                    }}
                >

                    <motion.div
                        className="why-card"
                        variants={{
                            hidden: {
                                opacity: 0,
                                y: 50,
                            },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                    duration: 0.6,
                                },
                            },
                        }}
                        whileHover={{
                            y: -10,
                            scale: 1.03,
                        }}
                    >

                        <div className="why-icon">
                            <FiZap />
                        </div>

                        <h3>Instant SMS Delivery</h3>

                        <p>
                            Receive verification codes and OTP messages within
                            seconds after purchasing a virtual number.
                        </p>

                    </motion.div>

                    <motion.div
                        className="why-card"
                        variants={{
                            hidden: {
                                opacity: 0,
                                y: 50,
                            },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                    duration: 0.6,
                                },
                            },
                        }}
                        whileHover={{
                            y: -10,
                            scale: 1.03,
                        }}
                    >

                        <div className="why-icon">
                            <FiGlobe />
                        </div>

                        <h3>100+ Countries</h3>

                        <p>
                            Access virtual phone numbers from a growing list of
                            countries for registrations worldwide.
                        </p>

                    </motion.div>

                    <motion.div
                        className="why-card"
                        variants={{
                            hidden: {
                                opacity: 0,
                                y: 50,
                            },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                    duration: 0.6,
                                },
                            },
                        }}
                        whileHover={{
                            y: -10,
                            scale: 1.03,
                        }}
                    >

                        <div className="why-icon">
                            <FiShield />
                        </div>

                        <h3>Privacy Protection</h3>

                        <p>
                            Keep your personal phone number private while creating
                            and verifying online accounts.
                        </p>

                    </motion.div>

                    <motion.div
                        className="why-card"
                        variants={{
                            hidden: {
                                opacity: 0,
                                y: 50,
                            },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                    duration: 0.6,
                                },
                            },
                        }}
                        whileHover={{
                            y: -10,
                            scale: 1.03,
                        }}
                    >

                        <div className="why-icon">
                            <FiSmartphone />
                        </div>

                        <h3>Wide Platform Support</h3>

                        <p>
                            Works with popular services including WhatsApp,
                            Telegram, Google, Facebook, TikTok, Instagram and
                            many others.
                        </p>

                    </motion.div>

                    <motion.div
                        className="why-card"
                        variants={{
                            hidden: {
                                opacity: 0,
                                y: 50,
                            },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                    duration: 0.6,
                                },
                            },
                        }}
                        whileHover={{
                            y: -10,
                            scale: 1.03,
                        }}
                    >

                        <div className="why-icon">
                            <FiTrendingUp />
                        </div>

                        <h3>Live Inventory</h3>

                        <p>
                            Browse available countries, services and prices that
                            are updated in real time before you purchase.
                        </p>

                    </motion.div>

                    <motion.div
                        className="why-card"
                        variants={{
                            hidden: {
                                opacity: 0,
                                y: 50,
                            },
                            visible: {
                                opacity: 1,
                                y: 0,
                                transition: {
                                    duration: 0.6,
                                },
                            },
                        }}
                        whileHover={{
                            y: -10,
                            scale: 1.03,
                        }}
                    >

                        <div className="why-icon">
                            <FiMessageSquare />
                        </div>

                        <h3>Social Media Logs</h3>

                        <p>
                            Browse available social media logs through a secure,
                            simple and easy-to-use marketplace.
                        </p>

                    </motion.div>

                </motion.div>

            </motion.section>

            {/* ============================
    HOW IT WORKS
============================ */}

            <motion.section
                ref={howSectionRef}
                className="how-section"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >

                <motion.div
                    className="section-title"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >

                    <span>How it works</span>

                    <h2>
                        Get started in
                        <br />
                        less than 60 seconds
                    </h2>

                    <p>
                        Buy a virtual number or access social media logs in just a few simple
                        steps.
                    </p>

                </motion.div>

                <div className="steps">

                    <motion.div
                        className="step"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        whileHover={{
                            y: -8,
                        }}
                    >

                        <div className="step-number">
                            01
                        </div>

                        <h3>Create your account</h3>

                        <p>
                            Register in seconds and verify your email to unlock the marketplace.
                        </p>

                    </motion.div>

                    <div className="step-line"></div>

                    <motion.div
                        className="step"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        whileHover={{
                            y: -8,
                        }}
                    >

                        <div className="step-number">
                            02
                        </div>

                        <h3>Select a service</h3>

                        <p>
                            Choose from virtual numbers, SMS activations or social media logs.
                        </p>

                    </motion.div>

                    <div className="step-line"></div>

                    <motion.div
                        className="step"
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        whileHover={{
                            y: -8,
                        }}
                    >
                        <div className="step-number">
                            03
                        </div>

                        <h3>Receive instantly</h3>

                        <p>
                            Get OTPs, messages and account logs delivered instantly with zero delay.
                        </p>

                    </motion.div>

                </div>

            </motion.section>

            {/* ============================
    CTA
============================ */}

            <motion.section
                className="cta"
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >

                <motion.div
                    className="cta-content"
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                    viewport={{ once: true }}
                >

                    <span className="cta-badge">
                        Ready?
                    </span>

                    <h2>
                        Start receiving SMS
                        <br />
                        in minutes.
                    </h2>

                    <p>
                        Join thousands of developers, businesses and marketers using our secure
                        virtual number platform every day.
                    </p>

                    <div className="cta-buttons">

                        <button className="primary-btn">
                            Create Free Account
                            <FiArrowRight />
                        </button>

                        <button className="secondary-btn">
                            Contact Sales
                        </button>

                    </div>

                </motion.div>

                <motion.div
                    className="cta-decoration"
                    animate={{
                        rotate: [0, 3, -3, 0],
                    }}
                    transition={{
                        duration: 8,
                        repeat: Infinity,
                        ease: "linear",
                    }}
                >

                    <div className="circle one"></div>

                    <div className="circle two"></div>

                    <div className="circle three"></div>

                </motion.div>

            </motion.section>

            {/* ===========================
FOOTER
=========================== */}

            <motion.footer
                ref={footerRef}
                className="footer"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
            >
                <motion.div
                    className="footer-grid"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    variants={{
                        visible: {
                            transition: {
                                staggerChildren: 0.15,
                            },
                        },
                    }}
                >

                    <motion.div
                        className="footer-brand" // or just className="" for the other columns
                        variants={{
                            hidden: {
                                opacity: 0,
                                y: 30,
                            },
                            visible: {
                                opacity: 1,
                                y: 0,
                            },
                        }}
                    >

                        <div className="logo">
                            <img src={logo} alt="RealSMS" />
                        </div>


                        <p>

                            The fastest platform for virtual phone
                            numbers, SMS verification and social
                            media logs.

                        </p>

                        <div className="social-icons">

                            <a href="/">
                                <FaFacebookF />
                            </a>

                            <a href="/">
                                <FaTwitter />
                            </a>

                            <a href="/">
                                <FaInstagram />
                            </a>

                            <a href="/">
                                <FaLinkedinIn />
                            </a>

                            <a href="/">
                                <FaGithub />
                            </a>

                        </div>

                    </motion.div>

                    <motion.div
                        className=""
                        variants={{
                            hidden: {
                                opacity: 0,
                                y: 30,
                            },
                            visible: {
                                opacity: 1,
                                y: 0,
                            },
                        }}
                    >

                        <h4>Products</h4>

                        <ul>

                            <li>Virtual Numbers</li>

                            <li>SMS Verification</li>

                            <li>Social Media Logs</li>

                            <li>API</li>

                            <li>Pricing</li>

                        </ul>

                    </motion.div>

                    <motion.div
                        className=""
                        variants={{
                            hidden: {
                                opacity: 0,
                                y: 30,
                            },
                            visible: {
                                opacity: 1,
                                y: 0,
                            },
                        }}
                    >

                        <h4>Resources</h4>

                        <ul>

                            <li>Documentation</li>

                            <li>Developers</li>

                            <li>Blog</li>

                            <li>Status</li>

                            <li>Help Center</li>

                        </ul>

                    </motion.div>

                    <motion.div
                        className=""
                        variants={{
                            hidden: {
                                opacity: 0,
                                y: 30,
                            },
                            visible: {
                                opacity: 1,
                                y: 0,
                            },
                        }}
                    >

                        <h4>Company</h4>

                        <ul>

                            <li>About</li>

                            <li>Careers</li>

                            <li>Contact</li>

                            <li>Privacy</li>

                            <li>Terms</li>

                        </ul>

                    </motion.div>

                    <motion.div
                        className=""
                        variants={{
                            hidden: {
                                opacity: 0,
                                y: 30,
                            },
                            visible: {
                                opacity: 1,
                                y: 0,
                            },
                        }}
                    >

                        <h4>Newsletter</h4>

                        <p>

                            Receive updates about new countries,
                            features and product launches.

                        </p>

                        <div className="newsletter">

                            <input
                                type="email"
                                placeholder="Enter your email"
                            />

                            <button>

                                Subscribe

                            </button>

                        </div>

                    </motion.div>

                </motion.div>

                <motion.div
                    className="footer-bottom"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    viewport={{ once: true }}
                >

                   <p>
  © {new Date().getFullYear()} RealSMS. All rights reserved.
</p>
                    <div>

                        Secure payments • 99.99% uptime • GDPR Ready

                    </div>

                </motion.div>

            </motion.footer>
        </div>
    );
}
