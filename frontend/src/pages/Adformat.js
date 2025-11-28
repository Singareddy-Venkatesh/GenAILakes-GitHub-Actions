import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "../styles/format.module.css"; // Importing the CSS module
import Navbar from "../components/Layout/Navbar";
import Sidebar from "../components/Layout/Sidebar";
import StepProgressBar from "../components/Dashboard/Create, Push & Market Content/StepProgressBar";

export default function Home() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const handleSidebarToggle = () => {
        setIsSidebarOpen((prev) => !prev);
    };

    // State variables
    const [selectedAlignment, setSelectedAlignment] = useState("left");
    const [isBold, setIsBold] = useState(false);
    const [isItalic, setIsItalic] = useState(false);
    const [isUnderline, setIsUnderline] = useState(false);
    const [uploadedImage, setUploadedImage] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [selectedColor, setSelectedColor] = useState("#FFFFFF");
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [videoList, setVideoList] = useState([]);
    const [videoPreview, setVideoPreview] = useState(null);
    const [outputDuration, setOutputDuration] = useState("00:00:00:00");
    const [selectedHeading, setSelectedHeading] = useState('Normal text');

    // Video bitrate and quality state variables
    const [mp4Bitrate, setMp4Bitrate] = useState(8000);
    const [h264Quality, setH264Quality] = useState(50);
    const [x265Quality, setX265Quality] = useState(50);
    const [aacBitrate, setAacBitrate] = useState(128);

    // Function to handle template selection
    const selectTemplate = (templateName) => {
        setSelectedTemplate(templateName);
        if (templateName !== "Video Reels - 2") {
            setVideoList([]);
            setVideoPreview(null);
        }
    };

    // Get selected alignment icon
    const getAlignmentIcon = () => {
        switch (selectedAlignment) {
            case "left":
                return <LeftIcon />;
            case "center":
                return <CenterIcon />;
            case "right":
                return <RightIcon />;
            case "justify":
                return <JustifyIcon />;
            default:
                return null;
        }
    };

    // Image upload handler
    const handleImageChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setUploadedImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    // Video upload handler
    const handleVideoChange = (event) => {
        const files = Array.from(event.target.files);
        const newVideos = files.map((file) => ({
            file,
            preview: URL.createObjectURL(file),
        }));
        setVideoList((prev) => [...prev, ...newVideos]);
        if (videoPreview === null && newVideos.length > 0) {
            setVideoPreview(newVideos[0].preview);
        }
    };

    // Alignment handlers
    const handleAlignmentChange = (alignment) => {
        setSelectedAlignment(alignment);
        setIsDropdownOpen(false);
    };

    const toggleDropdown = () => {
        setIsDropdownOpen((prev) => !prev);
    };
      // Thumbnail click handler
      const handleThumbnailClick = (video) => {
          if (video && video.preview) {
              setVideoPreview(video.preview);
              // Optional: Add loading state if needed
              const videoElement = document.querySelector('video');
              if (videoElement) {
                  videoElement.load(); // Force video reload
              }
          }
      };
    // Video removal handler
    const handleVideoRemove = (index) => {
        const updatedVideoList = videoList.filter((_, i) => i !== index);
        setVideoList(updatedVideoList);
        if (videoPreview && updatedVideoList.length === 0) {
            setVideoPreview(null);
        } else if (videoPreview && index === videoList.findIndex(v => v.preview === videoPreview)) {
            setVideoPreview(updatedVideoList.length > 0 ? updatedVideoList[0].preview : null);
        }
    };

    useEffect(() => {
        return () => {
            videoList.forEach(video => URL.revokeObjectURL(video.preview));
        };
    }, [videoList]);
    
    const handleReload = () => {
        // Existing state resets
        setSelectedAlignment("left");
        setIsBold(false);
        setIsItalic(false);
        setIsUnderline(false);
        setUploadedImage(null);
        setSelectedTemplate(null);
        setSelectedColor("#FFFFFF");
        setIsDropdownOpen(false);
        setVideoList([]);
        setVideoPreview(null);
        setOutputDuration("00:00:00:00");
        setSelectedHeading('Normal text');
        setMp4Bitrate(8000);
        setH264Quality(50);
        setX265Quality(50);
        setAacBitrate(128);
        
        // Force a re-render if needed
        window.location.reload();
    };
    return (
        <div className="container">
            {/* Navbar */}
            <div className="navHeader">
                <Navbar toggleSidebar={handleSidebarToggle} />
            </div>

            {/* Layout with Sidebar and Card Container */}
            <div className="main-layout flex">
                {/* Sidebar on the left */}
                <div className="w-64 fixed left-0 top-0 bottom-0 z-20">
                    <Sidebar isOpen={isSidebarOpen} toggleSidebar={handleSidebarToggle} />
                </div>
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
                    <Link 
                       href="#" 
                       onClick={(e) => {e.preventDefault();handleReload();}} style={{ textDecoration: 'none', color: 'blue', marginLeft: '0.4rem', background: 'none', border: 'none', padding: 0 }}>                     
                       Adformat
                     </Link>
                </div>

                {/* Step Progress Bar */}
                <div className={styles.progressBarContainer}>
                    <StepProgressBar />
                </div>

                {/* Card Container next to the Sidebar */}
                <div className="flex-1 pt-2 ml-64"> {/* Adjusted to align with the sidebar */}
                    <div className={`${styles.cardContainer} ${styles.transparentCard}`}>
                        <div className="w-full max-w-6xl px-6 mb-4">
                            {/* Header */}
                            <div className={styles.header}>
                                <h1 className={styles.headerTitle}>Select Format</h1>
                                <p className={styles.headerText}>
                                    Based on the billboards you've selected, the following ad formats are available for your ad campaign.
                                </p>
                            </div>

                            {/* Template Selection */}
                            <div className={styles.flexContainer}>
                                <div className={styles.templateContainer}>
                                    {["Template - 1", "Video Reels - 2", "Video Reels - 3", "Template - 4", "Template - 5"].map((template) => (
                                        <div
                                            key={template}
                                            className={`${styles.templateCard} ${selectedTemplate === template ? styles.selectedTemplateCard : styles.unselectedTemplateCard}`}
                                            onClick={() => selectTemplate(template)}
                                        >
                                            <div className={styles.templatePreview}></div>
                                            <p className={styles.templateText}>{template}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Template Details for selected templates */}
                                {selectedTemplate === "Template - 1" && (
                                    <TemplateDetails
                                        uploadedImage={uploadedImage}
                                        handleImageChange={handleImageChange}
                                        selectedAlignment={selectedAlignment}
                                        isBold={isBold}
                                        setIsBold={setIsBold}
                                        isItalic={isItalic}
                                        setIsItalic={setIsItalic}
                                        isUnderline={isUnderline}
                                        setIsUnderline={setIsUnderline}
                                        selectedColor={selectedColor}
                                        handleColorChange={(e) => setSelectedColor(e.target.value)}
                                        selectedHeading={selectedHeading}
                                        setSelectedHeading={setSelectedHeading}
                                        getAlignmentIcon={getAlignmentIcon}
                                        isDropdownOpen={isDropdownOpen}
                                        toggleDropdown={toggleDropdown}
                                        handleAlignmentChange={handleAlignmentChange}
                                    />
                                )}

                                {selectedTemplate === "Video Reels - 2" && (
                                    <VideoReelDetails
                                        videoList={videoList}
                                        handleVideoChange={handleVideoChange}
                                        videoPreview={videoPreview}
                                        handleVideoRemove={handleVideoRemove}
                                        outputDuration={outputDuration}
                                        mp4Bitrate={mp4Bitrate}
                                        setMp4Bitrate={setMp4Bitrate}
                                        h264Quality={h264Quality}
                                        setH264Quality={setH264Quality}
                                        x265Quality={x265Quality}
                                        setX265Quality={setX265Quality}
                                        aacBitrate={aacBitrate}
                                        setAacBitrate={setAacBitrate}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Template Details Component
const TemplateDetails = ({
    uploadedImage,
    handleImageChange,
    selectedAlignment,
    isBold,
    setIsBold,
    isItalic,
    setIsItalic,
    isUnderline,
    setIsUnderline,
    selectedColor,
    handleColorChange,
    selectedHeading,
    setSelectedHeading,
    getAlignmentIcon,
    isDropdownOpen,
    toggleDropdown,
    handleAlignmentChange
}) => {
    return (
        <div className={styles.templateDetails}>
            <div className={styles.templateHeader}>
                <select className={styles.select} value={selectedHeading} onChange={(e) => setSelectedHeading(e.target.value)}>
                    <option value="Normal text">Normal text</option>
                    <option value="Heading 1">Heading 1</option>
                    <option value="Heading 2">Heading 2</option>
                    <option value="Heading 3">Heading 3</option>
                </select>

                <div className={styles.formatButtons}>
                    <div className={styles.relative}>
                        <button onClick={toggleDropdown} className={styles.alignmentButton}>
                            {getAlignmentIcon()} 
                        </button>
                        {isDropdownOpen && (
                            <div className={styles.dropdown}>
                                <div className={styles.dropdownContent}>
                                    {[
                                        { value: "left", label: "Left", icon: <LeftIcon /> },
                                        { value: "center", label: "Center", icon: <CenterIcon /> },
                                        { value: "right", label: "Right", icon: <RightIcon /> },
                                        { value: "justify", label: "Justify", icon: <JustifyIcon /> },
                                    ].map((option) => (
                                        <div
                                            key={option.value}
                                            className={`${styles.dropdownItem} ${selectedAlignment === option.value ? styles.dropdownItemSelected : ""}`}
                                            onClick={() => handleAlignmentChange(option.value)}
                                        >
                                            {option.icon}
                                            <span className={styles.dropdownLabel}>{option.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    <button className={`${styles.toolbarButton} ${isBold ? styles.active : ""}`} onClick={() => setIsBold((prev) => !prev)}>B</button>
                    <button className={`${styles.toolbarButton} ${isItalic ? styles.active : ""}`} onClick={() => setIsItalic((prev) => !prev)}>I</button>
                    <button className={`${styles.toolbarButton} ${isUnderline ? styles.active : ""}`} onClick={() => setIsUnderline((prev) => !prev)}>U</button>
                    <input type="color" value={selectedColor} onChange={handleColorChange} className={styles.colorInput} />
                </div>
            </div>

            <div 
                className={`${styles.previewContainer} ${selectedAlignment} ${isBold ? styles.bold : ""} ${isItalic ? styles.italic : ""} ${isUnderline ? styles.underline : ""}`} 
                style={{ color: selectedColor }}
            >
                <div>
                    <h2 className={`${styles.previewHeading} ${getHeadingClass(selectedHeading)}`}>
                        Take your website to the <br /> next level
                    </h2>
                    <button className={styles.getStartedButton}>Get Started</button>
                </div>
                
                <div className={styles.imageContainer}>
                    {uploadedImage ? (
                        <img src={uploadedImage} alt="Uploaded Preview" className={styles.uploadedImage} />
                    ) : (
                        <div className={styles.emptyImageContainer}>
                            <p className={styles.emptyImageText}>No image uploaded yet.</p>
                        </div>
                    )}
                    <div className={styles.uploadButtonContainer}>
                        <input type="file" accept="image/*" className={styles.fileInput} onChange={handleImageChange} id="file-upload" />
                        <label htmlFor="file-upload" className={styles.uploadLabel}>
                            <i className="fas fa-cloud-upload-alt mr-2 text-black opacity-90"></i>
                            Upload Image
                        </label>
                    </div>
                </div>
            </div>

            <div className={styles.actionButtons}>
                <Link href="/Details">
                    <button className={styles.previewButton}><i className="fas fa-arrow-left mr-2"></i>← Preview</button>
                </Link>
                <Link href="/upload">
                    <button className={styles.nextButton}> Next<span className={styles.nextButtonArrow}>→</span></button>
                </Link>
            </div>
        </div>
    );
};

// Video Reel Details Component
const VideoReelDetails = ({
    videoList,
    handleVideoChange,
    videoPreview,
    handleVideoRemove,
    outputDuration,
    mp4Bitrate,
    setMp4Bitrate,
    h264Quality,
    setH264Quality,
    x265Quality,
    setX265Quality,
    aacBitrate,
    setAacBitrate,
}) => {
    return (
        <div className={styles.templateDetails}>
            <div className={styles.flex}>
                <div className={styles.videoListContainer}>
                    {videoList.map((video, index) => (
                        <div key={index} className={styles.videoItem}>
                            <div 
                                className={styles.videoThumbnail}
                                onClick={() => handleThumbnailClick(video)}
                            >
                                <div className={styles.videoName}>{video.file.name}</div>
                            </div>
                            <button 
                                className={styles.removeButton}
                                onClick={() => handleVideoRemove(index)}
                            >
                                ×
                            </button>
                        </div>
                    ))}
                    <div className={styles.uploadVideoContainer}>
                        <input
                            type="file"
                            accept="video/*"
                            multiple
                            className={styles.fileInput}
                            onChange={handleVideoChange}
                            id="video-upload"
                        />
                        <label
                            htmlFor="video-upload"
                            className={styles.uploadVideoLabel}
                        >
                            <i className="fas fa-file-upload mr-2"></i>
                            Upload Video
                        </label>
                    </div>
                </div>

                <div className={styles.videoPreviewContainer}>
                    <div className={styles.videoPreview}>
                        {videoPreview ? (
                            <video controls className={styles.videoElement}>
                                <source src={videoPreview} type="video/mp4" />
                                Your browser does not support the video tag.
                            </video>
                        ) : (
                            <div className={styles.noVideoText}>Video Preview Screen</div>
                        )}
                    </div>

                    <div className={styles.outputDuration}>
                        <span className={styles.outputLabel}>Output Duration:</span>
                        <span className={styles.outputValue}>{outputDuration}</span>
                    </div>

                    {/* Output Bitrate Controls */}
                    <div className={styles.outputControls}>
                        <label className={styles.outputLabel}>MP4 Bitrate:</label>
                        <input
                            type="range"
                            min="1000"
                            max="10000"
                            value={mp4Bitrate}
                            onChange={(e) => setMp4Bitrate(e.target.value)}
                            className={styles.rangeInput}
                        />
                        <div className={styles.rangeText}>
                            <span>{mp4Bitrate} kbps</span>
                            <span>Max: 10000 kbps</span>
                        </div>
                    </div>

                    <div className={styles.outputControls}>
                        <label className={styles.outputLabel}>H264 Quality:</label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={h264Quality}
                            onChange={(e) => setH264Quality(e.target.value)}
                            className={styles.rangeInput}
                        />
                        <div className={styles.rangeText}>
                            <span>{h264Quality}</span>
                            <span>x265</span>
                        </div>
                    </div>

                    <div className={styles.outputControls}>
                        <label className={styles.outputLabel}>x265 Quality:</label>
                        <input
                            type="range"
                            min="0"
                            max="100"
                            value={x265Quality}
                            onChange={(e) => setX265Quality(e.target.value)}
                            className={styles.rangeInput}
                        />
                        <div className={styles.rangeText}>
                            <span>{x265Quality}</span>
                            <span>x265</span>
                        </div>
                    </div>

                    <div className={styles.outputControls}>
                        <label className={styles.outputLabel}>AAC Bitrate:</label>
                        <input
                            type="range"
                            min="64"
                            max="320"
                            value={aacBitrate}
                            onChange={(e) => setAacBitrate(e.target.value)}
                            className={styles.rangeInput}
                        />
                        <div className={styles.rangeText}>
                            <span>{aacBitrate} kbps</span>
                            <span>Max: 320 kbps</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.actionButtons}>
                <Link href="/Details">
                    <button className={styles.previewButton}><i className="fas fa-arrow-left mr-2"></i> Preview</button>
                </Link>
                <Link href="/upload">
                    <button className={styles.nextButton}>Next <i className="fas fa-arrow-right ml-2"></i></button>
                </Link>
            </div>
        </div>
    );
};

// Utility function to determine heading class
const getHeadingClass = (heading) => {
    switch (heading) {
        case 'Heading 1':
            return styles.heading1; // Make sure these styles are defined in format.module.css
        case 'Heading 2':
            return styles.heading2; // Make sure these styles are defined in format.module.css
        case 'Heading 3':
            return styles.heading3; // Make sure these styles are defined in format.module.css
        default:
            return styles.normalText; // Make sure this style is defined in format.module.css
    }
};

// Alignment icons
const LeftIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const CenterIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 12h16" />
    </svg>
);

const RightIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 6H4M20 12H4M20 18H4" />
    </svg>
);

const JustifyIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);