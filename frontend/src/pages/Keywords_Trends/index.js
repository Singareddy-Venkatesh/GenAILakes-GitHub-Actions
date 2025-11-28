import React, { useState } from 'react';
import styles from './Keywords_Trends.module.css';
import DashboardCard from '../../components/Dashboard/YourKeywords/DashboardCard';
import { FaRegThumbsUp } from 'react-icons/fa';
import SocialCard from '../../components/Dashboard/YourKeywords/SocialCard';
import GenhashContainer from '../../components/Dashboard/YourKeywords/Genhash/GenhashContainer';
import Navbar from "../../components/Layout/Navbar";
import Sidebar from "../../components/Layout/Sidebar";
import { AnalysisProvider } from '../../components/Dashboard/YourKeywords/context/AnalysisContext';
import Link from 'next/link';
const App = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const handleReload = () => {
    window.location.reload();
};

  const platforms = [];
  return (
    <div className={styles.keywordsTrendsWrapper} style={{ backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
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
      
      <AnalysisProvider>
      <div className="flex flex-col min-h-screen overflow-hidden" style={{ background: 'linear-gradient(to right, #D3D4FE, #BBC7FD, #A9C0FB, #AAC3FA)', minHeight: '100vh', width: '1170px', margin: 0, padding: '10px' }}>
        <div className="flex-grow p-4 md:p-8 max-w-7xl mx-auto w-full">
        <div className={`${styles.breadcrumbs} ${styles.textSm} ${styles.textGray600} ${styles.p4}`}>
            <Link href="/" style={{ textDecoration: 'none', color: 'gray' }}>Dashboard</Link>
            <span className="mx-2">{" > "}</span>
            <Link href="#" onClick={handleReload} style={{ textDecoration: 'none', color: 'blue' }}>Social media inbox</Link>
        </div>
          <DashboardCard platforms={platforms} />
          <div className="mt-8 mb-4">
            <h2 className="text-lg font-semibold flex items-center gap-4 mb-4" style={{ color: '#3A29FA', fontFamily: 'Inter, sans-serif' }}>
              <FaRegThumbsUp className="text-[#3A29FA] text-xl flex-shrink-0" />
              <span className="flex-shrink-0">Social Media Platforms</span>
              <hr style={{ borderColor: '#8C82FF' }} className="flex-grow border-t-2" />
            </h2>
            <div className="w-full">
              <SocialCard />
              <GenhashContainer />
            </div>
          </div>
        </div>
      </div>
    </AnalysisProvider>
          </div>
        </div>
  );};

export default App;