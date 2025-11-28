import React, { useState } from 'react'; // Import useState
import Link from 'next/link';
import Navbar from "../components/Layout/Navbar";
import Sidebar from "../components/Layout/Sidebar";
import StepProgressBar from "../components/Dashboard/Create, Push & Market Content/StepProgressBar";
import styles from '../styles/Contentpush/Preview.module.css'; // Importing the CSS module

const Home = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar starts open by default.

  // Toggle the sidebar's open/close state
  const handleSidebarToggle = () => {
    setIsSidebarOpen(prevState => !prevState);
  };

  const handleReload = () => {
    window.location.reload(); // This will reload the current page
};

  return (
    <div className={styles.page}>
      {/* Navbar */}
      <div className="navHeader">
        <Navbar toggleSidebar={handleSidebarToggle} />
      </div>
      {/* Layout with Sidebar */}
      <div className="main-layout">
        <Sidebar
          className="sidebarele"
          isOpen={isSidebarOpen}
          toggleSidebar={handleSidebarToggle}
        />
        {/* Breadcrumb Navigation */}
        <div className={`${styles.breadcrumbs} ${styles.textSm} ${styles.textGray600} ${styles.p5}`}>
                    <Link href="/" style={{ textDecoration: 'none', color: '#28292c', marginRight: '0.4rem' }}>
                        Dashboard
                    </Link>
                    <span className="mx-2">{">"}</span>
                    <Link href="/Contentpush" style={{ textDecoration: 'none', color: '#28292c', marginLeft: '0.2rem', marginRight: '0.3rem' }}>
                        Create, Push & Market Content
                    </Link>
                    <span className="mx-2">{">"}</span>
                    <Link href="/Details" style={{ textDecoration: 'none', color: '#28292c', marginLeft: '0.4rem', marginRight: '0.3rem' }}>
                        Details
                    </Link>
                    <span className="mx-2">{">"}</span>
                    <Link href="/Adformat" style={{ textDecoration: 'none', color: '#28292c', marginLeft: '0.4rem', marginRight: '0.3rem' }}>
                        Adformat
                    </Link>
                    <span className="mx-2">{">"}</span>
                    <Link href="/upload" style={{ textDecoration: 'none', color: '#28292c', marginLeft: '0.4rem' , marginRight: '0.3rem'}}>
                        UploadImage
                    </Link>
                    <span className="mx-2">{">"}</span>
                    <Link href="#" onClick={handleReload} style={{ textDecoration: 'none', color: 'blue', marginLeft: '0.4rem' }}>
                        Preview & Launch
                    </Link>
                </div>

                {/* Step Progress Bar */}
          <div className={styles.progressBarContainer}>
            <StepProgressBar />
          </div>

        {/* Container */}
        <div className={styles.container}>
          {/* Top Card Section */}
          <div className={styles.card}>
            <h1 className={styles.heading}>Take your website to the next level</h1>
            <button className={styles.button}>Get Started</button>
          </div>

          {/* Bottom Image Section */}
          <div className={styles.imageContainer}>
            <img
              src="https://via.placeholder.com/400x200"
              alt="Futuristic Robot"
              className={styles.image}
            />
          </div>
        </div>
      </div>

      {/* Footer Buttons at Bottom Right */}
      <div className={styles.footerButtons}>
        <Link href="/upload" passHref>
          <button className={styles.footerButton}>← Preview</button>
        </Link>
        <button className={styles.footerButton}>💾 Save</button>
        <button className={styles.submitButton}>Submit ✅</button>
      </div>
    </div>
  );
}

export default Home;