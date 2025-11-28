"use client";

import React, { useState } from "react";
import Link from "next/link";
import Navbar from "../../components/Layout/Navbar";
import Sidebar from "../../components/Layout/Sidebar";
import CustomizationLeadManagement from "../../components/Dashboard/LeadAndCustomization/Customizationleadmanagement";
import SocialMediaCards from "../../components/Dashboard/LeadAndCustomization/SocialMediaCards";

const Medium = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar starts open by default.

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleReload = () => {
    window.location.reload(); // This will reload the current page
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
        {/* Main Content */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            padding: "1rem",
            overflow: "hidden",
          }}
        >
          {/* Breadcrumb Navigation */}
          <div>
            <Link href="/" style={{ textDecoration: 'none', color: 'gray' }}>Dashboard</Link>
            <span className="mx-2">{" > "}</span>
            <Link href="#" onClick={handleReload} style={{ textDecoration: 'none', color: 'blue' }}>Medium Priority Leads</Link>
          </div>

          {/* Combined Card */}
          <div
            style={{
              background: "#fff",
              borderRadius: "0.5rem",
              boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
              padding: "1.5rem",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column", // Stack elements vertically
                gap: "1.5rem", // Space between the chart and social media cards
              }}
            >
              {/* Chart Section */}
              <div style={{ flex: 1 }}>
                <CustomizationLeadManagement />
              </div>

              {/* Social Media Cards with Medium Priority Filter */}
              <div style={{ flex: 1 }}>
                <SocialMediaCards priorityFilter="Medium" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medium;
