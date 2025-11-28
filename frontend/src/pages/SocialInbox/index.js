import React, { useState } from 'react';
import DashboardCard from '../../components/Dashboard/SocialMediaInbox/DashboardCard';
import Navbar from "../../components/Layout/Navbar";
import Sidebar from "../../components/Layout/Sidebar";
import Link from 'next/link';
import styles from '../../styles/SocialInbox/index.module.css';


const SocialInbox = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   
    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };
    
    const handleReload = () => {
        window.location.reload();
    };
 
    return (
        <div className="container">
            <div className="navHeader">
                <Navbar toggleSidebar={handleSidebarToggle} />
            </div>
 
            <div className="main-layout">
                <Sidebar
                    className="sidebarele"
                    isOpen={isSidebarOpen}
                    toggleSidebar={handleSidebarToggle}
                />
                
                <div className="SocialInbox">
                    <div className={`${styles.breadcrumbs} ${styles.textSm} ${styles.textGray600} ${styles.p4}`}>
                        <Link href="/" style={{ textDecoration: 'none', color: 'gray' }}>Dashboard</Link>
                        <span className="mx-2">{"  >  "}</span>
                        <Link href="#" onClick={handleReload} style={{ textDecoration: 'none', color: 'blue' }}>Social media inbox</Link>
                    </div>
                    <DashboardCard />
                </div>
            </div>
        </div>
    );
}

export default SocialInbox;
