import React, {useState} from 'react';
import { MdTrendingUp, MdClose } from 'react-icons/md';
import { DonutChart, ComparisonChart } from '../../components/Dashboard/CompitatorKeywords/DonutChart';
import styles from '../../components/Dashboard/CompitatorKeywords/DonutChart.module.css';
import SocialCard from '../../components/Dashboard/CompitatorKeywords/SocialCard';
import GenhashContainer from '../../components/Dashboard/CompitatorKeywords/Genhash/GenhashContainer';
import Navbar from "../../components/Layout/Navbar";
import Sidebar from "../../components/Layout/Sidebar";
import Link from 'next/link';

export default function Home() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    const handleSidebarToggle = () => {
      setIsSidebarOpen(!isSidebarOpen);
    };
  return (
    <div className={styles.dashboardContainer}>
       {/* Navbar */}
    <div className="navHeader">
      <Navbar toggleSidebar={handleSidebarToggle} />
    </div>

    {/* Layout with Sidebar and CampaignPerformanceCard */}
    <div className="main-layout">
      <Sidebar
        className="sidebarele"
        isOpen={isSidebarOpen}
        toggleSidebar={handleSidebarToggle}
      />
      <div className={styles.card}>
        <nav className={styles.navbar}>
          <div className={styles.navContent}>
            <h2 className={styles.navTitle}>
              <MdTrendingUp className={styles.navIcon} />
              Your Competitor Keywords,Trends
            </h2>
            {/* */}
            <Link href="/" className={styles.closeIcon}><MdClose/></Link>
          </div>
        </nav>
        <div className={styles.chartsWrapper}>
          <div className={styles.barSection}>
            <ComparisonChart />
          </div>
          <div className={styles.donutSection}>
            <DonutChart />
            
          </div>
          
        </div>

        <h2 className={styles.navTitle}>
          <MdTrendingUp className={styles.navIcon} />Industry Trends</h2>
        <hr></hr>
        <SocialCard />
        <GenhashContainer />
      </div>
     </div>
    </div>
  );
}