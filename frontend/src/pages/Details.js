import { useRouter } from 'next/router';
import { useState } from 'react';
import {
  FaLinkedin,
  FaFacebook,
  FaTwitter,
  FaInstagram,
  FaYoutube,
} from 'react-icons/fa';
import Link from 'next/link';
import styles from '../styles/detail.module.css';
import Navbar from '../components/Layout/Navbar';
import Sidebar from '../components/Layout/Sidebar';
import StepProgressBar from '../components/Dashboard/Create, Push & Market Content/StepProgressBar';

export default function Home() {
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true); // Sidebar starts open by default.

  const [socialMediaTags, setSocialMediaTags] = useState([
    { name: 'Linkedin', icon: <FaLinkedin className={styles.socialIcon} /> },
    { name: 'Facebook', icon: <FaFacebook className={styles.socialIcon} /> },
    { name: 'Twitter', icon: <FaTwitter className={styles.socialIcon} /> },
    { name: 'Instagram', icon: <FaInstagram className={styles.socialIcon} /> },
    { name: 'YouTube', icon: <FaYoutube className={styles.socialIcon} /> },
  ]);

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleTagRemove = (tagName) => {
    setSocialMediaTags((prevTags) =>
      prevTags.filter((tag) => tag.name !== tagName)
    );
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

      {/* Layout with Sidebar */}
      <div className="main-layout">
        <Sidebar
          className="sidebarele"
          isOpen={isSidebarOpen}
          toggleSidebar={handleSidebarToggle}
        />

        {/* Breadcrumb Navigation */}
        <div
          className={`${styles.breadcrumbs} ${styles.textSm} ${styles.textGray600} ${styles.p2}`}
        >
          <Link
            href="/"
            style={{
              textDecoration: 'none',
              color: '#28292c',
              marginRight: '0.4rem',
            }}
          >
            Dashboard
          </Link>
          <span className="mx-2">{'>'}</span>
          <Link
            href="/Contentpush"
            style={{
              textDecoration: 'none',
              color: '#28292c',
              marginLeft: '0.2rem',
              marginRight: '0.3rem',
            }}
          >
            Create, Push & Market Content
          </Link>
          <span className="mx-2">{'>'}</span>
          <Link
            href="#"
            onClick={handleReload}
            style={{
              textDecoration: 'none',
              color: 'blue',
              marginLeft: '0.4rem',
            }}
          >
            Details
          </Link>
        </div>

        {/* Step Progress Bar */}
        <div className={styles.progressBarContainer}>
          <StepProgressBar />
        </div>

        {/* Card Container */}
        <div
          className={`${styles.cardContainer} ${styles.StepProgressBar} ${styles.transparentCard}`}
        >
          <div className={styles.formGrid}>
            {/* Left Column */}
            <div>
              <label htmlFor="campaignName" className={styles.label}>
                Content Name<span className={styles.requiredMarker}>*</span>
              </label>
              <input
                type="text"
                id="campaignName"
                placeholder="Enter Campaign Name"
                className={styles.input}
              />
            </div>

            {/* Right Column */}
            <div>
              <label htmlFor="contentCategory" className={styles.label}>
                Content Category<span className={styles.requiredMarker}>*</span>
              </label>
              <select id="contentCategory" className={styles.contentselect}>
                <option>Select Category</option>
                <option>project-1</option>
                <option>project-2</option>
                <option>project-3</option>
              </select>
            </div>
          </div>

          {/* Text and Post to Section */}
          <div className={styles.contentSection}>
            {/* Textarea */}
            <div className={styles.textAreaContainer}>
              <label htmlFor="textContent" className={styles.label}>
                Text
              </label>
              <textarea
                id="textContent"
                placeholder="Enter your text and links...."
                rows={6}
                className={styles.textarea}
              ></textarea>
            </div>
            {/* Post to Section */}
            <div className={styles.postToContainer}>
              <label className={styles.label}>Post to</label>
              <div className={styles.socialMediaTags}>
                {socialMediaTags.map((tag) => (
                  <span
                    key={tag.name}
                    className={`${styles.socialTag} ${styles[tag.name.toLowerCase()]}`}
                  >
                    {tag.icon} {tag.name}
                    <button
                      className={styles.removeTagButton}
                      onClick={() => handleTagRemove(tag.name)}
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Buttons Section */}
          <div className={styles.buttonSection}>
            <button
              className={styles.cancelButton}
              onClick={() => router.push('/Contentpush')}
            >
              Cancel
            </button>
            <Link href="/Adformat">
              <button className={styles.nextButton}>
                Next <span className={styles.nextButtonArrow}>→</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}