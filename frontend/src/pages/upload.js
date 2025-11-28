import React, { useState } from 'react';
import { useRouter } from 'next/router';
import Link from "next/link";
import Navbar from "../components/Layout/Navbar";
import Sidebar from "../components/Layout/Sidebar";
import StepProgressBar from "../components/Dashboard/Create, Push & Market Content/StepProgressBar";
import styles from '../styles/Contentpush/upload.module.css'; // Correct the path if necessary

function UploadImage() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar starts open by default.
  const router = useRouter();

  const handleSidebarToggle = () => {
    setIsSidebarOpen(prev => !prev);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedImage(file);
      alert(`Selected image file name is ${file.name}`);
      console.log("File selected:", file);
    }
  };

  const handlePreviewClick = () => {
    router.push('/Adformat'); // Navigate to AdFormat page instead of index
  };

  const handleNextClick = () => {
    router.push('/Preview'); // Navigate to Preview.js page when Next is clicked
  };

  const handleReload = () => {
    window.location.reload(); // This will reload the current page
};

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-200 to-purple-200 flex flex-col items-center py-6">
      <div className="w-full max-w-6xl px-6 mb-4">
        {/* Navbar */}
        <div className="navHeader">
          <Navbar toggleSidebar={handleSidebarToggle} />
        </div>
        
        {/* Layout with Sidebar */}
        <div className="main-layout flex">
          <Sidebar
            className="sidebarele"
            isOpen={isSidebarOpen}
            toggleSidebar={handleSidebarToggle}
          />
          {/* Breadcrumb Navigation */}
          <div className={`${styles.breadcrumbs} ${styles.textSm} ${styles.textGray600} ${styles.p2}`}>
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
                    <Link href="#" onClick={handleReload} style={{ textDecoration: 'none', color: 'blue', marginLeft: '0.4rem' }}>
                        UploadImage
                    </Link>
                </div>

                {/* Step Progress Bar */}
          <div className={styles.progressBarContainer}>
            <StepProgressBar />
          </div>
           
          {/* Main Container */}
          <div className={styles.mainContainer}>
          <span style={{ fontWeight: 'bold',justifySelf:'left' }}>Upload Image</span>
            <div style={{ paddingTop: "48px", paddingLeft: "2rem", paddingBottom: "2px", position: 'relative' }}>
              {/* Upload Area */}
              <div className={styles.uploadArea}>
                <div className={styles.dottedRectangle}>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={styles.fileInput}
                  />
                  <span className={styles.instructionText}>
                    Click or Drag and Drop to add a JPEG, PNG.
                  </span>
                  <span className={styles.resolutionText}>
                    Recommended resolution: 11519 x 46000 pixels.
                  </span>
                </div>
              </div>
              {/* Buttons positioned outside the dotted rectangle */}
              <div className={styles.buttonContainer}>
                <button 
                  className={styles.previewButton}
                  onClick={handlePreviewClick}
                >
                  <i className="fas fa-arrow-left mr-2"></i>← Preview
                </button>
                <button 
                  className={styles.nextButton}
                  onClick={handleNextClick}
                >
                  Next<span className={styles.nextButtonArrow}>→</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UploadImage;