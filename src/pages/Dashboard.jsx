// import React, { useEffect, useState } from "react";
// import axios from "axios";

// import StatCard from "../components/StatCard";
// import NumbersTable from "../components/NumbersTable";
// import SmsPanel from "../components/SmsPanel";
// import FooterStats from "../components/FooterStats";

// import {
//     FaMobileAlt,
//     FaCommentDots,
//     FaChartLine,
//     FaClipboardList,
// } from "react-icons/fa";

// import "../styles/dashboard.css";


// const Dashboard = () => {

//     const [stats, setStats] = useState({
//         totalTransactions: 0,
//         smsReceived: 0,
//         totalSpent: 0,
//         totalOrders: 0,
//     });


//     useEffect(() => {

//         document.title = "Dashboard - Numio";


//         const fetchStats = async () => {

//             try {

//                 const API = process.env.REACT_APP_API_URL;


//                 const response = await axios.get(
//                     `${API}/api/activity/stats`,
//                     {
//                         headers: {
//                             Authorization:
//                                 `Bearer ${localStorage.getItem("token")}`,
//                         },
//                     }
//                 );


//                 setStats(response.data.stats);


//             } catch (error) {

//                 console.error(
//                     "Dashboard stats error:",
//                     error
//                 );

//             }

//         };


//         fetchStats();


//     }, []);



//     return (

//         <div className="dashboard">


//             <div className="stats-grid">


//               <StatCard
//     icon={<FaMobileAlt />}
//     title="Total Transactions"
//     value={stats.totalTransactions}
//     color="purple"
// />


//                 <StatCard
//                     icon={<FaCommentDots />}
//                     title="SMS Received"
//                     value={stats.smsReceived}
//                     color="green"
//                 />


//                 <StatCard
//                     icon={<FaChartLine />}
//                     title="Total Spent"
//                     value={`₦${Number(stats.totalSpent).toLocaleString("en-US", {
//                         minimumFractionDigits: 2,
//                     })}`}
//                     color="orange"
//                 />


//                 <StatCard
//                     icon={<FaClipboardList />}
//                     title="Total Orders"
//                     value={stats.totalOrders}
//                     color="blue"
//                 />


//             </div>



//             <div className="content-grid">

//                 <NumbersTable />

//                 <SmsPanel />

//             </div>



//             <FooterStats />


//         </div>

//     );

// };


// export default Dashboard;

import React, { useEffect, useState } from "react";
import axios from "axios";

import StatCard from "../components/StatCard";
import NumbersTable from "../components/NumbersTable";
import SmsPanel from "../components/SmsPanel";
import FooterStats from "../components/FooterStats";

import {
    FaMobileAlt,
    FaCommentDots,
    FaChartLine,
    FaClipboardList,
} from "react-icons/fa";

import "../styles/dashboard.css";


const Dashboard = () => {

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
