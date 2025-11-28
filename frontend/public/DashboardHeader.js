import React from "react";
import { FaChartBar, FaStar, FaComments, FaClipboardList, FaTh } from "react-icons/fa";
import styles from "./DashboardHeader.module.css"; // Import the CSS module
import Link from "next/link"; // Import Link from Next.js

const DashboardHeader = ({ onWidgetClick }) => {
  return (
    <header className={styles.header}>
      {/* First Row */}
      <div className={styles.firstRow}>
        <h1 className={styles.title}>Dashboard</h1>
        {/* Wrap the New Post button with Link to navigate to /Details */}
        <Link href="/Details">
          <button className={styles.primaryButton}>+ New Post</button>
        </Link>
      </div>
      {/* Second Row */}
      <div className={styles.secondRow}>
        {/* Left-aligned buttons */}
        <div className={styles.leftButtons}>
          <button className={styles.secondaryButton}>
            <FaChartBar />
            Company Structure
          </button>
          <button className={styles.secondaryButton}>
            <FaStar />
            Rating
          </button>
        </div>
        {/* Right-aligned buttons */}
        <div className={styles.rightButtons}>
          {/* Messenger button with Link */}
          <Link href="../Engagement_Feed">
            <button className={styles.secondaryButton}>
              <FaComments />
              Messenger
            </button>
          </Link>
          <button className={styles.secondaryButton}>
            <FaClipboardList />
            Feed
          </button>
          <button className={styles.secondaryButton} onClick={onWidgetClick}>
            <FaTh />
            Widget
          </button>
        </div>
      </div>
    </header>
  );
};
export default DashboardHeader;