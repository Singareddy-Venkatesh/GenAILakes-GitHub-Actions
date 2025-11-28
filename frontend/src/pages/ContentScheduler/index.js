import React, { useState } from 'react';
import Graphs from '../../components/Dashboard/ContentScheduler/Content/Graphs';
import DragandDrop from '../../components/Dashboard/ContentScheduler/Content/DragandDrop';
import Navbar from '../../components/Layout/Navbar';
import Sidebar from '../../components/Layout/Sidebar';
import Link from 'next/link';
import styles from './ContentScheduler.module.css';
import { Badge } from 'antd';
import dynamic from 'next/dynamic';

// Use dynamic import for components that might cause SSR issues
const Calendar = dynamic(() => import('../../components/Dashboard/ContentScheduler/Content/Calendar'), { ssr: false });
export default function ContentScheduler() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
   
  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleReload = () => {
    window.location.reload();
  };

  return (
    <div className={styles.container}>
      <div className={styles.navHeader}>
        <Navbar toggleSidebar={handleSidebarToggle} />
      </div>
      <div className={styles.breadcrumb}>
            <Link href="/">Dashboard</Link>
            <span className={styles.separator}> {'>'} </span>
            <Link href="#" onClick={handleReload}>Content Scheduler</Link>
          </div>
      <div className={styles.mainLayout}>
        <Sidebar
          className={styles.sidebarElement}
          isOpen={isSidebarOpen}
          toggleSidebar={handleSidebarToggle}
        />
       
        <div className={styles.content}>
          <div className={styles.graphSection}>
            <Graphs />
          </div>
         
          <div className={styles.contentGrid}>
            <div className={styles.calendarSection}>
              <Calendar />
            </div>
            <div className={styles.dragDropSection}>
              <DragandDrop />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
