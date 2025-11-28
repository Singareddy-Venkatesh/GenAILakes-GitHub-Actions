import React, { useState } from 'react';
import CampaignPerformanceCard from '../../components/Dashboard/Campaign Management & Performance Card/campaignperformance';
import Navbar from "../../components/Layout/Navbar";
import Sidebar from "../../components/Layout/Sidebar";
export default function CampaignPerformancePage() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return ( 
    <div className="container">
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
        <div className="campaign-performance-content">
          <CampaignPerformanceCard />
        </div>
      </div>
    </div>
  );
}
