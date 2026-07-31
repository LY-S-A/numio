import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import AnnouncementModal from "../components/AnnouncementModal";
import StatCard from "../components/StatCard";
import NumbersTable from "../components/NumbersTable";
import SmsPanel from "../components/SmsPanel";
import FooterStats from "../components/FooterStats";

import {
    FaMobileAlt,
    FaCommentDots,
    FaChartLine,
    FaClipboardList,
    FaHeadset,
} from "react-icons/fa";

import "../styles/dashboard.css";


const Dashboard = () => {

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    const [stats, setStats] = useState({
        totalTransactions: 0,
        smsReceived: 0,
        totalSpent: 0,
        totalOrders: 0,
    });



    useEffect(() => {

        document.title = "Dashboard - Numio";


        const fetchStats = async () => {

            try {

                const API = process.env.REACT_APP_API_URL;


                const response = await axios.get(
                    `${API}/api/activity/stats`,
                    {
                        headers: {
                            Authorization:
                                `Bearer ${localStorage.getItem("token")}`,
                        },
                    }
                );


                setStats(response.data.stats);


            } catch (error) {

                console.error(
                    "Dashboard stats error:",
                    error
                );

            } finally {

                setLoading(false);

            }

        };


        fetchStats();


    }, []);



    return (
         <>

        <AnnouncementModal />

        <div className="dashboard">


            <div className="stats-grid">


                {
                loading ? (
                    <>
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                        <SkeletonCard />
                    </>
                )
                :
                (
                    <>
                        <StatCard
                            icon={<FaMobileAlt />}
                            title="Total Transactions"
                            value={stats.totalTransactions}
                            color="purple"
                        />


                        <StatCard
                            icon={<FaCommentDots />}
                            title="SMS Received"
                            value={stats.smsReceived}
                            color="green"
                        />


                        <StatCard
                            icon={<FaChartLine />}
                            title="Total Spent"
                            value={`₦${Number(stats.totalSpent).toLocaleString("en-US", {
                                minimumFractionDigits: 2,
                            })}`}
                            color="orange"
                        />


                        <StatCard
                            icon={<FaClipboardList />}
                            title="Total Orders"
                            value={stats.totalOrders}
                            color="blue"
                        />

                    </>
                )

                }


            </div>



            <div className="content-grid">

                <NumbersTable />

                <SmsPanel />

            </div>



            <FooterStats />


        </div>
                     </div>


        {/* FLOATING SUPPORT BUTTON */}
        <button
            className="floating-support"
            onClick={() => navigate("/support")}
            aria-label="Open support"
        >
            <FaHeadset />

            <span>
                Support
            </span>
        </button>


        </>
        </>

    );

};



const SkeletonCard = () => {

    return (

        <div className="stat-card skeleton-card">

            <div className="skeleton-icon"></div>

            <div className="skeleton-content">

                <div className="skeleton-title"></div>

                <div className="skeleton-value"></div>

            </div>

        </div>

    );

};



export default Dashboard;
